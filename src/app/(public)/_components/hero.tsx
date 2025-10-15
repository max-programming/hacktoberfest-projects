'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';
import { Button } from './button';

import { sortByName } from '@/lib/utils';
import languages from '@/assets/languages.json';
import { HeroSectionSvg } from '@/components/Icons';
import { MarqueTextAnimation } from './marque-text-animation';

const { main: mainLanguages, others: otherLanguages } = languages;

export function Hero() {
  const router = useRouter();

  // Track selected languages as a string array
  const [selected, setSelected] = useState<string[]>([]);

  const toggleLanguage = (language: string) => {
    setSelected(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const sortedOthers = useMemo(() => [...otherLanguages].sort(sortByName), []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const chosenLanguages = [...selected];

    // Fallback: if no checkbox selected, use the single input value
    if (chosenLanguages.length === 0) {
      const typed = String(formData.get('search') || '').trim();
      if (typed) {
        chosenLanguages.push(typed);
      }
    }

    if (chosenLanguages.length === 0) return; // nothing to search

    const params = new URLSearchParams();
    chosenLanguages.forEach(lang => params.append('l', lang.toLowerCase()));

    router.push(`/repos?${params.toString()}`);
  }

  return (
    <div className="relative bg-hero-gradient ">
      <div className="z-50 flex flex-col space-y-8 justify-center items-center text-center min-h-screen pt-28 sm:pt-24">
        <div className="max-w-md space-y-5 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium uppercase heading-text">
            Search your language(s)
          </h1>
          <form
            id="hero-search-form"
            className="items-center w-full max-w-xs mx-auto form-control outline-none mt-8"
            onSubmit={handleSearch}
          >
            <div className="flex w-full">
              <div className="relative flex w-full">
                <input
                  type="text"
                  placeholder="Type a language (optional)"
                  className="w-full max-w-xs bg-transparent input input-bordered text-hacktoberfest-light border-hacktoberfest-light
                  focus:border-hacktoberfest-light focus:!outline-none focus-visible:!outline-none placeholder:text-hacktoberfest-light text-sm sm:text-base"
                  name="search"
                />
              </div>
            </div>
          </form>
          <p className="font-medium uppercase text-hacktoberfest-light text-sm sm:text-base">
            Or select one or more programming languages you would like to find
            repositories for.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
            {mainLanguages.map(language => {
              const id = `lang-${language}`;
              const checked = selected.includes(language);
              return (
                <label
                  key={language}
                  htmlFor={id}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    id={id}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={checked}
                    onChange={() => toggleLanguage(language)}
                  />
                  <span className="text-hacktoberfest-light text-sm sm:text-base">
                    {language}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="dropdown dropdown-top mt-4">
            <Button
              tabIndex={0}
              className="umami--click--otherlangs-button text-sm sm:text-base"
            >
              Other languages
            </Button>

            <ul
              tabIndex={0}
              className="h-64 p-2 overflow-y-auto shadow-lg menu dropdown-content bg-white/95 backdrop-blur-sm rounded-xl w-72 border border-gray-200/50 z-[9999]"
            >
              {sortedOthers.map(language => {
                const id = `other-${language}`;
                const checked = selected.includes(language);
                return (
                  <li key={language} className="px-1">
                    <label
                      htmlFor={id}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-hacktoberfest-blue/80 hover:text-white cursor-pointer"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={checked}
                        onChange={() => toggleLanguage(language)}
                      />
                      <span className="text-sm text-gray-800">{language}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              type="submit"
              form="hero-search-form"
              aria-label="Search repositories"
              title="Search"
              className="bg-transparent group btn text-hacktoberfest-light border-hacktoberfest-light hover:!border-hacktoberfest-light hover:bg-primary-btn-hover-gradient flex items-center gap-2 px-5"
            >
              <Search size={16} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Search</span>
            </button>
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
