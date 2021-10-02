import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  languageName: string;
  page: number;
}

enum SortTypes {
  BestMatch = 'Best match',
  MostStars = 'Most stars',
  FewestStars = 'Fewest stars',
  MostForks = 'Most forks',
  FewestForks = 'Fewest forks',
  MostHelpWantedIssues = 'Most help wanted issues',
  RecentlyUpdated = 'Recently updated',
  LeastRecentlyUpdated = 'Least recently updated'
}

export default function Sort({ languageName, page }: Props) {
  const router = useRouter();
  const selectedSort = (): SortTypes => {
    if (router.query.o === 'asc') {
      if (router.query.s === 'stars') return SortTypes.FewestStars;
      if (router.query.s === 'forks') return SortTypes.FewestForks;
      if (router.query.s === 'updated') return SortTypes.LeastRecentlyUpdated;
      return SortTypes.BestMatch;
    } else if (router.query.o === 'desc') {
      if (router.query.s === 'stars') return SortTypes.MostStars;
      if (router.query.s === 'forks') return SortTypes.MostForks;
      if (router.query.s === 'updated') return SortTypes.RecentlyUpdated;
      if (router.query.s === 'help-wanted-issues')
        return SortTypes.MostHelpWantedIssues;
      return SortTypes.BestMatch;
    } else {
      return SortTypes.BestMatch;
    }
  };
  return (
    <div className="flex justify-center mb-2">
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="m-1 btn">
          Sort: {selectedSort()}
        </div>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-60 overflow-y-scroll h-64"
        >
          <li>
            <Link href={`/repos/${languageName}?p=${page}`}>
              <a>Best match</a>
            </Link>
          </li>
          <li>
            <Link href={`/repos/${languageName}?p=${page}&s=stars&o=desc`}>
              <a>Most stars</a>
            </Link>
          </li>
          <li>
            <Link href={`/repos/${languageName}?p=${page}&s=stars&o=asc`}>
              <a>Fewest stars</a>
            </Link>
          </li>
          <li>
            <Link href={`/repos/${languageName}?p=${page}&s=forks&o=desc`}>
              <a>Most forks</a>
            </Link>
          </li>
          <li>
            <Link href={`/repos/${languageName}?p=${page}&s=forks&o=asc`}>
              <a>Fewest forks</a>
            </Link>
          </li>
          <li>
            <Link
              href={`/repos/${languageName}?p=${page}&s=help-wanted-issues&o=desc`}
            >
              <a>Most help wanted issues</a>
            </Link>
          </li>
          <li>
            <Link href={`/repos/${languageName}?p=${page}&s=updated&o=desc`}>
              <a>Recently updated</a>
            </Link>
          </li>
          <li>
            <Link href={`/repos/${languageName}?p=${page}&s=updated&o=asc`}>
              <a>Least recently updated</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
