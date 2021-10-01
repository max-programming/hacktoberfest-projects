import type { AppProps } from 'next/app';

import NextNProgress from 'nextjs-progressbar';
import { DefaultSeo } from 'next-seo';

import SEO from 'next-seo.config';

import '../styles/globals.css';
import '@fontsource/source-sans-pro';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextNProgress color="#f54418" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
