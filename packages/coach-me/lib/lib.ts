import { apiRecordsToArray, httpGetAsync, RecordArray, Record } from "@strapped/lib-app"
import { Coach, CoachJson} from '../lib/types';

export async function getCoaches() {
 	var coachesData = await
     httpGetAsync<RecordArray<CoachJson>>(`@api/coaches?populate=profilePicture&populate=profileVideo`)
 
   var coachesJson = await coachesData
	
   var coachesRecords:CoachJson[]=[];

	if(coachesJson != undefined && coachesJson.data!= undefined) {
	   for(const d of coachesJson.data){
        const atts=d.attributes as any;
        if(atts){
		  		coachesRecords.push({attributes: atts})
		  }
		}
	}
	
   var coaches: Coach[] = coachesRecords.map(
     c => ({
       firstName: c?.attributes?.firstName,
		 lastName: c?.attributes?.lastName,
		 slug: c?.attributes?.slug,
 	    url: "/" + c?.attributes?.slug,
	    headline: c?.attributes?.headline,
	    callToActionHTML: c?.attributes?.callToActionHTML,
		 biographySubjectHTML: c?.attributes?.biographySubjectHTML,
	    biographyBodyHTML: c?.attributes?.biographyBodyHTML,
		 profilePicture: {
	      name: c?.attributes?.profilePicture?.data?.attributes?.name,
	      alternativeText:c?.attributes?.profilePicture?.data?.attributes?.alternativeText,
	      caption: c?.attributes?.profilePicture?.data?.attributes?.caption,
	      width: c?.attributes?.profilePicture?.data?.attributes?.width,
	      height: c?.attributes?.profilePicture?.data?.attributes?.height,
	      formats: c?.attributes?.profilePicture?.data?.attributes?.formats,
	      hash: c?.attributes?.profilePicture?.data?.attributes?.hash,
	      ext: c?.attributes?.profilePicture?.data?.attributes?.ext,
	      mime: c?.attributes?.profilePicture?.data?.attributes?.mime,
	      size: c?.attributes?.profilePicture?.data?.attributes?.size,
	      url: c?.attributes?.profilePicture?.data?.attributes?.url,
	      previewUrl: c?.attributes?.profilePicture?.data?.attributes?.previewUrl
		 },
		 profileVideo: {
	      name: c?.attributes?.profileVideo?.data?.attributes?.name,
	      alternativeText:c?.attributes?.profileVideo?.data?.attributes?.alternativeText,
	      caption: c?.attributes?.profileVideo?.data?.attributes?.caption,
	      width: c?.attributes?.profileVideo?.data?.attributes?.width,
	      height: c?.attributes?.profileVideo?.data?.attributes?.height,
	      formats: c?.attributes?.profileVideo?.data?.attributes?.formats,
	      hash: c?.attributes?.profileVideo?.data?.attributes?.hash,
	      ext: c?.attributes?.profileVideo?.data?.attributes?.ext,
	      mime: c?.attributes?.profileVideo?.data?.attributes?.mime,
	      size: c?.attributes?.profileVideo?.data?.attributes?.size,
	      url: c?.attributes?.profileVideo?.data?.attributes?.url,
		 }	 
     } as Coach)
   )
	return coaches;
}