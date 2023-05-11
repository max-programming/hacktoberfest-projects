import Link from 'next/link';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface Props {
  page: number;
  totalCount: number;
  searchParams: Record<string, string>;
  language: string;
}

const MAX_PER_PAGE = 21;

export default function Pagination({
  page,
  totalCount,
  searchParams,
  language,
}: Props) {
  return (
    <div className='items-center flex justify-evenly my-6 flex-col gap-4 sm:gap-0 sm:flex-row'>
      {page > 1 && (
        <Link
          href={{
            pathname: `/repos/${language}`,
            query: { ...searchParams, p: page - 1 },
          }}
        >
          <button className='btn btn-wide'>
            <BsArrowLeft />
            <span className='ml-2'>Previous Page</span>
          </button>
        </Link>
      )}
      {totalCount >= MAX_PER_PAGE &&
        page < Math.ceil(totalCount / MAX_PER_PAGE) && (
          <Link
            href={{
              pathname: `/repos/${language}`,
              query: { ...searchParams, p: page + 1 },
            }}
          >
            <button className='btn btn-wide'>
              <span className='mr-2'>Next Page</span>
              <BsArrowRight />
            </button>
          </Link>
        )}
    </div>
  );
}
