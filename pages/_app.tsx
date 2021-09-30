import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="yellow" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
