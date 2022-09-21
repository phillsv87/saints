import { stackConfig } from "@strapped/config";
import { AppConfig } from "./types";

export const appConfig:Readonly<AppConfig>=Object.freeze({
    apiBaseUrl:`https://${stackConfig.apiDomain}/api/`,
    logHttp:true,
    logHttpResponse:false
})
