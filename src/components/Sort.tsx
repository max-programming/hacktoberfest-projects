'use client';
import Link from 'next/link';
import languages from '@/assets/languages.json';
import sortByName from '@/utils/sortByName';
import { FaArrowUp, FaCode } from 'react-icons/fa';
import { usePathname, useSearchParams } from 'next/navigation';

const { main1: mainLanguages } = languages;

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

export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = Object.fromEntries(searchParams);

  function selectedSort(): SortTypes {
    if (searchParams.get('o') === 'asc') {
      if (searchParams.get('s') === 'stars') return SortTypes.FewestStars;
      if (searchParams.get('s') === 'forks') return SortTypes.FewestForks;
      if (searchParams.get('s') === 'updated')
        return SortTypes.LeastRecentlyUpdated;
      return SortTypes.BestMatch;
    } else if (searchParams.get('o') === 'desc') {
      if (searchParams.get('s') === 'stars') return SortTypes.MostStars;
      if (searchParams.get('s') === 'forks') return SortTypes.MostForks;
      if (searchParams.get('s') === 'updated') return SortTypes.RecentlyUpdated;
      if (searchParams.get('s') === 'help-wanted-issues')
        return SortTypes.MostHelpWantedIssues;
      return SortTypes.BestMatch;
    } else {
      return SortTypes.BestMatch;
    }
  }

  return (
    <div className="flex justify-center items-center mb-2 flex-col gap-2">
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="m-1 btn w-60">
          <FaCode className="w-6 h-6 mr-3" />
          Language
        </div>
        <div className="h-64 p-2 overflow-y-scroll shadow dropdown-content bg-base-100 rounded-box w-60">
          <ul tabIndex={0} className="menu menu-vertical">
            {mainLanguages.sort(sortByName).map(language => (
              <li key={language}>
                <Link href={`/repos/${language.toLowerCase()}`}>
                  {language}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="btn mb-3 w-60">
          <FaArrowUp className="w-6 h-6 mr-3" />
          {selectedSort()}
        </div>
        <div className="h-64 p-2 overflow-y-scroll shadow dropdown-content bg-base-100 rounded-box w-60">
          <ul tabIndex={0} className="menu menu-vertical">
            <li>
              <Link href={{ pathname, query: { ...query } }}>Best match</Link>
            </li>
            <li>
              <Link
                href={{ pathname, query: { ...query, s: 'stars', o: 'desc' } }}
              >
                Most stars
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname, query: { ...query, s: 'stars', o: 'asc' } }}
              >
                Fewest stars
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname, query: { ...query, s: 'forks', o: 'desc' } }}
              >
                Most forks
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname, query: { ...query, s: 'forks', o: 'asc' } }}
              >
                Fewest forks
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname,
                  query: { ...query, s: 'help-wanted-issues', o: 'desc' }
                }}
              >
                Most help wanted issues
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname,
                  query: { ...query, s: 'updated', o: 'desc' }
                }}
              >
                Recently updated
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname, query: { ...query, s: 'updated', o: 'asc' } }}
              >
                Least recently updated
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
