import styles from '../styles/CoachMe.module.css'

import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Coach Me</title>
		 			 <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css" />
	    			 <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />		 			 
					 <link href="/coachme.css" rel="stylesheet" />				
					 	 

					 <link rel="preconnect" href="https://fonts.googleapis.com" />
					 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					 <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,600;0,800;1,300;1,400;1,600;1,800&display=swap" rel="stylesheet" />					 
            </Head>
            <main className={styles.container}>
                <Component {...pageProps} />			 							 
			 		 <script src="https://vjs.zencdn.net/8.0.4/video.min.js"></script>					 
				</main>
        </>
    );
}

export default CustomApp;
