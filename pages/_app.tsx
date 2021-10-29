import type { AppProps } from 'next/app';

import NextNProgress from 'nextjs-progressbar';
import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';

import SEO from 'next-seo.config';

import '../styles/globals.css';
import '@fontsource/source-sans-pro';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <motion.div
      key={router.route}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        }
      }}
    >
      <DefaultSeo {...SEO} />
      <NextNProgress color="#f54318" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </motion.div>
  );
}
export default MyApp;
