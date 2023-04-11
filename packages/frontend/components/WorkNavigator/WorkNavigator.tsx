import React from "react";
import { Project, ProjectImage } from "../../lib/types";
import styles from './WorkNavigator.module.css';

interface WorkNavigatorProps {
  projects: Project[],	
  activeProject: Project
}


export function findProjectInList(specimen: Project, projects: Project[]) {
	var activeIndex;
	
	projects.map((p, index) => {
		console.log("   against: " + p.slug)
		if (specimen.slug == p.slug) {
			console.log("    bingo! " + index);
			activeIndex = index;
		}	
	});
	
	return activeIndex;
}


export function getNextProject(activep: Project, projects: Project[]) {
	var result;

	if (result = projects[(findProjectInList(activep, projects)+1)]) {
		console.log("next " + result);	
		return result;
	} else {
		return false;
	}
}


export function getPrevProject(activep: Project, projects: Project[]) {
	var result;

	if (result = projects[(findProjectInList(activep, projects)-1)]) {
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

  var nextProject = getNextProject(activeProject, projects)
  var prevProject = getPrevProject(activeProject, projects)
	
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