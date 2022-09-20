import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { StrappedBackendStack, StrappedBackendStageProps } from './StrappedBackendStack';

export interface StrappedPipelineStackProps extends cdk.StackProps
{
    gitHubOwner:string;
    gitHubRepo:string;
    branch?:string;
    repoConnectionArn:string;
    domainName:string;
    emailAddress:string;
}

export class StrappedPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StrappedPipelineStackProps) {
        super(scope, id, props);

        const {
            gitHubOwner,
            gitHubRepo,
            branch='main',
            repoConnectionArn,
            domainName,
            emailAddress
        }=props;

        const source=pipelines.CodePipelineSource.connection(`${gitHubOwner}/${gitHubRepo}`,branch,{
            connectionArn:repoConnectionArn
        });

        const pipeline = new pipelines.CodePipeline(this, 'CdkPipeline', {

            // How it will be built and synthesized
            synth: new pipelines.ShellStep('Synth', {
                // Where the source can be found
                input: source,

                installCommands:['npm ci','npx pathic-util -i -b .'],

                // Install dependencies, build and run cdk synth
                commands: ['npx nx synth cdk'],
            }),
        });

        pipeline.addStage(new StrappedBackendStage(this,'StrappedBackend',{
            emailAddress,
            domainName
        }));

        // This is where we add the application stages
        // ...
    }
}

class StrappedBackendStage extends cdk.Stage
{

    constructor(scope:Construct, id:string, props:StrappedBackendStageProps & cdk.StackProps){

        super(scope,id,props);

        new StrappedBackendStack(this,'StrappedBackend',props);
    }

}
