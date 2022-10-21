import { FormEventHandler } from 'react';
import Link from 'next/link';

import languages from 'assets/languages.json';
import LanguageButton from './LanguageButton';
import { useRouter } from 'next/router';

const { main: mainLanguages, others: otherLanguages } = languages;

const Hero = () => {
  const router = useRouter();
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get('search');
    router.push(`/repos/${search}`);
  };
  return (
    <div className="min-h-screen hero">
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
              className="m-1 btn btn-lg btn-clip hover:bg-primary-2 hover:text-black "
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
          <form
            className="form-control w-full max-w-xs mx-auto items-center"
            onSubmit={handleSubmit}
          >
            <label className="label">
              <span className="label-text">Can&apos;t find your language?</span>
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Search for your language"
                className="input input-bordered w-full input-info max-w-xs rounded-tr-none rounded-br-none"
                name="search"
              />
              <button
                type="submit"
                className="btn btn-square hover:bg-primary-2 hover:text-black rounded-tl-none rounded-bl-none"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          {/* <a href="https://github.com/max-programming/hacktoberfest-projects/">
            <button className="m-2 border-0 hover:bg-primary-2 hover:text-black btn btn-lg">
              Add another language
            </button>
          </a> */}
        </div>
      </div>
    </div>
  );
};

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
