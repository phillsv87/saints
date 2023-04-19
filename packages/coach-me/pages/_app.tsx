import styles from '../styles/CoachMe.module.css'

import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Coach Me</title>
	    			 <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />		 			 
            </Head>
            <main className={styles.app}>
                <Component {...pageProps} />
			 		 <script src="https://vjs.zencdn.net/8.0.4/video.min.js"></script>
            </main>
        </>
    );
}

export default CustomApp;
