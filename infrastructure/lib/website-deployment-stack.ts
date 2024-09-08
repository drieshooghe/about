import * as path from 'node:path';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import type { Construct } from 'constructs';
import { Stack, type StackProps } from './constructs';

export class WebsiteDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createDeployment();
  }

  private createDeployment() {
    new BucketDeployment(this, 'WebsiteDeployment', {
      destinationBucket: Bucket.fromBucketName(this, 'WebsiteDeploymentBucket', 'drieshooghe-website'),
      sources: [Source.asset(path.resolve(__dirname, '../../website/out'))],
    });
  }
}
