import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Button from './Button';

interface Props {
  page: number;
  totalCount: number;
}

const MAX_PER_PAGE = 21;

function Pagination({ page, totalCount }: Props) {
  const router = useRouter();
  return (
    <div className="items-center flex justify-evenly my-6 flex-col gap-4 sm:gap-0 sm:flex-row">
      {page > 1 && (
        <Link href={{ query: { ...router.query, p: page - 1 } }}>
          <Button className="btn-wide">
            <BsArrowLeft />
            <span className="ml-2">Previous Page</span>
          </Button>
        </Link>
      )}
      {totalCount >= MAX_PER_PAGE &&
        page < Math.ceil(totalCount / MAX_PER_PAGE) && (
          <Link href={{ query: { ...router.query, p: page + 1 } }}>
            <Button className="btn-wide">
              <span className="mr-2">Next Page</span>
              <BsArrowRight />
            </Button>
          </Link>
        )}
    </div>
  );
}

export default Pagination;
