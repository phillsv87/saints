import { Project } from "../../lib/types";
import styles from './WorkNavigator.module.css';

interface WorkNavigatorProps {
  projects: Project[],
  activeProject: Project
}


export function findProjectInList(specimen: Project, projects: Project[]) {

	for(let i=0;i<projects.length;i++){
        const p=projects[i];
		console.log("   against: " + p.slug)
		if (specimen.slug == p.slug) {
			console.log("    bingo! " + i);
			return i;
		}
	};

	return -1;
}


export function getNextProject(activep: Project, projects: Project[]) {
	const result=projects[findProjectInList(activep, projects)+1];

	if (result) {
		console.log("next " + result);
		return result;
	} else {
		return false;
	}
}


export function getPrevProject(activep: Project, projects: Project[]) {
	const result=projects[(findProjectInList(activep, projects)-1)]

	if (result) {
		console.log("previous " + result);
		return result;
	} else {
		return false;
	}
}

// const slugs = projects.map(p => p.slug);


export default function WorkNavigator({
  projects, activeProject
}: WorkNavigatorProps) {

  const nextProject = getNextProject(activeProject, projects)
  const prevProject = getPrevProject(activeProject, projects)

  return (
    <div className={styles.container}>

		  <div className={styles.prevProject}>
		     {prevProject &&
				  <div>
				  		<h5>Previous case</h5>
						<a className={styles.projectTitle} href={'/work/' + prevProject.slug}> {prevProject.title} </a>
				  </div>
			  }
		  </div>

   	  <div className={styles.nextProject}>
		     {nextProject &&
				  <div>
				  		<h5>Next case</h5>
						<a className={styles.projectTitle} href={'/work/' + nextProject.slug}> {nextProject.title} </a>
				  </div>
			  }
		  </div>


    </div>
  )
}
