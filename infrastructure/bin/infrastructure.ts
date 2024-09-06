#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { OperationsStack, WebsiteStack } from '../lib';

const app = new cdk.App();

/** 
 * Description: the operations stack is responsible for managing the deployment of the infrastructure.
 */
new OperationsStack(app, 'OperationsStack');

/**
 * Description: the website stack is responsible for managing the website infrastructure.
 */
new WebsiteStack(app, 'WebsiteStack');
