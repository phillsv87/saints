export interface AppConfig {
  apiBaseUrl: string;
  logHttp: boolean;
  logHttpResponse: boolean;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  slug: string;
  pullquote: string;  
  breadcrumbs: string;  
  images?: ProjectImage[];
}

export interface ProjectImage {
	name?:string;
	alternativeText?:string;
	caption?:string;
	width?:number;
	height?:number;
	hash?:string;
	ext?:string;
	mime?:string;
	size?:number;
	url?:string;
	previewUrl?:string;
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


export const apiRecordsToArray=<T>(records:RecordArray<T>|null|undefined):T[]=>{
    if(!records?.data){
        return [];
    }

    const ary:T[]=[];

    for(const d of records.data){
        const atts=d.attributes as any;
        if(atts){
            if(atts.id===undefined){
                atts.id=d.id;
            }
            for(const prop in atts){
                let value=atts[prop];					 

                if(value===undefined){
                    delete atts[prop];
                }else{
                    atts[prop]=value;
                }
            }
            ary.push(atts);
        }
    }

    return ary;
}