import { locale } from "@iyio/ni18";
import { appConfig } from "./app-config";
import { deleteUndefined, isServerSide } from "./lib";

export const apiPrefix='@api/';

export type HttpMethod='GET'|'POST'|'PUT'|'PATCH'|'DELETE';

export interface RequestOptions
{
    /**
     * If true the Accept-Language and locale query value will be set to the current locale.
     * @default true
     */
    autoLocale?:boolean;

    /**
     * If true and the call returns a 404 undefined will be returned instead of throwing and error.
     * @default true
     */
    returnUndefinedFor404?:boolean;

    /**
     * If true the raw fetch response will be returned.
     * @default false
     */
    returnFetchResponse?:boolean;

    /**
     * If true the result of the response will be parsed and returned.
     * @default true
     */
    parseResponse?:boolean;
}

async function requestAsync<T>(
    method:HttpMethod,
    uri:string,
    body?:any,
    {
        autoLocale=true,
        returnUndefinedFor404=true,
        returnFetchResponse=false,
        parseResponse=true,
    }:RequestOptions={}):Promise<T|undefined>
{



    const isApiCall=uri.startsWith(apiPrefix);

    const loc=autoLocale?locale():undefined;


    if(isApiCall){
        uri=appConfig.apiBaseUrl+uri.substring(apiPrefix.length);
        if(loc){
            uri+=(uri.includes('?')?'&':'?')+'locale='+loc;
        }
    }

    if(appConfig.logHttp){
        if(body===undefined){
            console.info(`${method} ${uri}`);
        }else{
            console.info(`${method} ${uri}`,body);
        }
    }

    const response=await fetch(uri,{
        method,
        body:body===undefined?undefined:JSON.stringify(body),
        headers:deleteUndefined<any>({
            "Content-Type":body?'application/json':undefined,
            "Accept-Language":loc
        })
    });

    if(response.status===404 && returnUndefinedFor404){
        return undefined;
    }

    if(!response.ok){
        throw new Error(`Request failed with a status of ${response.status}. uri=${uri}`)
    }

    if(returnFetchResponse){
        return response as any;
    }

    if(!parseResponse || !response.headers.get('Content-Type')?.includes('/json')){
        return undefined;
    }

    const result=await response.json();
    if(appConfig.logHttpResponse){
        console.info(`${method} ${uri} Response:`,result);
    }
    return result;
}

export async function httpRequestAsync<T>(
    method:HttpMethod,
    uri:string,
    body?:any,
    options?:RequestOptions):Promise<T|undefined>
{
    if(isServerSide){
        return await requestAsync<T>(method,uri,body,options);
    }

    try{
        return await requestAsync<T>(method,uri,body,options);
    }catch(ex){
        console.error('httpRequestAsync failed.',{method,uri},ex);
        return undefined;
    }
}

export async function httpGetAsync<T>(uri:string,options?:RequestOptions):Promise<T|undefined>
{
    return await httpRequestAsync<T>('GET',uri,undefined,options);
}

export async function httpPostAsync<T>(uri:string,body:any,options?:RequestOptions):Promise<T|undefined>
{
    return await httpRequestAsync<T>('POST',uri,body,options);
}

export async function httpPatchAsync<T>(uri:string,body:any,options?:RequestOptions):Promise<T|undefined>
{
    return await httpRequestAsync<T>('PATCH',uri,body,options);
}

export async function httpPutAsync<T>(uri:string,body:any,options?:RequestOptions):Promise<T|undefined>
{
    return await httpRequestAsync<T>('PUT',uri,body,options);
}

export async function httpDeleteAsync<T>(uri:string,options?:RequestOptions):Promise<T|undefined>
{
    return await httpRequestAsync<T>('DELETE',uri,undefined,options);
}
