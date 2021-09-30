import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color='yellow' />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
