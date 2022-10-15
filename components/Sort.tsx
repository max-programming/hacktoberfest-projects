import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import languages from 'assets/languages.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';

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
enum sorttype {
  language = 'language'
}

export default function Sort() {
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
  const selectsort = (): sorttype => {
    return sorttype.language;
  };
  return (
    <div className="flex justify-center items-center mb-2 flex-col gap-2">
      <div className="dropdown dropdown-hover ">
        <div tabIndex={0} className="m-1 btn w-60">
          <FontAwesomeIcon
            icon={faCode}
            className=" w-6 h-6 mr-3"
          ></FontAwesomeIcon>
          {selectsort()}
        </div>
        <ul className="h-64 p-2 overflow-y-scroll shadow menu dropdown-content bg-base-100 rounded-box w-60">
          <li>
            {mainLanguages.map(language => (
              <Link key={language} href={`/repos/${language.toLowerCase()}`}>
                <a>
                  <motion.button animate={{ scale: 1 }}>
                    {language}
                  </motion.button>
                </a>
              </Link>
            ))}
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-hover  ">
        <div tabIndex={0} className="m-1 btn w-60">
          <FontAwesomeIcon
            icon={faArrowUpAZ}
            className=" w-6 h-6 mr-3"
          ></FontAwesomeIcon>
          {selectedSort()}
        </div>
        <ul className="h-64 p-2 overflow-y-scroll shadow menu dropdown-content bg-base-100 rounded-box w-60">
          <li>
            <a>
              <Link href={{ query: { ...router.query } }}>
                <a>Best match</a>
              </Link>
            </a>
            <a>
              <Link
                href={{ query: { ...router.query, s: 'stars', o: 'desc' } }}
              >
                <a>Most stars</a>
              </Link>
            </a>
            <a>
              <Link href={{ query: { ...router.query, s: 'stars', o: 'asc' } }}>
                <a>Fewest stars</a>
              </Link>
            </a>
            <a>
              <Link
                href={{ query: { ...router.query, s: 'forks', o: 'desc' } }}
              >
                <a>Most forks</a>
              </Link>
            </a>
            <a>
              <Link href={{ query: { ...router.query, s: 'forks', o: 'asc' } }}>
                <a>Fewest forks</a>
              </Link>
            </a>
            <a>
              <Link
                href={{
                  query: { ...router.query, s: 'help-wanted-issues', o: 'desc' }
                }}
              >
                <a>Most help wanted issues</a>
              </Link>
            </a>
            <a>
              <Link
                href={{ query: { ...router.query, s: 'updated', o: 'desc' } }}
              >
                <a>Recently updated</a>
              </Link>
            </a>
            <a>
              <Link
                href={{ query: { ...router.query, s: 'updated', o: 'asc' } }}
              >
                <a>Least recently updated</a>
              </Link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
