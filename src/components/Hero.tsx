import Link from 'next/link';
import languages from '@/assets/languages.json';
import sortByName from '@/utils/sortByName';
import LanguageButton from './LanguageButton';
import SearchLanguage from './SearchLanguage';

const { main: mainLanguages, others: otherLanguages } = languages;

export default function Hero() {
  return (
    <div>
      <div className="min-h-screen hero">
        <div className="hero-overlay w-0 bg-opacity-60"></div>
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Select your language</h1>
            <p className="mb-5">
              Select the programming language you would like to find
              repositories for.
            </p>

            {mainLanguages.map(language => (
              <LanguageButton language={language} />
            ))}

            <div className="dropdown dropdown-top">
              <div
                tabIndex={0}
                className="m-1 btn btn-lg btn-clip hover:bg-primary-2 hover:text-black umami--click--otherlangs-button"
              >
                Other languages
              </div>

              <ul
                tabIndex={0}
                className="h-64 p-2 overflow-y-scroll shadow menu dropdown-content bg-base-100 rounded-box w-60"
              >
                {otherLanguages.sort(sortByName).map(language => (
                  <li key={language}>
                    <Link href={`/repos/${language.toLowerCase()}`}>
                      {language}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <SearchLanguage />
          </div>
        </div>
      </div>
    </div>
  );
}
