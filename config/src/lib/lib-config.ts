import * as _stackConfig from '../../stack-config.json';

export const stackConfig:Readonly<StackConfig>=Object.freeze(_stackConfig);


export interface StackConfig
{
    gitHubOwner:string;
    gitHubRepo:string;
    branch?:string;
    repoConnectionArn:string;
    apiDomain:string;
    emailAddress:string;
}
