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
            enableBackend,
            enableFrontend,
        }=props;

        const source=pipelines.CodePipelineSource.connection(`${githubOwner}/${githubRepo}`,branch,{
            connectionArn:repoConnectionArn
        });

        const pipeline = new pipelines.CodePipeline(this, `StrappedPipeline-${branch}`, {

            // How it will be built and synthesized
            synth: new pipelines.ShellStep('Synth', {
                // Where the source can be found
                input: source,

                installCommands:['npm ci','npx pathic-util -i -b .'],

                // Install dependencies, build and run cdk synth
                commands: [`scripts/nx-run-with-env.sh branch-${branch} cdk:synth`],
            }),
        });

        if(enableBackend){
            pipeline.addStage(new StrappedBackendStage(this,`StrappedBackendStage-${branch}`,{
                branch,
                emailAddress,
                apiDomain
            }));
        }

        if(enableFrontend){
            pipeline.addStage(new StrappedFrontendStage(this,`StrappedFrontendStage-${branch}`,{
                branch,
                frontendDomain
            }));
        }

    }
}

interface EnvStageProps
{
    branch:string;
}

class StrappedBackendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, {
        branch,
        ...props
    }:EnvStageProps & StrappedBackendStageProps & cdk.StageProps){

        super(scope,id,props);

        new StrappedBackendStack(this,`StrappedBackend-${branch}`,props);
    }

}

class StrappedFrontendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, {
        branch,
        ...props
    }:EnvStageProps & StrappedFrontendStackProps & cdk.StageProps){

        super(scope,id,props);

        new StrappedFrontendStack(this,`StrappedFrontend-${branch}`,props);
    }

}
