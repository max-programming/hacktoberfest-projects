import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { SessionProvider, type SessionProviderProps } from 'next-auth/react';

import SEO from 'next-seo.config';

import '@fontsource/poppins';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Footer from 'components/Footer';
import ReportModal from 'components/ReportModal';
import { Toaster } from 'react-hot-toast';

function MyApp({
  Component,
  pageProps,
  router
}: AppProps<SessionProviderProps>) {
  return (
    <SessionProvider session={pageProps.session}>
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        className="pt-2"
        variants={{
          initial: {
            opacity: 0
          },
          animate: {
            opacity: 1
          }
        }}
      >
        <Head>
          <script
            async
            defer
            data-website-id="2529a688-ee5c-4869-9f85-7bb8fa5b6518"
            src="https://insights.usmans.me/umami.js"
          ></script>
        </Head>
        <DefaultSeo {...SEO} />
        <NextNProgress color="#ffd74d" options={{ showSpinner: false }} />
        <Component {...pageProps} />
        <Footer />
        <ReportModal />
        <Toaster position="bottom-right" />
      </motion.div>
    </SessionProvider>
  );
}
export default MyApp;
