import styles from '../styles/CoachMe.module.css'

import { useRouter } from 'next/router'

import { GetStaticPaths } from 'next'

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
            <h1>{activeCoach?.headline}</h1>
		 
		      <img className={styles.profilePicture} src={activeCoach?.profilePicture?.url} />
		 
				<video
		 		 controls>
				    <source src={activeCoach?.profileVideo?.url} type="video/mp4" />
		 	   </video>
        </div>
    )
}
