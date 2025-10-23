import { env } from '@/env.mjs';
import { notFound } from 'next/navigation';
import { Header } from '@/app/(public)/_components/header';
import { ScrollToTop } from './_components/scroll-to-top';
import { RepoCard } from './_components/repo-card';
import { Sorter } from './_components/sorter';
import { StarsFilter } from './_components/stars-filter';
import { Pagination } from './_components/pagination';
import { auth } from '@/auth';
import { db } from '@/lib/db/connection';
import { accountsTable, reportsTable } from '@/lib/db/migrations/schema';
import { eq } from 'drizzle-orm';
import { capitalize } from '@/lib/utils';
import type { RepoResponse, RepoData, RepoItem, SearchParams } from '@/types';
import { graphql } from '@octokit/graphql';
import { GetRepositories } from '@/lib/gql/repositories.gql.ts';
import fs from 'fs/promises';

export default async function ReposPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const langs: string[] = Array.isArray(sp.l)
    ? sp.l
    : sp.l
      ? [String(sp.l)]
      : [];

  const reposRes = await getRepos(langs, sp);
  if (!reposRes) notFound();

  const { result } = reposRes;
  const languagesList = langs
    .map(lang => capitalize(decodeURIComponent(lang)))
    .join(', ');

  return (
    <>
      <Header />
      <ScrollToTop />
      <div className="w-full overflow-x-hidden">
        <div className="container mx-auto px-4 pt-32 sm:pt-36 md:pt-40 pb-8">
          <div className="min-h-screen">
            <div className="text-center mb-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium uppercase text-hacktoberfest-light break-words px-2">
                  <span className="font-bold heading-text">
                    {Intl.NumberFormat().format(result.search.repositoryCount)}
                  </span>{' '}
                  repositories for{' '}
                  <span className="font-bold heading-text">
                    {sp.q ? sp.q + ' in ' + languagesList : languagesList}
                  </span>
                </h1>
              </div>
            </div>
            <Sorter />
            <StarsFilter />
            <div className="grid grid-cols-1 gap-6 px-2 sm:px-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.search.nodes?.map(
                repo => repo && <RepoCard key={repo?.id} repo={repo} />
              )}
            </div>
          </div>
          <Pagination
            pageInfo={result.search.pageInfo}
            totalCount={result.search.repositoryCount}
            searchParams={sp}
          />
        </div>
      </div>
    </>
  );
}

async function getRepos(
  languages: string[],
  searchParams: SearchParams
): Promise<RepoResponse | undefined> {
  const session = await auth();
  const {
    p: page = '1',
    s: sort = '',
    o: order = 'desc',
    q: searchQuery = '',
    startStars = '1',
    endStars = '',
    after = null
  } = searchParams;

  const starsQuery =
    startStars && endStars
      ? `stars:${startStars}..${endStars}`
      : startStars && !endStars
        ? `stars:>${startStars}`
        : !startStars && endStars
          ? `stars:<${endStars}`
          : '';

  const combinedLangs = languages.map(l => `language:${l}`).join(' ');

  const apiUrl = new URL('https://api.github.com/search/repositories');
  apiUrl.searchParams.set('page', page.toString());
  apiUrl.searchParams.set('per_page', '21');
  apiUrl.searchParams.set('sort', sort.toString());
  apiUrl.searchParams.set('order', order.toString());
  apiUrl.searchParams.set(
    'q',
    `topic:hacktoberfest ${combinedLangs} ${searchQuery} ${starsQuery}`
  );

  const headers: Record<Lowercase<string>, string | number | undefined> = {};

  const userId = session?.user?.id;

  if (userId) {
    const [account] = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.userId, userId))
      .limit(1);

    if (account && account.access_token) {
      headers.authorization = `Bearer ${account.access_token}`;
    } else if (env.AUTH_GITHUB_TOKEN) {
      headers.authorization = `Bearer ${env.AUTH_GITHUB_TOKEN}`;
    }
  } else if (env.AUTH_GITHUB_TOKEN) {
    headers.authorization = `Bearer ${env.AUTH_GITHUB_TOKEN}`;
  }

  const graphqlWithAuth = graphql.defaults({
    headers
  });

  const result = await graphqlWithAuth<ReturnType<GetRepositories>>(
    GetRepositories,
    {
      queryString:
        `topic:hacktoberfest ${combinedLangs} ${searchQuery} ${starsQuery} ${sort ? `sort:${sort}-${order}` : ''}`.trim(),
      after: Array.isArray(after) ? null : after
    }
  );

  await fs.writeFile('result.json', JSON.stringify(result));

  // const res = await fetch(apiUrl, { headers });
  // if (!res.ok) return undefined;

  // const repos = (await res.json()) as RepoData;
  // const reports = await getReportedRepos();

  // repos.items = repos.items.filter((repo: RepoItem) => {
  //   return !repo.archived && !reports.find(report => report.repoId === repo.id);
  // });

  return {
    page: +page.toString(),
    languageName: languages.join(', '),
    repos: null,
    result
  };
}

async function getReportedRepos() {
  const reports = await db
    .select()
    .from(reportsTable)
    .where(eq(reportsTable.valid, false))
    .limit(100);

  return reports;
}
