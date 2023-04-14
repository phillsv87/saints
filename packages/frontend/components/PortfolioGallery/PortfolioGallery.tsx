import React from "react";
import { Project, ProjectImage } from "../../lib/types";
import styles from './PortfolioGallery.module.css';

interface PortfolioGalleryProps {
	projects: Project[]
}


function splitProjectsIntoColumns(array: Array<Project>, columnSize=3) {
	const columns:Array<Array<Project>> = [];
	
	for (let i = 0; i < columnSize; i += 1) {			
		columns[i] = []
	}
	
	
	for (let i = 0; i < (array).length; i += 1) {			
		columns[i % columnSize].push(array[i])
	}
	
	
	return columns;
}

function nthListOfProjects(n=0, projects: Array<Project>) {
	var listItems:Array<Project> = [];
  
   var projectsColumns: Array<Project[]> = []
	projectsColumns = splitProjectsIntoColumns(projects, 3)
	
	projectsColumns[n].map( project => {
		if (project && project.images) {
			listItems.push(project);
		}
	})	
	
	return listItems;
}

function portfolioVerticalImage(project: Project) {
	if (project && project.images && project.images[1]) {
		return (
			<img src={project.images[1].url} />
		)
	} else {
		return (
			<img src="nil" />
		)
	}
	
	

}

export default function PortfolioGallery({
  projects
}: PortfolioGalleryProps) {
  return (
    <div className={styles.container}>
		<ul className="firstColumn">
	  		{ nthListOfProjects(0, projects).map( project =>  {
				return (
					<li><a href={'/work/' + project.slug}>{portfolioVerticalImage(project)}</a></li>
				)
			  })
		  }
		</ul>	
		  
	<ul className="secondColumn">
  		{ nthListOfProjects(1, projects).map( project =>  {
			return (
				<li><a href={'/work/' + project.slug}>{portfolioVerticalImage(project)}</a></li>
			)
		  })
	  }
	</ul>	
	  
<ul className="thirdColumn">
 		{ nthListOfProjects(2, projects).map( project =>  {
		return (
			<li><a href={'/work/' + project.slug}>{portfolioVerticalImage(project)}</a></li>
		)
	  })
  }
</ul>	

    </div>  
  )

}
