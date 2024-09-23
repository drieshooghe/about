import { join } from 'node:path';
import { Duration } from 'aws-cdk-lib';
import type { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  CachePolicy,
  CfnOriginAccessControl,
  Function as CloudfrontFunction,
  Distribution,
  FunctionCode,
  FunctionEventType,
  FunctionRuntime,
  HttpVersion,
  PriceClass,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Effect, PolicyStatement, ServicePrincipal, StarPrincipal } from 'aws-cdk-lib/aws-iam';
import { ARecord, type IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import type { Construct } from 'constructs';
import { Stack, type StackProps } from './constructs';
import { generateFunctionCode } from './utils';

interface WebsiteStackProps extends StackProps {
  hostedZone: IHostedZone;
  websiteCertificate: Certificate;
}

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, { hostedZone, websiteCertificate, ...props }: WebsiteStackProps) {
    super(scope, id, { ...props, crossRegionReferences: true });

    const bucket = this.createBucket();
    const redirectFunction = this.createRedirectFunction();
    const distribution = this.createDistribution(bucket, redirectFunction, websiteCertificate);
    this.createRecord(hostedZone, distribution);
  }

  private createBucket(): Bucket {
    const bucket = new Bucket(this, 'WebsiteBucket', {
      bucketName: 'drieshooghe-website',
      lifecycleRules: [
        {
          noncurrentVersionsToRetain: 10,
          noncurrentVersionExpiration: Duration.days(1),
        },
      ],
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      versioned: true,
    });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        sid: 'DenyIncorrectEncryptionHeader',
        effect: Effect.DENY,
        principals: [new StarPrincipal()],
        actions: ['s3:PutObject'],
        resources: [`${bucket.bucketArn}/*`],
        conditions: {
          StringNotEquals: { 's3:x-amz-server-side-encryption': 'AES256' },
        },
      }),
    );

    bucket.addToResourcePolicy(
      new PolicyStatement({
        sid: 'DenyUnEncryptedObjectUploads',
        effect: Effect.DENY,
        principals: [new StarPrincipal()],
        actions: ['s3:PutObject'],
        resources: [`${bucket.bucketArn}/*`],
        conditions: {
          Null: {
            's3:x-amz-server-side-encryption': true,
          },
        },
      }),
    );

    return bucket;
  }

  private createRedirectFunction(): CloudfrontFunction {
    const functionPath = join(__dirname, '/functions/redirect-apex.ts');
    const code = generateFunctionCode('cloudfront', functionPath);

    return new CloudfrontFunction(this, 'RedirectApexFunction', {
      comment: 'Redirect apex domain to www subdomain',
      code: FunctionCode.fromInline(code),
      runtime: FunctionRuntime.JS_2_0,
    });
  }

  private createDistribution(
    bucket: Bucket,
    redirectFunction: CloudfrontFunction,
    certificate: Certificate,
  ): Distribution {
    const oac = new CfnOriginAccessControl(this, 'WebsiteBucketOAC', {
      originAccessControlConfig: {
        name: 'WebsiteBucketOAC',
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4',
      },
    });

    const origin = S3BucketOrigin.withOriginAccessControl(bucket, {
      originAccessControlId: oac.attrId,
    });

    const distribution = new Distribution(this, 'WebsiteDistribution', {
      comment: 'drieshooghe.com website distribution',
      defaultBehavior: {
        origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        functionAssociations: [{ eventType: FunctionEventType.VIEWER_REQUEST, function: redirectFunction }],
      },
      domainNames: ['drieshooghe.com', 'www.drieshooghe.com'],
      certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/404.html',
        },
      ],
      httpVersion: HttpVersion.HTTP2_AND_3,
      priceClass: PriceClass.PRICE_CLASS_100,
    });

    // Disable caching for the index.html page
    // That way we can leverage the content hashes
    distribution.addBehavior('/', origin, { cachePolicy: CachePolicy.CACHING_DISABLED });

    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new ServicePrincipal('cloudfront.amazonaws.com')],
        resources: [`arn:aws:s3:::${bucket.bucketName}/*`],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          },
        },
      }),
    );

    return distribution;
  }

  private createRecord(hostedZone: IHostedZone, distribution: Distribution) {
    return new ARecord(this, 'WebsiteRecord', {
      recordName: 'www',
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: hostedZone,
      ttl: Duration.hours(1),
    });
  }
}
