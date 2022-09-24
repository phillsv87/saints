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
    instanceVCpu:number;
    instanceMemoryMb:number;

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

const toInt=(value:string):number=>{
    const num=parseInt(value);
    if(!Number.isFinite(num)){
        throw new Error(`value is not a number - ${value}`)
    }
    return num;
}

const toBool=(value:string):boolean=>{
    switch(value.toLowerCase()){
        case 'true':
        case '1':
        case 'yes':
            return true;

        case 'false':
        case '0':
        case 'no':
            return false;

        default:
            throw new Error('Boolean value required. Value must be ( true, false, yes, no, 1 or 0 )');
    }
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
    enableFrontend:toBool(requireVar('enableFrontend',process.env.NX_ENABLE_FRONTEND,'false')),
    enableBackend:toBool(requireVar('enableBackend',process.env.NX_ENABLE_BACKEND,'false')),
    cdkStack:requireVar('cdkStack',process.env.NX_CDK_STACK,'pipeline'),
    instanceVCpu:toInt(requireVar('instanceVCpu',process.env.NX_INSTANCE_V_CPU,'256')),
    instanceMemoryMb:toInt(requireVar('instanceMemoryMb',process.env.NX_INSTANCE_MEMORY_MB,'1024')),
});


