#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { OperationsStack } from "../lib/operations-stack";
import { WebsiteStack } from "../lib/website-stack";

const app = new cdk.App();

new OperationsStack(app, "OperationsStack");
new WebsiteStack(app, "WebsiteStack");
