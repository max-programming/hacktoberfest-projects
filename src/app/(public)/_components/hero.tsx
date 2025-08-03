'use client';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';
import { LanguageButton } from './language-button';
import { Button } from './button';
import Link from 'next/link';

import { sortByName } from '@/lib/utils';
import languages from '@/assets/languages.json';
import { HeroSectionSvg } from '@/components/Icons';
import { MarqueTextAnimation } from './marque-text-animation';

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
    <div className="relative bg-hero-gradient ">
      <div className="z-50 flex flex-col space-y-8 justify-center items-center text-center min-h-screen pt-28 sm:pt-24">
        <div className="max-w-md space-y-5">
          <h1 className="text-5xl font-medium uppercase heading-text">
            Search your language
          </h1>
          <form
            className="items-center w-full max-w-xs mx-auto form-control outline-none "
            onSubmit={handleSearch}
          >
            <div className="flex w-full">
              <div className="relative flex w-full">
                <input
                  type="text"
                  placeholder="Search for your language"
                  className="w-full max-w-xs bg-transparent rounded-tr-none rounded-br-none input input-bordered text-hacktoberfest-light border-hacktoberfest-light
                  focus:border-hacktoberfest-light focus:!outline-none focus-visible:!outline-none placeholder:text-hacktoberfest-light"
                  name="search"
                />
              </div>
              <button
                type="submit"
                className="bg-transparent rounded-tl-none rounded-bl-none group btn btn-square text-hacktoberfest-light border-hacktoberfest-light hover:!border-hacktoberfest-light    hover:bg-primary-btn-hover-gradient"
              >
                <Search />
              </button>
            </div>
          </form>
          <p className="font-medium uppercase text-hacktoberfest-light">
            Or select the programming language you would like to find
            repositories for.
          </p>
          <div className="flex flex-wrap gap-6 items-center justify-center ">
            {mainLanguages.map(language => (
              <LanguageButton key={language} language={language} />
            ))}
          </div>
          <div className="dropdown dropdown-top">
            <Button tabIndex={0} className="umami--click--otherlangs-button">
              Other languages
            </Button>

            <ul
              tabIndex={0}
              className="h-64 p-2 overflow-y-auto shadow-lg menu dropdown-content bg-white/95 backdrop-blur-sm rounded-xl w-60 border border-gray-200/50 z-[9999]"
            >
              {otherLanguages.sort(sortByName).map(language => (
                <li key={language}>
                  <Link
                    href={`/repos/${language.toLowerCase()}`}
                    className="text-gray-700 hover:text-white hover:bg-hacktoberfest-blue rounded-lg transition-colors duration-200 px-3 py-2"
                  >
                    {language}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <MarqueTextAnimation />
      </div>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <HeroSectionSvg className="w-full h-full" />
      </div>
    </div>
  );
}
