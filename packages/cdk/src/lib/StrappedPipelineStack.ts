import { StackConfig } from '@strapped/config';
import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { StrappedBackendStack, StrappedBackendStageProps } from './StrappedBackendStack';
import { StrappedFrontendStack, StrappedFrontendStackProps } from './StrappedFrontendStack';

export type StrappedPipelineStackProps= StackConfig & cdk.StackProps;

export class StrappedPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StrappedPipelineStackProps) {
        super(scope, id, props);

        const {
            githubOwner,
            githubRepo,
            branch,
            repoConnectionArn,
            apiDomain,
            emailAddress,
            frontendDomain,
            disableBackend,
            disableFrontend
        }=props;

        const source=pipelines.CodePipelineSource.connection(`${githubOwner}/${githubRepo}`,branch,{
            connectionArn:repoConnectionArn
        });

        const pipeline = new pipelines.CodePipeline(this, 'CdkPipeline', {

            // How it will be built and synthesized
            synth: new pipelines.ShellStep('Synth', {
                // Where the source can be found
                input: source,

                installCommands:['npm ci','npx pathic-util -i -b .'],

                // Install dependencies, build and run cdk synth
                commands: ['npx nx synth-ci cdk'],
            }),
        });

        if(!disableBackend){
            pipeline.addStage(new StrappedBackendStage(this,'StrappedBackend',{
                emailAddress,
                apiDomain
            }));
        }

        if(!disableFrontend){
            pipeline.addStage(new StrappedFrontendStage(this,'StrappedFrontendStage',{
                frontendDomain
            }));
        }

    }
}

class StrappedBackendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, props:StrappedBackendStageProps & cdk.StageProps){

        super(scope,id,props);

        new StrappedBackendStack(this,'Strapped',props);
    }

}


class StrappedFrontendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, props:StrappedFrontendStackProps & cdk.StageProps){

        super(scope,id,props);

        new StrappedFrontendStack(this,'StrappedFrontend',props);
    }

}
