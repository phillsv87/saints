#!/usr/bin/env node
import { stackConfig } from '@strapped/config';
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { StrappedBackendStack } from '../lib/StrappedBackendStack';
import { StrappedFrontendStack } from '../lib/StrappedFrontendStack';
import { StrappedPipelineStack } from '../lib/StrappedPipelineStack';

const app = new cdk.App();

switch(stackConfig.cdkStack){

    case 'pipeline':
        new StrappedPipelineStack(app, `${stackConfig.stackName}Pipeline-${stackConfig.branch}`, stackConfig);
        break;

    case 'backend':
        new StrappedBackendStack(app,`${stackConfig.stackName}Backend-${stackConfig.branch}`,{
            apiDomain:stackConfig.apiDomain,
            emailAddress:stackConfig.emailAddress,
            instanceVCpu:stackConfig.instanceVCpu,
            instanceMemoryMb:stackConfig.instanceMemoryMb,
        });
        break;

    case 'frontend':
        new StrappedFrontendStack(app,`${stackConfig.stackName}Frontend-${stackConfig.branch}`,{
            frontendDomain:stackConfig.frontendDomain
        });
        break;

    default:
        throw new Error(`No stack matching ${stackConfig.cdkStack}`);
}
