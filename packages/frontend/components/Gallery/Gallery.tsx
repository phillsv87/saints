import React from "react";
import { Project, ProjectImage } from "../../lib/types";
import styles from './Gallery.module.css';

interface GalleryProps {
  images: ProjectImage[]
}

export default function Gallery({
  images
}: GalleryProps) {
  return (
    <div className={styles.container}>
       <div className={styles.leftSection}>
	    	<img src={images[1].url} 
	    		  width="100%" 
	    		  height="100%"
	    		  alt={images[1].name} />
	    </div>
	    		  
	    <div className={styles.rightSection}>				  				  
	       <div className={styles.rightSectionTop}>			
  	    		<img src={images[2].url} 
	    		  width="100%" 
	    		  height="100%"
  	    			  alt={images[2].name} />
	    	</div>
	    			  
	       <div className={styles.rightSectionBottom}>
	    		<div className={styles.rightSectionBottomLeft}>
	      			<img src={images[3].url} 
	    		  width="100%" 
	    		  height="100%"
	      				  alt={images[3].name} />
	    			  
	    	    </div>
	    				  
 	    			 <div className={styles.rightSectionBottomRight}>
	    	  			<img src={images[4].url} 
	    		  width="100%" 
	    		  height="100%"
	    	  				  alt={images[4].name} />
	    		   
 	    		    </div>
	       </div>
	    </div>
    </div>
  
  
  
  )

}
