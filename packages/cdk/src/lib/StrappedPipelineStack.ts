import { StackConfig } from '@strapped/config';
import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { StrappedBackendStack, StrappedBackendStageProps } from './StrappedBackendStack';
import { StrappedFrontendStack, StrappedFrontendStackProps } from './StrappedFrontendStack';

export type StrappedPipelineStackProps= StackConfig & cdk.StackProps;

export class StrappedPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, {
        stackName,
        githubOwner,
        gitRepo,
        branch,
        repoConnectionArn,
        apiDomain,
        emailAddress,
        frontendDomain,
        coachMeDomain,
        enableBackend,
        enableFrontend,
        instanceVCpu,
        instanceMemoryMb,
        ...props
    }: StrappedPipelineStackProps) {
        super(scope, id, props);

        const source=pipelines.CodePipelineSource.connection(`${githubOwner}/${gitRepo}`,branch,{
            connectionArn:repoConnectionArn
        });

        const pipeline = new pipelines.CodePipeline(this, `${stackName}Pipeline-${branch}`, {

            // How it will be built and synthesized
            synth: new pipelines.ShellStep('Synth', {
                // Where the source can be found
                input: source,

                installCommands:['npm ci','npx pathic-util -i -b .'],

                // Install dependencies, build and run cdk synth
                commands: [`scripts/nx-run-with-env.sh branch-${branch} cdk:synth ${branch} 1`],
            }),
        });

        if(enableBackend){
            pipeline.addStage(new StrappedBackendStage(this,`${stackName}BackendStage-${branch}`,{
                stackName,
                branch,
                emailAddress,
                apiDomain,
                instanceVCpu,
                instanceMemoryMb,
            }));
        }

        if(enableFrontend){
            pipeline.addStage(new StrappedFrontendStage(this,`${stackName}FrontendStage-${branch}`,{
                stackName,
                branch,
                frontendDomain,
                coachMeDomain,
            }));
        }

    }
}

interface EnvStageProps
{
    branch:string;
    stackName:string;
}

class StrappedBackendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, {
        stackName,
        branch,
        ...props
    }:EnvStageProps & StrappedBackendStageProps & cdk.StageProps){

        super(scope,id,props);

        new StrappedBackendStack(this,`${stackName}Backend-${branch}`,props);
    }

}

class StrappedFrontendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, {
        stackName,
        branch,
        ...props
    }:EnvStageProps & StrappedFrontendStackProps & cdk.StageProps){

        super(scope,id,props);

        new StrappedFrontendStack(this,`${stackName}Frontend-${branch}`,props);
    }

}
