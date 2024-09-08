#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CertificateStack, OperationsStack, Target, WebsiteStack, getContext } from '../lib';
import { WebsiteDeploymentStack } from '../lib/website-deployment-stack';

const app = new cdk.App();
const { target } = getContext(app);

if (target === Target.INFRASTRUCTURE) {
  /**
   * Description: the certificate stack is responsible for creating the certificate for the website
   */
  const { hostedZone, websiteCertificate } = new CertificateStack(app, 'CertificateStack');

  /**
   * Description: the operations stack is responsible for managing the deployment of the infrastructure.
   */
  new OperationsStack(app, 'OperationsStack');

  /**
   * Description: the website stack is responsible for managing the website infrastructure.
   */
  new WebsiteStack(app, 'WebsiteStack', { hostedZone, websiteCertificate });
}

if (target === Target.WEBSITE) {
  new WebsiteDeploymentStack(app, 'WebsiteDeploymentStack');
}
