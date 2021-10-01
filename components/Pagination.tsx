import Link from 'next/link';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface Props {
  languageName: string;
  page: number;
}

const Pagination = ({ languageName, page }: Props) => {
  return (
    <div className="items-center justify-center my-6 btn-group">
      <Link href={`/repos/${languageName}?p=${page - 1}`}>
        <a className="btn btn-outline btn-wide">
          <BsArrowLeft />
          <span className="ml-2">Previous Page</span>
        </a>
      </Link>
      <Link href={`/repos/${languageName}?p=${page + 1}`}>
        <a className="btn btn-outline btn-wide">
          <span className="mr-2">Next Page</span>
          <BsArrowRight />
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
