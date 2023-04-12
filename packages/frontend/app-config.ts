import { AppConfig } from "@strapped/lib-app";

let localAppConfig:Partial<AppConfig>={};

try{
    if(process.env.NODE_ENV==='development'){
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const l=require('./local-app-config');
        localAppConfig=l.default || l.localAppConfig || {};
    }
}catch{
    //
}

export const appConfig:AppConfig={
    apiBaseUrl:'https://api.saints.iyio.io/api/',
    logHttp:true,
    logHttpResponse:true,
    ...localAppConfig
}
