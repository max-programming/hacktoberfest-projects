import type { NextPage } from 'next';

import Head from 'next/head';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Hero from 'components/Hero';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hacktoberfest projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
