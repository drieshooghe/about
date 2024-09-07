import { Duration, Stack, type StackProps } from 'aws-cdk-lib';
import {
  CfnOriginAccessControl,
  Distribution,
  HttpVersion,
  PriceClass,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Effect, PolicyStatement, ServicePrincipal, StarPrincipal } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import type { Construct } from 'constructs';

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = this.createBucket();
    this.createDistribution(bucket);
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

  private createDistribution(bucket: Bucket): Distribution {
    const oac = new CfnOriginAccessControl(this, 'WebsiteBucketOAC', {
      originAccessControlConfig: {
        name: 'WebsiteBucketOAC',
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4',
      },
    });

    const distribution = new Distribution(this, 'WebsiteDistribution', {
      comment: 'drieshooghe.com website distribution',
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(bucket, {
          originAccessControlId: oac.attrId,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
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
}
