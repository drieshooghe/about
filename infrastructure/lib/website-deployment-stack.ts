import * as path from 'node:path';
import { Duration } from 'aws-cdk-lib';
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

    new BucketDeployment(this, 'PageWebsiteDeployment', {
      ...settings,
      sources: [
        Source.asset(path.resolve(__dirname, '../../website/out'), {
          exclude: ['!index.html', '!404.html', '!index.txt'],
        }),
      ],
      cacheControl: [CacheControl.noStore()],
    });

    new BucketDeployment(this, 'AssetWebsiteDeployment', {
      ...settings,
      sources: [
        Source.asset(path.resolve(__dirname, '../../website/out'), {
          exclude: ['index.html', '404.html', 'index.txt'],
        }),
      ],
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(Duration.hours(24)),
        CacheControl.staleWhileRevalidate(Duration.hours(24)),
      ],
    });
  }
}
