import React from "react";
import { Project } from "../../lib/types";
import styles from './PullQuote.module.css';

interface PullQuoteProps {
	quote: string;
}

export default function WorkHeaderImage({
  quote
}: PullQuoteProps) {
  return (
    <div className={styles.container}>
		  <hr className={styles.pullquote} />
		  <p className={styles.pullquote}>{ quote }</p>
		  <hr className={styles.pullquote}/>
    </div>
  
  
  
  )
}
