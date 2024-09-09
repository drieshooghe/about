import * as path from 'node:path';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import {
  BucketDeployment,
  type BucketDeploymentProps,
  CacheControl,
  ServerSideEncryption,
  Source,
} from 'aws-cdk-lib/aws-s3-deployment';
import type { Construct } from 'constructs';
import { Stack, type StackProps } from './constructs';

export class WebsiteDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createDeployment();
  }

  private createDeployment() {
    const settings: Omit<BucketDeploymentProps, 'sources' | 'cacheControl'> = {
      destinationBucket: Bucket.fromBucketName(this, 'WebsiteDeploymentBucket', 'drieshooghe-website'),
      serverSideEncryption: ServerSideEncryption.AES_256,
    };

    new BucketDeployment(this, 'CachedWebsiteDeployment', {
      ...settings,
      sources: [
        Source.asset(path.resolve(__dirname, '../../website/out'), {
          exclude: ['/**/*', '!/_next/static/**/*'],
        }),
      ],
      cacheControl: [CacheControl.fromString('max-age=31536000,public,immutable')],
    });

    new BucketDeployment(this, 'NonCachedWebsiteDeployment', {
      ...settings,
      sources: [
        Source.asset(path.resolve(__dirname, '../../website/out'), {
          exclude: ['/_next/static/**/*'],
        }),
      ],
      cacheControl: [CacheControl.fromString('max-age=0,no-cache,no-store,must-revalidate')],
    });
  }
}
