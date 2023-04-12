export interface AppConfig
{
    apiBaseUrl:string;
    logHttp:boolean;
    logHttpResponse:boolean;
}


export interface RecordArray<T>
{
    data?:Record<T>[];
}

export interface Record<T>
{
    id:number;
    attributes?:Omit<T,'id'>;
}
