#!/usr/bin/env node
import { stackConfig } from '@strapped/config';
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { StrappedBackendStack } from '../lib/StrappedBackendStack';
import { StrappedFrontendStack } from '../lib/StrappedFrontendStack';
import { StrappedPipelineStack } from '../lib/StrappedPipelineStack';

const app = new cdk.App();

switch(stackConfig.cdkStack){

    case 'StrappedPipeline':
        new StrappedPipelineStack(app, `StrappedPipeline-${stackConfig.branch}`, stackConfig);
        break;

    case 'StrappedBackend':
        new StrappedBackendStack(app,`StrappedBackend-${stackConfig.branch}`,stackConfig);
        break;

    case 'StrappedFrontend':
        new StrappedFrontendStack(app,`StrappedFrontend-${stackConfig.branch}`,stackConfig);
        break;

    default:
        throw new Error(`No stack matching ${stackConfig.cdkStack}`);
}
