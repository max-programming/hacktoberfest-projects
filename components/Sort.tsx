import { useRouter } from 'next/router';
import Link from 'next/link';
import languages from 'assets/languages.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import sortByName from 'utils/sortByName';
import Button from './Button';

const { mainLanguages } = languages;

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
  const router = useRouter();

  const navigationItems = [
    {
      name: "Best match",
      href: { query: { ...router.query } }
    },
    {
      name: "Most stars",
      href: { query: { ...router.query, s: 'stars', o: 'desc' } }
    },
    {
      name: "Fewest stars",
      href: { query: { ...router.query, s: 'stars', o: 'asc' } }
    },
    {
      name: "Most forks",
      href: { query: { ...router.query, s: 'forks', o: 'desc' } }
    },
    {
      name: "Fewest forks",
      href: { query: { ...router.query, s: 'forks', o: 'asc' } }
    },
    {
      name: "Most help wanted issues",
      href: { query: { ...router.query, s: 'help-wanted-issues', o: 'desc' } }
    },
    {
      name: "Recently updated",
      href: { query: { ...router.query, s: 'updated', o: 'desc' } }
    },
    {
      name: "Least recently updated",
      href: { query: { ...router.query, s: 'updated', o: 'asc' } }
    },

  ];

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
    <div className="flex justify-center items-center mb-2 flex-col gap-2">
      <div className="dropdown dropdown-hover">
        <Button tabIndex={0} className="m-1 py-2">
          <FontAwesomeIcon
            icon={faCode}
            className=" w-6 h-6 mr-3"
          ></FontAwesomeIcon>
          Language
        </Button>
        <div className="h-64 p-2 overflow-y-scroll shadow dropdown-content z-50 bg-base-100 rounded-box w-60">
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
        <Button tabIndex={0} className="py-2">
          <FontAwesomeIcon
            icon={faArrowUpAZ}
            className=" w-6 h-6 mr-3"
          ></FontAwesomeIcon>
          {selectedSort()}
        </Button>
        <div className="h-64 p-2 z-50 overflow-y-scroll shadow dropdown-content bg-base-100 rounded-box w-60">
          <ul tabIndex={0} className="menu menu-vertical">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link href={{ query: item.href.query }}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
