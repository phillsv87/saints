#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { StrappedPipelineStack } from '../lib/StrappedPipelineStack';

const app = new cdk.App();
new StrappedPipelineStack(app, 'Strapped', {
    gitHubOwner:'phillsv87',
    gitHubRepo:'Strapped',
    repoConnectionArn:'arn:aws:codestar-connections:us-east-1:809045117730:connection/af7dc45d-56b9-46ea-8c87-acbb044b0e9f',
    domainName:'env0.iyio.io',
    emailAddress:'yo@iyio.io',
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
