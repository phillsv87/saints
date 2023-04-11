import { AppConfig } from "./lib/types";

let localAppConfig:Partial<AppConfig>={};

try{
    if(process.env.NODE_ENV==='development'){
        const l=require('./local-app-config');
        localAppConfig=l.default || l.localAppConfig || {};
    }
}catch{}

export const appConfig:AppConfig={
    apiBaseUrl:'https://api.saints.iyio.io/api/',
    logHttp:true,
    logHttpResponse:true,
    ...localAppConfig
}
