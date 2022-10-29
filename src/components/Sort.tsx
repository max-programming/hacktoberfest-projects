import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import languages from "@/src/assets/languages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import sortByName from "@/src/utils/sortByName";

const { main1: mainLanguages } = languages;

enum SortTypes {
  BestMatch = "Best match",
  MostStars = "Most stars",
  FewestStars = "Fewest stars",
  MostForks = "Most forks",
  FewestForks = "Fewest forks",
  MostHelpWantedIssues = "Most help wanted issues",
  RecentlyUpdated = "Recently updated",
  LeastRecentlyUpdated = "Least recently updated",
}

export default function Sort() {
  const router = useRouter();
  const selectedSort = (): SortTypes => {
    if (router.query.o === "asc") {
      if (router.query.s === "stars") return SortTypes.FewestStars;
      if (router.query.s === "forks") return SortTypes.FewestForks;
      if (router.query.s === "updated") return SortTypes.LeastRecentlyUpdated;
      return SortTypes.BestMatch;
    } else if (router.query.o === "desc") {
      if (router.query.s === "stars") return SortTypes.MostStars;
      if (router.query.s === "forks") return SortTypes.MostForks;
      if (router.query.s === "updated") return SortTypes.RecentlyUpdated;
      if (router.query.s === "help-wanted-issues")
        return SortTypes.MostHelpWantedIssues;
      return SortTypes.BestMatch;
    } else {
      return SortTypes.BestMatch;
    }
  };
  return (
    <div className="mb-2 flex flex-col items-center justify-center gap-2">
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="btn m-1 w-60">
          <FontAwesomeIcon
            icon={faCode}
            className=" mr-3 h-6 w-6"
          ></FontAwesomeIcon>
          Language
        </div>
        <div className="dropdown-content rounded-box h-64 w-60 overflow-y-scroll bg-base-100 p-2 shadow">
          <ul tabIndex={0} className="menu menu-vertical">
            {mainLanguages.sort(sortByName).map((language) => (
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
          <FontAwesomeIcon
            icon={faArrowUpAZ}
            className=" mr-3 h-6 w-6"
          ></FontAwesomeIcon>
          {selectedSort()}
        </div>
        <div className="dropdown-content rounded-box h-64 w-60 overflow-y-scroll bg-base-100 p-2 shadow">
          <ul tabIndex={0} className="menu menu-vertical">
            <li>
              <Link href={{ query: { ...router.query } }}>
                Best match
              </Link>
            </li>
            <li>
              <Link
                href={{ query: { ...router.query, s: "stars", o: "desc" } }}
              >
                Most stars
              </Link>
            </li>
            <li>
              <Link href={{ query: { ...router.query, s: "stars", o: "asc" } }}>
                Fewest stars
              </Link>
            </li>
            <li>
              <Link
                href={{ query: { ...router.query, s: "forks", o: "desc" } }}
              >
                Most forks
              </Link>
            </li>
            <li>
              <Link href={{ query: { ...router.query, s: "forks", o: "asc" } }}>
                Fewest forks
              </Link>
            </li>
            <li>
              <Link
                href={{
                  query: {
                    ...router.query,
                    s: "help-wanted-issues",
                    o: "desc",
                  },
                }}
              >
                Most help wanted issues
              </Link>
            </li>
            <li>
              <Link
                href={{ query: { ...router.query, s: "updated", o: "desc" } }}
              >
                Recently updated
              </Link>
            </li>
            <li>
              <Link
                href={{ query: { ...router.query, s: "updated", o: "asc" } }}
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
