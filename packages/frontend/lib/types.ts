import { RecordArray, Record } from "@strapped/lib-app"


export interface AppConfig {
  apiBaseUrl: string;
  logHttp: boolean;
  logHttpResponse: boolean;
}


export interface ImageJson {
   data: {
		id: number;
		name:string;
		alternativeText:string;
		caption:string;
		width:number;
		height:number;
		hash:string;
		ext:string;
		mime:string;
		size:number;
		url:string;
		previewUrl:string;
	}

}

export interface ProjectJson {
   id: number;
   title: string;
   subtitle: string;
   url: string;
   slug: string;
   pullquote: string;  
   breadcrumbs: string;
	images: RecordArray<ProjectImage>;
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
	url:string;
	previewUrl?:string;
}