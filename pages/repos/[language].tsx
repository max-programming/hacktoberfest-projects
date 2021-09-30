import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Card from '../../components/Card';
import Header from '../../components/Header';

interface Props {
  languageName: string;
  repos: any;
}

export default function Language({ repos, languageName }: Props) {
  return (
    <>
      <Head>
        <title>{languageName.toUpperCase()} Repositories</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='container mx-auto'>
        <div className='min-h-screen pt-5'>
          <div className='text-center'>
            <div className='w-5/6 max-w-md mx-auto'>
              <h1 className='mb-5 text-5xl font-bold'>
                {repos.total_count} repositories for{' '}
                <span className='font-mono underline text-warning'>
                  {languageName.toUpperCase()}
                </span>
              </h1>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {repos.items.map((repo: any) => (
              <Card key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const languageName = ctx.params?.language;
  const apiUrl = `https://api.github.com/search/repositories?q=topic%3Ahacktoberfest+language%3A${languageName}`;
  const res = await fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github.mercy-preview+json' },
  });
  const repos = await res.json();
  console.log(repos.items);
  return {
    props: {
      repos,
      languageName,
    },
  };
};
