'use client';

import { Button } from '@/app/(public)/_components/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { SearchParams } from '@/types';

const MAX_PER_PAGE = 21;
interface PaginationProps {
  page: number;
  totalCount: number;
  searchParams: SearchParams;
}

export function Pagination({
  page,
  totalCount,
  searchParams
}: PaginationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changePage(delta: number) {
    const params = new URLSearchParams(
      Object.entries(searchParams).map(([k, v]) => [k, String(v)])
    );
    params.set('p', String(page + delta));

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col items-center gap-4 my-6 justify-evenly sm:gap-0 sm:flex-row">
      {page > 1 && (
        <Button
          onClick={() => changePage(-1)}
          disabled={isPending}
          className="btn-wide hover:bg-primary-btn-hover-gradient hover:text-hacktoberfest-dark-green disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="ml-2">Loading...</span>
            </>
          ) : (
            <>
              <ArrowLeft />
              <span className="ml-2">Previous Page</span>
            </>
          )}
        </Button>
      )}
      {totalCount >= MAX_PER_PAGE &&
        page < Math.ceil(totalCount / MAX_PER_PAGE) && (
          <Button
            onClick={() => changePage(1)}
            disabled={isPending}
            className="btn-wide hover:bg-primary-btn-hover-gradient hover:text-hacktoberfest-dark-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <span className="mr-2">Loading...</span>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                <span className="mr-2">Next Page</span>
                <ArrowRight />
              </>
            )}
          </Button>
        )}
    </div>
  );
}
