export interface StackConfig
{
    gitHubOwner:string;
    gitHubRepo:string;
    branch:string;
    repoConnectionArn:string;
    apiDomain:string;
    frontendDomain:string;
    emailAddress:string;
    awsProfile:string;
    awsRegion:string;
}

const requireVar=<T extends keyof StackConfig>(key:T,value:string|undefined,defaultValue?:string):StackConfig[T]=>{
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
    gitHubOwner:requireVar('gitHubOwner',process.env.NX_GITHUB_OWNER),
    gitHubRepo:requireVar('gitHubRepo',process.env.NX_GITHUB_REPO),
    branch:requireVar('branch',process.env.NX_BRANCH,'main'),
    repoConnectionArn:requireVar('repoConnectionArn',process.env.NX_REPO_CONNECTION_ARN),
    apiDomain:requireVar('apiDomain',process.env.NX_API_DOMAIN),
    frontendDomain:requireVar('apiDomain',process.env.NX_FRONTEND_DOMAIN),
    emailAddress:requireVar('emailAddress',process.env.NX_EMAIL_ADDRESS),
    awsProfile:requireVar('awsProfile',process.env.NX_AWS_PROFILE),
    awsRegion:requireVar('awsProfile',process.env.NX_AWS_REGION),
});


