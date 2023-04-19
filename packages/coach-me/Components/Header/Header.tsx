import React from "react";
import Link from 'next/link'

import styles from './Header.module.css';

interface HeaderProps {
}

export default function Header({
}: HeaderProps) {
  return (
	  <div className={styles.header}>
	  
	  		<div><h1>Coach Me</h1></div>
	  
	  		<div><a className={styles.signupButton} href="#get-started">SIGN UP FREE</a></div>
	  </div>
  )
}

