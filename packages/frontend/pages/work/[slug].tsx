import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../../styles/Work.module.css'

import { useRouter } from 'next/router'

import { httpGetAsync } from "../../lib/http";
import { Project, ProjectImage } from '../../lib/types';

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import WorkHeaderImage from "../../components/WorkHeaderImage/WorkHeaderImage";
import Gallery from "../../components/Gallery/Gallery";
import PullQuote from "../../components/PullQuote/PullQuote";
import WorkNavigator from "../../components/WorkNavigator/WorkNavigator";

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export function getProjectForSlug(slug: string, array: Project[]) {
	var result: Project;
	if (result = array.find((copy) => (copy.slug == slug))!) {
		return result;
	} else {
		return '';
	}
}

interface SaintsProps {
  projects: Project[]
}

export async function getStaticProps() {

  // ---> TEST 1 <----- START
  const [projectsData] = await Promise.all([
    httpGetAsync<ProjectsData>(`@api/projects?populate=images`),
  ])
 
  const projects: Project[] = projectsData!.data.map(
    p => ({
      id: p.id,
      title: p.attributes.title,
      subtitle: p.attributes.subtitle,
      slug: p.attributes.slug,
	   url: "/work/" + p.attributes.slug,
      breadcrumbs: p.attributes.breadcrumbs,
		pullquote: p.attributes.pullquote,
		images: p.attributes.images!.data.map(
			i => ({
				url: i.attributes.url,
				width: i.attributes.width,
				height: i.attributes.height,
				alternativeText: i.attributes.alternativeText,
				caption: i.attributes.caption,
				mime: i.attributes.mime,		
			})
		)
    })
  ) 
  
 
  return {
    props: {
      projects
    }
  }
}


const Work: NextPage<HomeProps> = ({ projects }: SaintsProps)  => {
	
   const router = useRouter()
   const { slug } = router.query
	
	const project = getProjectForSlug(slug, projects);
	console.log("project " + project.title)
	console.log("image " + project.images.map(i => i.url + ' '))
		
   console.log("outside project " + project.title)
	console.log("outside projects " + projects)
	
	return (
	<div className={styles.container}>
		<NavBar />
		<div className={styles.workContainer}>
			<WorkHeaderImage projectImage={project.images[0]} />
		
			<div className={styles.breadcrumbs}>{ project.breadcrumbs }</div>
		
			<h1 className={styles.title}>{ project.title }</h1>
			<h2 className={styles.subtitle}>{ project.subtitle }</h2>
		
			<Gallery images={ project.images } />
			<PullQuote quote={ project.pullquote } />
		</div>

		
		<WorkNavigator 
			activeProject={project}
			projects={projects} />
		<Footer />
	</div>		
  )
}

export default Work