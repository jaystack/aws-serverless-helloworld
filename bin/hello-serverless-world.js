#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { HelloServerlessWorldStack } = require('../lib/hello-serverless-world-stack');

const app = new cdk.App();
new HelloServerlessWorldStack(app, 'HelloServerlessWorldStack');
