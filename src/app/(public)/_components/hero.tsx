'use client';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';
import { LanguageButton } from './language-button';
import { Button } from './button';
import Link from 'next/link';

import { sortByName } from '@/lib/utils';
import languages from '@/assets/languages.json';

const { main: mainLanguages, others: otherLanguages } = languages;

export function Hero() {
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    const lang = formData.get('search') as string;
    if (lang.trim() === '') return;
    router.push(`/repos/${lang}`);
  }

  return (
    <div className="min-h-screen pt-10 hero bg-gradient-radial from-hacktoberfest-green to-hacktoberfest-dark-green bg-blend-overlay">
      <div className="w-0 hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-medium uppercase text-hacktoberfest-light-pink">
            Search your language
          </h1>
          <form
            className="items-center w-full max-w-xs mx-auto my-5 form-control"
            onSubmit={handleSearch}
          >
            <div className="flex w-full">
              <div className="relative flex w-full">
                <input
                  type="text"
                  placeholder="Search for your language"
                  className="w-full max-w-xs bg-transparent rounded-tr-none rounded-br-none input input-bordered text-hacktoberfest-light border-hacktoberfest-light focus:outline-hacktoberfest-light-pink placeholder:text-hacktoberfest-light-green"
                  name="search"
                />
              </div>
              <button
                type="submit"
                className="bg-transparent rounded-tl-none rounded-bl-none group btn btn-square text-hacktoberfest-light-green border-hacktoberfest-light hover:bg-hacktoberfest-light-pink hover:text-hacktoberfest-deep-pink hover:border-hacktoberfest-light-pink"
              >
                <Search />
              </button>
            </div>
          </form>
          <p className="mb-5 font-medium uppercase text-hacktoberfest-light">
            Or select the programming language you would like to find
            repositories for.
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
        </div>
      </div>
    </div>
  );
}
