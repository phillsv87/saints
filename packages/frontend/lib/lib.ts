import { apiRecordsToArray, httpGetAsync, RecordArray, Record } from "@strapped/lib-app"
import { Project, ProjectImage, ProjectJson, ImageJson} from '../lib/types';

export const isServerSide=typeof window === 'undefined';
export const isClientSide=!isServerSide;

export function deleteUndefined<T>(obj:T):T
{
    if(!obj){
        return obj;
    }
    for(const e in obj){
        if(obj[e]===undefined){
            delete obj[e];
        }
    }
    return obj;
}

export const dump=<T>(obj:T,...rest:any[]):T=>{
    console.info(...rest,obj)
    return obj;
}

export async function getProjects() {
 	var projectsData = await
     httpGetAsync<RecordArray<ProjectJson>>(`@api/projects?populate=images`)
 
   var projectsJson = await projectsData
	
   var projectRecords = apiRecordsToArray(projectsJson);

   var projects: Project[] = projectRecords.map(
     p => ({
       id: p.id,
       title: p.title,
       subtitle: p.subtitle,
       slug: p.slug,
 	    url: "/work/" + p.slug,
       breadcrumbs: p.breadcrumbs,
 		 pullquote: p.pullquote,
		 images: apiRecordsToArray(p.images)
     })
   )
	return projects;
}