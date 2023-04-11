import React from "react";
import Link from 'next/link'

import styles from './NavBar.module.css';

interface NavBarProps {
}

export default function NavBar({
  data
}: NavBarProps) {
  return (
		<div id="header">
			<Link href="/">
				<img src="/img/saints.png" className="logo" alt="SAINTS New York" />
			</Link>

			<ul className="navLinks">
				<li><Link href="/#about">About</Link></li>
				<li><Link href="/#our-work">Our work</Link></li>
				<li><Link href="/#services">Services</Link></li>
				<li><Link href="/#contact">Contact</Link></li>
			</ul>
		</div>
  )
}
