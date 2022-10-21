import Link from 'next/link';

import { motion } from 'framer-motion';

import languages from 'assets/languages.json';
import LanguageButton from './LanguageButton';

const { main: mainLanguages, others: otherLanguages } = languages;

const Hero = () => {
  return (
    <div
      className="min-h-screen hero"
    >
      <div className="hero-overlay w-0 bg-opacity-60"></div>
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Select your language</h1>
          <p className="mb-5">
            Select the programming language you would like to find repositories
            for.
          </p>

          {mainLanguages.map(language => (
            <LanguageButton key={language} language={language} />
          ))}

          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              className="m-1 btn btn-lg hover:bg-primary-2 hover:text-black"
            >
              Other languages
            </div>

            <ul
              tabIndex={0}
              className="h-64 p-2 overflow-y-scroll shadow menu dropdown-content bg-base-100 rounded-box w-60"
            >
              {otherLanguages.sort().map(language => (
                <li key={language}>
                  <Link href={`/repos/${language.toLowerCase()}`}>
                    <a>{language}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a href="https://github.com/max-programming/hacktoberfest-projects/">
            <button className="m-2 border-0 hover:bg-primary-2 hover:text-black btn btn-lg">
              Add another language
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
