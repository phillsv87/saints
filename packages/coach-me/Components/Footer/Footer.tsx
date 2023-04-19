import React from "react";
import Link from 'next/link'

import styles from './Footer.module.css';

interface HeaderProps {
}

export default function Header({
}: HeaderProps) {
  return (
	  <div className={styles.container}>
	  	Copyright &copy; 2023
	  </div>
  )
}

