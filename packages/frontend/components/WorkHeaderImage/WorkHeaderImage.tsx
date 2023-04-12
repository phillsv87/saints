import React from "react";
import { Project, ProjectImage } from "../../lib/types";
import styles from './WorkHeaderImage.module.css';

interface WorkHeaderImageProps {
	projectImage: ProjectImage
}

export default function WorkHeaderImage({
  projectImage
}: WorkHeaderImageProps) {
  return (
    <div className={styles.container}>
   	<img src={projectImage.url} 
   		  width="100%" 
   		  height="100%"/>
    </div>  
  )
}
