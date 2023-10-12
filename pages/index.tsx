import Head from 'next/head';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Hero from 'components/Hero';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hacktoberfest projects</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.ico"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.ico" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.ico" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.11.0/devicon.min.css"></link>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#1A202C"></meta>
      </Head>

      <Header />
      <Hero />
    </div>
  );
};
export default Home;
