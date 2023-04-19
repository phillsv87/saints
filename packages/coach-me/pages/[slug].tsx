import styles from '../styles/CoachMe.module.css'

import { useRouter } from 'next/router'

import { GetStaticPaths } from 'next'

import Header from '../Components/Header/Header'
import Signup from '../Components/Signup/Signup'

import { getCoaches } from '../lib/lib'
import { Coach } from '../lib/types'



export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: (await getCoaches()).map(v=>'/'+v.slug),
        fallback: 'blocking' //indicates the type of fallback
    }
}


export async function getStaticProps() {

  const coaches= await getCoaches()
	
  return {
    props: {
      coaches
    }
  }
}

export function getCoachForSlug(slug: string, coaches: Coach[]) {
	return coaches.find((copy) => (copy.slug == slug));
}

interface LandingPageProps {
  coaches: Coach[]
}

export default function CoachLandingPage({
	coaches
}:LandingPageProps){
	
   const router = useRouter()
   const { slug } = router.query
	
   const activeCoach = getCoachForSlug(slug as string, coaches);
	
    return (
        <div className={styles.container}>
		 
		 		<Header />
		 		
				<div className={styles.headlineContainer}>
					<h1 className={styles.headline}>{activeCoach?.headline}</h1>
		 		</div>
		 
		 		<div className={styles.videoContainer}>
					<video
			 		 controls
			 		 className={styles.video}>
					    <source src={activeCoach?.profileVideo?.url} type="video/mp4" />
			 	   </video>
			   </div>

		 
		 		<div className={styles.getStartedContainer}>
		 			<Signup />
				</div>
		 
			 	<div className={styles.biographyContainer}>
		 			<div className={styles.coachProfilePicture}>
						<img className={styles.profilePicture} src={activeCoach?.profilePicture?.url} />		 				
		 		   </div>
		 			
		 			<div className={styles.coachBiography}>		 
						 <div className={styles.coachBioSubject}
						       dangerouslySetInnerHTML={{__html: activeCoach?.biographySubjectHTML!}} />
							 
						 <div className={styles.coachBioCopy}
						       dangerouslySetInnerHTML={{__html: activeCoach?.biographyBodyHTML!}} />
		 		   </div>
		 		</div>
		 

        </div>
    )
}
