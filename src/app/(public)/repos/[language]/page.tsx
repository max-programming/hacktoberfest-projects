import { env } from '@/env.mjs';
import { getXataClient } from '@/xata';
import { notFound } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import { Header } from '@/app/(public)/_components/header';
import { ScrollToTop } from './_components/scroll-to-top';
import { RepoCard } from './_components/repo-card';
import { Sorter } from './_components/sorter';
import { StarsFilter } from './_components/stars-filter';
import { Pagination } from './_components/pagination';
import type { RepoData, RepoItem, RepoResponse, SearchParams } from '@/types';
import type { Metadata } from 'next';
import { auth } from '@/auth';

interface ReposPageProps {
  params: Promise<{ language: string }>;
  searchParams: Promise<SearchParams>;
}

export default async function ReposPage({
  params,
  searchParams
}: ReposPageProps) {
  const { language } = await params;
  const sp = await searchParams;

  const reposRes = await getRepos(language, sp);

  if (!reposRes) notFound();

  const { repos, page } = reposRes;

  return (
    <>
      <Header />
      <ScrollToTop />
      <div className="container mx-auto">
        <div className="min-h-screen pt-5">
          <div className="text-center">
            <div className="w-5/6 max-w-md mx-auto">
              <h1 className="mb-5 text-5xl font-medium uppercase text-hacktoberfest-light-green">
                {repos.total_count} repositories for{' '}
                <span className="font-mono font-bold text-hacktoberfest-pink">
                  {sp.q
                    ? sp.q + ' in ' + capitalize(decodeURIComponent(language))
                    : capitalize(decodeURIComponent(language))}
                </span>
              </h1>
            </div>
          </div>
          <Sorter />
          <StarsFilter />
          <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.items.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
        <Pagination
          page={page}
          totalCount={repos.total_count}
          searchParams={sp}
        />
      </div>
    </>
  );
}

export async function generateMetadata({
  params
}: ReposPageProps): Promise<Metadata> {
  const { language } = await params;
  return {
    title: `${capitalize(decodeURIComponent(language))} Repositories`
  };
}

async function getRepos(
  language: string,
  searchParams: SearchParams
): Promise<RepoResponse | undefined> {
  const client = getXataClient();
  const session = await auth();
  const {
    p: page = '1',
    s: sort = '',
    o: order = 'desc',
    q: searchQuery = '',
    startStars = '1',
    endStars = ''
  } = searchParams;

  const starsQuery =
    startStars && endStars
      ? `stars:${startStars}..${endStars}`
      : startStars && !endStars
        ? `stars:>${startStars}`
        : !startStars && endStars
          ? `stars:<${endStars}`
          : '';

  const apiUrl = new URL('https://api.github.com/search/repositories');
  apiUrl.searchParams.set('page', page.toString());
  apiUrl.searchParams.set('per_page', '21');
  apiUrl.searchParams.set('sort', sort.toString());
  apiUrl.searchParams.set('order', order.toString());
  apiUrl.searchParams.set(
    'q',
    `topic:hacktoberfest language:${language} ${searchQuery} ${starsQuery}`
  );

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.mercy-preview+json'
  };
  const userId = session?.user?.id;

  if (userId) {
    const account = await client.db.nextauth_accounts
      .select(['access_token'])
      .filter({ 'user.id': userId })
      .getFirst();

    if (account && account.access_token) {
      headers.Authorization = `Bearer ${account.access_token}`;
    } else if (env.AUTH_GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${env.AUTH_GITHUB_TOKEN}`;
    }
  } else if (env.AUTH_GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.AUTH_GITHUB_TOKEN}`;
  }

  const res = await fetch(apiUrl, { headers });
  console.log(res);
  console.log(headers);
  console.log(env);
  if (!res.ok) return undefined;

  const repos = (await res.json()) as RepoData;
  const reports = await getReportedRepos();

  repos.items = repos.items.filter((repo: RepoItem) => {
    return !repo.archived && !reports.find(report => report.repoId === repo.id);
  });

  if (!Array.isArray(repos.items) || repos.items?.length < 1) return undefined;

  return {
    page: +page.toString(),
    languageName: language,
    repos
  };
}

async function getReportedRepos() {
  const client = getXataClient();
  const reports = await client.db.reports
    .select(['repoId'])
    .filter({ valid: false })
    .getMany();

  return reports;
}
