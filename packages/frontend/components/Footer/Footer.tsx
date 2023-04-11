import React from "react";
import Link from 'next/link'

import styles from './Footer.module.css';

interface FooterProps {
}

export default function Footer({
  data
}: FooterProps) {
  return (
	  <div className={styles.container}>
			<div id="contact">								
				<div className="section left-column">
					<div className="content">
						<h3>Drop us a line</h3>
						<p>
							<Link 
								href="mailto:info@saintsnewyork.com">
									info@saintsnewyork.com
							</Link>
						</p>
					</div>
				</div>
				<div className="section right-column">
					<div className="content">
						<ul id="offices">
							<li>
								<div className="officeTitle">
									Saints NYC
								</div>
						
								<div className="officeAddress">
									270 Lafayette Street, Suite 200<br />
									New York, NY 10012 USA
								</div>
						
								<div className="officePhone">
									P. <Link href="tel:+16466136046">1 646 613 6046</Link>
								</div>
						
								<div className="officeEmail">
									E. <Link href="mailto:info@saintsnewyork.com">info@saintsnewyork.com</Link>
								</div>						
							</li>
					
					
							<li className="notFirstOffice">
								<div className="officeTitle">
									Saints CPH
								</div>
						
								<div className="officeAddress">
									Læderstrasde 11B 1tv,<br />
									Copenhagen, 1201
								</div>
						
								<div className="officePhone">
									P. <Link href="tel:+4555555555">45 55 55 55 55</Link>
								</div>
						
								<div className="officeEmail">
									E. <Link href="mailto:info@saintsnewyork.com">info@saintsnewyork.com</Link>
								</div>						
							</li>
						</ul>
					</div>
				</div>															
			</div>

			<div id="footer">
				<p>&copy;2022 Saints New York LLC</p>
			</div>
	  </div>
  
  
  )

}
