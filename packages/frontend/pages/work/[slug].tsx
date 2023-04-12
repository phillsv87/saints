import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from '../../styles/Work.module.css'

import { useRouter } from 'next/router'

import { GetStaticProps, GetStaticPaths } from 'next'

import { httpGetAsync } from "../../lib/http";
import { Project, ProjectImage, Record, RecordArray, apiRecordsToArray } from '../../lib/types';

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

export function getProjectForSlug(slug: string, projects: Project[]) {
	var result: Project;
	if (result = projects.find((copy) => (copy.slug == slug))!) {
		return result;
	} else {
		return result;
	}
}

interface ProjectJson {
   id: number;
   attributes: {
	   title: string;
	   subtitle: string;
	   url: string;
	   slug: string;
	   pullquote: string;  
	   breadcrumbs: string;
		images: ImageJson[];
   }
}

interface ImageJson {
	id: number;
	attributes: {
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


interface WorkProps {
  projects: Project[]
}

export async function getStaticProps() {

  // ---> TEST 1 <----- START
  const [projectsData] = await Promise.all([
    httpGetAsync<RecordArray<ProjectJson>>(`@api/projects?populate=images`),
  ])
 
  const projects: Project[] = apiRecordsToArray(projectsData).map(
    p => ({
      id: p.id,
      title: p.attributes.title,
      subtitle: p.attributes.subtitle,
      slug: p.attributes.slug,
	   url: "/work/" + p.attributes.slug,
      breadcrumbs: p.attributes.breadcrumbs,
		pullquote: p.attributes.pullquote,
		images: p.attributes.images.map(
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


export default function WorkPage({
	projects
}:WorkProps){
		
   const router = useRouter()
   const { slug } = router.query
	console.log("slug: " + slug)
	
	const project: Project = getProjectForSlug(slug as string, projects);
	
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

