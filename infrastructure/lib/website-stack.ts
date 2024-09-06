import { Stack, type StackProps } from "aws-cdk-lib";
import { Distribution, HttpVersion } from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Effect, PolicyStatement, StarPrincipal } from "aws-cdk-lib/aws-iam";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

export class WebsiteStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const bucket = this.createBucket();
		this.createDistribution(bucket);
	}

	private createBucket(): Bucket {
		const bucket = new Bucket(this, 'WebsiteBucket', {
			bucketName: 'drieshooghe-website',
			lifecycleRules: [{ noncurrentVersionsToRetain: 10 }],
			encryption: BucketEncryption.S3_MANAGED,
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
			})
		);

		return bucket;
	}

	private createDistribution(bucket: Bucket): Distribution {
		return new Distribution(this, 'WebsiteDistribution', {
			comment: 'drieshooghe.com website distribution',
			defaultBehavior: {
				origin: new S3StaticWebsiteOrigin(bucket),
			},
			defaultRootObject: 'index.html',
			errorResponses: [
				{ httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/404.html' },
			],
			httpVersion: HttpVersion.HTTP2_AND_3,
		});
	}
}
