import { Button } from '@/app/(public)/_components/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
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
  return (
    <div className="flex flex-col items-center gap-4 my-6 justify-evenly sm:gap-0 sm:flex-row">
      {page > 1 && (
        <Link href={{ query: { ...searchParams, p: page - 1 } }}>
          <Button className="btn-wide hover:bg-hacktoberfest-green hover:text-hacktoberfest-dark-green">
            <ArrowLeft />
            <span className="ml-2">Previous Page</span>
          </Button>
        </Link>
      )}
      {totalCount >= MAX_PER_PAGE &&
        page < Math.ceil(totalCount / MAX_PER_PAGE) && (
          <Link href={{ query: { ...searchParams, p: page + 1 } }}>
            <Button className="btn-wide hover:bg-hacktoberfest-green hover:text-hacktoberfest-dark-green">
              <span className="mr-2">Next Page</span>
              <ArrowRight />
            </Button>
          </Link>
        )}
    </div>
  );
}
