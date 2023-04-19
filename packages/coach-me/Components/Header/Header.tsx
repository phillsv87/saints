import React from "react";
import Link from 'next/link'

import styles from './Header.module.css';

import { Coach } from '../../lib/types'

interface HeaderProps {
	coach: Coach
}

export default function Header({
	coach
}: HeaderProps) {
  return (
	  <div className={styles.header}>
	  
	  		<div><h1>Coach Me</h1></div>
	  
	  		<div>
			   <a className={styles.signupButton} target="_blank" href={coach?.calendly!}>SIGN UP FREE</a>
	 		</div>
	  </div>
  )
}

