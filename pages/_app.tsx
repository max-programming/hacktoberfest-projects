import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { DefaultSeo } from 'next-seo';

import SEO from 'next-seo.config';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextNProgress color="yellow" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
