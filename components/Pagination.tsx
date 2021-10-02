import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface Props {
  languageName: string;
  page: number;
}

const Pagination = ({ languageName, page }: Props) => {
  const router = useRouter();
  return (
    <div className="items-center justify-center my-6 btn-group">
      {page > 1 && (
        <Link href={{ query: { ...router.query, p: page - 1 } }}>
          <a className="btn btn-outline btn-wide">
            <BsArrowLeft />
            <span className="ml-2">Previous Page</span>
          </a>
        </Link>
      )}
      <Link href={{ query: { ...router.query, p: page + 1 } }}>
        <a className="btn btn-outline btn-wide">
          <span className="mr-2">Next Page</span>
          <BsArrowRight />
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
