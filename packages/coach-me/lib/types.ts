export const turnLeft="go fast";

export interface CoachJson {
	attributes: {
	   firstName: string;
	   lastName: string;
	   profilePicture: {
			data: {
				attributes: {
					name: string;
					alternativeText:string;
					caption:string;
					width:number;
					height:number;
					formats:string;		
					hash:string;
					ext:string;
					mime:string;
					size:number;
					url:string;
					previewUrl:string;
				}
			}
		}
	   profileVideo: {
		   data: {
				attributes: {
					name: string;
					alternativeText: string;
					caption: string;
					width: number;
					height: number;
					formats: string;
					hash: string;
					ext: string;
					mime: string;
					size: number;
					url: string;
				}
			}
		}
		headline: string;
		callToActionHTML: string;
	   biographySubjectHTML: string;		
		biographyBodyHTML: string;
		slug: string;
	}
}

export interface Coach {
  firstName: string;
  lastName: string;
  slug: string;
  url: string;
  profilePicture: {
      name: string;
      alternativeText:string;
      caption:string;
      width:number;
      height:number;
      formats:string;		
      hash:string;
      ext:string;
      mime:string;
      size:number;
      url:string;
      previewUrl:string;
  }
  profileVideo: {
	  name: string;
	  alternativeText: string;
	  caption: string;
	  width: number;
	  height: number;
	  formats: string;
	  hash: string;
	  ext: string;
	  mime: string;
	  size: number;
	  url: string;
  }
  headline: string;
  callToActionHTML: string;
  biographySubjectHTML: string;
  biographyBodyHTML: string;
}