'use client';

import { Button } from '@/app/(public)/_components/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { SearchParams } from '@/types';
import type { GetRepositories } from '@/lib/gql/repositories.gql.ts';

interface PaginationProps {
  pageInfo: ReturnType<GetRepositories>['search']['pageInfo'];
  totalCount: number;
  searchParams: SearchParams;
}

export function Pagination({
  pageInfo,
  totalCount,
  searchParams
}: PaginationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function loadMore() {
    const params = new URLSearchParams(
      Object.entries(searchParams).map(([k, v]) => [k, String(v)])
    );

    if (pageInfo.hasNextPage) {
      params.set('after', pageInfo.endCursor ?? '');
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }

  if (!pageInfo.hasNextPage) {
    return null;
  }

  return (
    <div className="flex justify-center my-6">
      <Button
        onClick={loadMore}
        disabled={isPending}
        className="btn-wide hover:bg-primary-btn-hover-gradient hover:text-hacktoberfest-dark-green disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            <span className="ml-2">Loading More...</span>
          </>
        ) : (
          <span>Load More</span>
        )}
      </Button>
    </div>
  );
}
