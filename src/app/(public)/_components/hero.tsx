'use client';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';
import { LanguageButton } from './language-button';
import { Button } from './button';
import Link from 'next/link';

import { sortByName } from '@/lib/utils';
import languages from '@/assets/languages.json';
import { HeroSectionSvg } from '@/components/Icons';

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
    <div className="relative min-h-screen bg-[radial-gradient(85.48%_85.48%_at_50%_0%,rgb(64,63,125)_0%,rgb(from_rgb(28,28,63)_r_g_b/_0)_100%)] ">
      <div className="z-50 flex justify-center items-center text-center h-screen">
        <div className="max-w-md space-y-5">
          <h1 className="text-5xl font-medium uppercase text-hacktoberfest-light-pink">
            Search your language
          </h1>
          <form
            className="items-center w-full max-w-xs mx-auto form-control"
            onSubmit={handleSearch}
          >
            <div className="flex w-full">
              <div className="relative flex w-full">
                <input
                  type="text"
                  placeholder="Search for your language"
                  className="w-full max-w-xs bg-transparent rounded-tr-none rounded-br-none input input-bordered text-hacktoberfest-light border-hacktoberfest-light focus:outline-hacktoberfest-light-pink placeholder:text-hacktoberfest-light-blue"
                  name="search"
                />
              </div>
              <button
                type="submit"
                className="bg-transparent rounded-tl-none rounded-bl-none group btn btn-square text-hacktoberfest-light-blue border-hacktoberfest-light hover:bg-hacktoberfest-light-pink hover:text-hacktoberfest-deep-pink hover:border-hacktoberfest-light-pink"
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
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <HeroSectionSvg className="w-full h-full" />
      </div>
    </div>
  );
}
