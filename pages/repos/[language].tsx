import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Card from 'components/Card';
import Header from 'components/Header';
import Pagination from 'components/Pagination';

import capFirstLetter from 'utils/capFirstLetter';
import Sort from 'components/Sort';
import { useRouter } from 'next/router';
import StarsFilter from 'components/StarsFilter';

interface Props {
  page: number;
  languageName: string;
  repos: any;
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const languageName = ctx.params?.language as string;
  const page = ctx.query.p || '1';
  const sort = ctx.query.s || '';
  const order = ctx.query.o || 'desc';
  const searchQuery = ctx.query.q || '';
  const startStars = ctx.query.startStars || 1;
  const endStars = ctx.query.endStars || '';
  const starsQuery = startStars && endStars ? `stars:${startStars}..${endStars}` : startStars && !endStars ? `stars:>${startStars}` : !startStars && endStars ? `stars:<${endStars}` : ''
  const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${languageName}+${searchQuery}+${starsQuery}&page=${page}&per_page=21&sort=${sort}&order=${order}`;
  const res = await fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github.mercy-preview+json' }
  });

  if (!res.ok) {
    return {
      notFound: true
    };
  }

  // Get the JSON response and parse it
  const repos = await res.json();

  return {
    props: {
      page: +page,
      repos,
      languageName
    }
  };
};

const Language = ({ page, repos, languageName }: Props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{capFirstLetter(languageName)} Repositories</title>
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

      <div className="container mx-auto">
        <div className="min-h-screen pt-5">
          <div className="text-center">
            <div className="w-5/6 max-w-md mx-auto">
              <h1 className="mb-5 text-5xl font-bold">
                {repos.total_count} repositories for{' '}
                <span className="font-mono underline text-primary">
                  {router.query.q
                    ? router.query.q + ' in ' + capFirstLetter(languageName)
                    : capFirstLetter(languageName)}
                </span>
              </h1>
            </div>
          </div>
          <Sort />
          <StarsFilter />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.items.map((repo: any) => (
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
