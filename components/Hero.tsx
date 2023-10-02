import { FormEventHandler, useState } from 'react';
import Link from 'next/link';

import languages from 'assets/languages.json';
import LanguageButton from './LanguageButton';
import { useRouter } from 'next/router';
import sortByName from 'utils/sortByName';
import Button from './Button';

const { main: mainLanguages, others: otherLanguages } = languages;

function Hero() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = (formData.get('search') as string).trim();
    // Check if the input is empty or contains only spaces
    if (search === '') {
      setErrorMessage('Empty search terms invalid!');
      return;
    } else {
      // Clear any previous error message & proceed to search
      setErrorMessage(null);
    }
    router.push(`/repos/${search}`);
  };
  return (
    <div className="min-h-screen hero bg-gradient-radial from-2023-bavarian-gold-4 to-2023-void-2 bg-blend-overlay pt-10">
      <div className="hero-overlay w-0 bg-opacity-60"></div>
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-2023-manga-3 text-5xl font-bold uppercase">
            Select your language
          </h1>
          <p className="mb-5 text-2023-manga-3 font-semibold uppercase">
            Select the programming language you would like to find repositories
            for.
          </p>

          {mainLanguages.map(language => (
            <LanguageButton key={language} language={language} />
          ))}

          <div className="dropdown dropdown-top">
            <Button tabIndex={0} className="umami--click--otherlangs-button">
              Other languages
            </Button>

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
          <form
            className="form-control w-full max-w-xs mx-auto items-center"
            onSubmit={handleSubmit}
          >
            <label className="label">
              <span className="label-text text-2023-manga-3">Can&apos;t find your language?</span>
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Search for your language"
                className="input input-bordered w-full text-neutral-100 border-2023-bavarian-gold-2 focus:outline-2023-bavarian-gold-2 max-w-xs rounded-tr-none rounded-br-none bg-transparent"
                name="search"
              />
              <button
                type="submit"
                className="btn btn-square rounded-tl-none rounded-bl-none bg-transparent border-2023-manga-3 hover:bg-2023-manga-2 hover:text-2023-void-2 hover:border-2023-manga-2"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          {errorMessage && (
            <div
              className="text-red-500 animate-pulse animate-duration-1000"
            >
              {errorMessage}</div>)}
          {/* <a href="https://github.com/max-programming/hacktoberfest-projects/">
              <button className="m-2 border-0 hover:bg-primary-2 hover:text-black btn btn-lg">
                Add another language
              </button>
            </a> */}
        </div>
      </div>
    </div>
  );
}

const SearchIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default Hero;
