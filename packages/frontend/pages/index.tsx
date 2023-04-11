import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<NavBar />

			<div id="hero">
				<div className="video-container">
					<video 
						autoPlay={true}
						loop 
						muted>
						<source 
							src="/hero/drone.mp4" 
							type="video/mp4" />
					</video>
				</div>
			</div>

			<div id="about">				
				<div className="section left-column">
					<div className="label">
						<h2>About</h2>
					</div>
				</div>
				<div className="section right-column">
					<div className="content">
						<p>We are <em>passionate storytellers</em> who love to conceive, create and communicate stories across every possible medium.</p>
					</div>
				</div>														
			</div>

			<div id="our-work">
				<h2>Our work</h2>
				
				<div className="content">
					<p>We are a design and content creation agency dedicated to creating, curating, producing, and distributing branded content.</p>

					<span className="our-playgrounds">apps  /  digital  /  design  /  art  /  strategy</span>			
					
					<div className="projects">
						<ul>
							<li><img src="/img/projects/harvard-innovation-lab.png" alt="Harvard Innovation Lab" /></li>
							<li><img src="/img/projects/liirn.png" alt="Liirn" /></li>
							<li><img src="/img/projects/harvard-innovation-lab.png" alt="Harvard Innovation Lab" /></li>
						</ul>

						<ul className="secondColumn">
							<li><img src="/img/projects/momo.png" alt="Momo Nest Homes" /></li>
							<li><img src="/img/projects/liirn.png" alt="Liirn" /></li>
							<li><img src="/img/projects/momo.png" alt="Momo Nest Homes" /></li>
						</ul>

						<ul className="thirdColumn">
							<li><img src="/img/projects/puma.png" alt="Puma" /></li>
							<li><img src="/img/projects/wlth.png" alt="WLTH" /></li>
							<li><img src="/img/projects/puma.png" alt="Puma" /></li>
						</ul>					
					</div>		
				</div>
				

			</div>

			<div id="services">
				<div className="section left-column">
					<div className="label">  
						<h2>Services</h2>
					</div>
				</div>
				
				<div className="section right-column">
					<div className="content">
							
							<ul>
								<li className="serviceCategory firstServiceCategory">Creative</li>
		
								<li className="serviceName topPadding">Art Direction & Design</li>
								<li className="serviceName">Branding & Identity</li>
								<li className="serviceName">Creative & Development</li>
							</ul>

							<ul className="paddedList">
								<li className="serviceCategory">Content</li>
		
								<li className="serviceName topPadding">Film & Direction</li>
								<li className="serviceName">Production</li>
								<li className="serviceName">Postproduction</li>
							</ul>

							<ul>
								<li className="serviceCategory">Strategy</li>
		
								<li className="serviceName topPadding">Brand Strategy</li>
								<li className="serviceName">Content Strategy</li>
								<li className="serviceName">Digital Strategy</li>
							</ul>
						
					</div>
				</div>
			</div>

			<div id="clients">
			  <ul className="imageParade">
				  <li><img src="/img/logos/liirn.png" alt="Liirn" /></li>
				  <li><img src="/img/logos/momo.png" alt="Momo" /></li>
				  <li><img src="/img/logos/harvard-innovation-lab.png" alt="Harvard Innovation Labs" /></li>
				  <li><img src="/img/logos/raise-green.png" alt="Raise Green" /></li>
				  <li><img src="/img/logos/mr-porter.png" alt="Mr Porter" /></li>
				  <li><img src="/img/logos/contents.png" alt="Contents" /></li>
				  <li><img src="/img/logos/foundation-rwanda.png" alt="Foundation Rwanda" /></li>
				  <li><img src="/img/logos/le-shop.png" alt="Le Shop" /></li>
			  </ul>	  	  
			</div>

			<Footer />
		</div>
  )
}

export default Home