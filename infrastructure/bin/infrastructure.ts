#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CertificateStack, OperationsStack, WebsiteStack } from '../lib';

const app = new cdk.App();

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
