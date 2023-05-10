import Pagination from '@/components/Pagination';
import RepoCard from '@/components/RepoCard';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Sort from '@/components/Sort';
import StarsFilter from '@/components/StarsFilter';
import capFirstLetter from '@/utils/capFirstLetter';
import { getReposData } from '@/utils/getReposData';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { language: string };
  searchParams: Record<string, string>;
};

export const runtime = 'edge';
export function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Metadata {
  return {
    ...parent,
    title: `${capFirstLetter(params.language)} Repositories`
  };
}

export default async function RepositoriesPage({
  params,
  searchParams
}: Props) {
  const data = await getReposData(
    params.language,
    new URLSearchParams(searchParams)
  );
  if (!data) notFound();
  const { repos, page } = data;

  return (
    <>
      <ScrollToTopButton />
      <div className="container mx-auto">
        <div className="min-h-screen pt-5">
          <div className="text-center">
            <div className="w-5/6 max-w-md mx-auto">
              <h1 className="mb-5 text-5xl font-bold">
                {repos.total_count} repositories for{' '}
                <span className="font-mono underline text-primary">
                  {searchParams.q
                    ? searchParams.q + ' in ' + capFirstLetter(params.language)
                    : capFirstLetter(params.language)}
                </span>
              </h1>
            </div>
          </div>
          <Sort />
          <StarsFilter />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.items.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
        <Pagination
          page={page}
          totalCount={repos.total_count}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
