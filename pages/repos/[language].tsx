import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';

import Card from 'components/Card';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Sort from 'components/Sort';
import StarsFilter from 'components/StarsFilter';
import capFirstLetter from 'utils/capFirstLetter';
import { RepoItem, RepoData } from 'types';
import { env } from 'env.mjs';
import { getXataClient } from 'xata';

interface Props {
  page: number;
  languageName: string;
  repos: RepoData;
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const languageName = ctx.params?.language as string;
  const page = ctx.query.p || '1';
  const sort = ctx.query.s || '';
  const order = ctx.query.o || 'desc';
  const searchQuery = ctx.query.q || '';
  const startStars = ctx.query.startStars || 1;
  const endStars = ctx.query.endStars || '';
  const starsQuery =
    startStars && endStars
      ? `stars:${startStars}..${endStars}`
      : startStars && !endStars
        ? `stars:>${startStars}`
        : !startStars && endStars
          ? `stars:<${endStars}`
          : '';

  const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${languageName}+${searchQuery}+${starsQuery}&page=${page}&per_page=21&sort=${sort}&order=${order}`;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.mercy-preview+json'
  };

  if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;

  const res = await fetch(apiUrl, { headers });

  if (!res.ok) {
    return {
      notFound: true
    };
  }

  const client = getXataClient();
  const repos = await res.json();

  const reports = await client.db.reports.filter({ valid: false }).getMany();

  repos.items = repos.items
    .filter((repo: RepoItem) => !repo.archived)
    .filter(
      (repo: RepoItem) => !reports.find(report => report.repoId === repo.id)
    );

  if (repos.items.length < 1) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      page: +page,
      repos,
      languageName
    }
  };
};

const Language = ({ page, repos, languageName }: Props) => {
  const [scrollToTopBtn, setScrollToTopBtn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onScroll = () => {
    if (window.scrollY >= 200) {
      setScrollToTopBtn(true);
    } else {
      setScrollToTopBtn(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Head>
        <title>{`${capFirstLetter(languageName)} Repositories`}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.ico"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.ico" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.ico" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#1A202C"></meta>
      </Head>

      <Header />
      <AnimatePresence>
        {scrollToTopBtn && (
          <motion.div
            className="fixed z-20 bottom-4 right-4"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="relative flex items-center justify-center w-12 text-2xl transition-transform rounded-full aspect-square bg-2023-bavarian-blue-2 hover:scale-95 ">
              <FaAngleUp className="text-slate-100" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto">
        <div className="min-h-screen pt-5">
          <div className="text-center">
            <div className="w-5/6 max-w-md mx-auto">
              <h1 className="mb-5 text-5xl font-bold uppercase text-neutral-100">
                {repos.total_count} repositories for{' '}
                <span className="font-mono text-2023-bavarian-gold-2">
                  {router.query.q
                    ? router.query.q + ' in ' + languageName
                    : languageName}
                </span>
              </h1>
            </div>
          </div>
          <Sort />
          <StarsFilter />
          <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.items.map(repo => (
              <Card key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
        <Pagination page={page} totalCount={repos.total_count} />
      </div>
    </>
  );
};

export default Language;
