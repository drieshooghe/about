#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { OperationsStack } from "../lib/operations-stack";

const app = new cdk.App();

new OperationsStack(app, "OperationsStack");
