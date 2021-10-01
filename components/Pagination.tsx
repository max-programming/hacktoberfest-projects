import Link from 'next/link';
import { MouseEventHandler } from 'react';

interface Props {
  languageName: string;
  page: number;
}

export default function Pagination({ languageName, page }: Props) {
  return (
    <div className="items-center justify-center my-5 btn-group">
      <Link href={`/repos/${languageName}?p=${page - 1}`}>
        <a className="btn btn-outline btn-wide">Previous Page</a>
      </Link>
      <Link href={`/repos/${languageName}?p=${page + 1}`}>
        <a className="btn btn-outline btn-wide">Next Page</a>
      </Link>
    </div>
  );
}
