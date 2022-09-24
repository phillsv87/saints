export interface StackConfig
{
    stackName:string;
    githubOwner:string;
    gitRepo:string;
    branch:string;
    repoConnectionArn:string;
    apiDomain:string;
    frontendDomain:string;
    emailAddress:string;
    awsProfile:string;
    awsRegion:string;
    enableFrontend:boolean;
    enableBackend:boolean;
    cdkStack:string;

}

const requireVar=<T extends keyof StackConfig>(key:T,value:string|undefined,defaultValue?:string):string=>{
    if(value){
        return value;
    }
    if(!defaultValue){
        throw new Error(
            `No env var default for ${key}. `+
            'You can define env vars in the root .env file using all caps with snake case and '+
            'prefixed with NX_. For example StackConfig.emailAddress -> NX_EMAIL_ADDRESS = user@example.com'
        )
    }
    return defaultValue;
}


export const stackConfig:Readonly<StackConfig>=Object.freeze({
    stackName:requireVar('stackName',process.env.NX_STACK_NAME),
    githubOwner:requireVar('githubOwner',process.env.NX_GITHUB_OWNER),
    gitRepo:requireVar('gitRepo',process.env.NX_GIT_REPO),
    branch:requireVar('branch',process.env.NX_BRANCH,'main'),
    repoConnectionArn:requireVar('repoConnectionArn',process.env.NX_REPO_CONNECTION_ARN),
    apiDomain:requireVar('apiDomain',process.env.NX_API_DOMAIN),
    frontendDomain:requireVar('frontendDomain',process.env.NX_FRONTEND_DOMAIN),
    emailAddress:requireVar('emailAddress',process.env.NX_EMAIL_ADDRESS),
    awsProfile:requireVar('awsProfile',process.env.NX_AWS_PROFILE),
    awsRegion:requireVar('awsRegion',process.env.NX_AWS_REGION),
    enableFrontend:requireVar('enableFrontend',process.env.NX_ENABLE_FRONTEND,'false')==='true',
    enableBackend:requireVar('enableBackend',process.env.NX_ENABLE_BACKEND,'false')==='true',
    cdkStack:requireVar('cdkStack',process.env.NX_CDK_STACK,'StrappedPipeline'),
});


