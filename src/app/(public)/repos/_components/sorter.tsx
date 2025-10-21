'use client';

import { Button } from '@/app/(public)/_components/button';
import { ArrowUpAZ, Code } from 'lucide-react';
import Link from 'next/link';
import languages from '@/assets/languages.json';
import { usePathname } from 'next/navigation';
import { sortByName } from '@/lib/utils';
import { useQueryStates, useQueryState } from 'nuqs';

const { mainLanguages } = languages;

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

type Pathname = '/repos' | `/repos/${string}`;

export function Sorter() {
  const pathname = usePathname() as Pathname;
  const [sortField] = useQueryState('s', { defaultValue: '' });
  const [sortOrder] = useQueryState('o', { defaultValue: 'desc' });
  const [languages_] = useQueryState('l', { parse: (value: string) => value.split(',').filter(Boolean), serialize: (value: string[]) => value.join(',') });

  const navigationItems = [
    {
      name: 'Best match',
      onSelect(): { s: string | null; o: string | null } {
        return { s: null, o: null };
      }
    },
    {
      name: 'Most stars',
      onSelect() {
        return { s: 'stars', o: 'desc' };
      }
    },
    {
      name: 'Fewest stars',
      onSelect() {
        return { s: 'stars', o: 'asc' };
      }
    },
    {
      name: 'Most forks',
      onSelect() {
        return { s: 'forks', o: 'desc' };
      }
    },
    {
      name: 'Fewest forks',
      onSelect() {
        return { s: 'forks', o: 'asc' };
      }
    },
    {
      name: 'Most help wanted issues',
      onSelect() {
        return { s: 'help-wanted-issues', o: 'desc' };
      }
    },
    {
      name: 'Recently updated',
      onSelect() {
        return { s: 'updated', o: 'desc' };
      }
    },
    {
      name: 'Least recently updated',
      onSelect() {
        return { s: 'updated', o: 'asc' };
      }
    }
  ];

  function selectedSort(): SortTypes {
    if (sortOrder === 'asc') {
      if (sortField === 'stars') return SortTypes.FewestStars;
      if (sortField === 'forks') return SortTypes.FewestForks;
      if (sortField === 'updated')
        return SortTypes.LeastRecentlyUpdated;
      return SortTypes.BestMatch;
    } else if (sortOrder === 'desc') {
      if (sortField === 'stars') return SortTypes.MostStars;
      if (sortField === 'forks') return SortTypes.MostForks;
      if (sortField === 'updated') return SortTypes.RecentlyUpdated;
      if (sortField === 'help-wanted-issues')
        return SortTypes.MostHelpWantedIssues;
      return SortTypes.BestMatch;
    } else {
      return SortTypes.BestMatch;
    }
  }

  function handleClick() {
    const elem = document.activeElement as HTMLElement;
    elem?.blur();
  }

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="dropdown group dropdown-hover">
        <Button tabIndex={0}>
          <Code className="w-6 h-6 mr-2" />
          Language
        </Button>
        <div className="z-[9999] h-64 p-2 overflow-y-auto shadow-lg dropdown-content hidden group-hover:block bg-white/95 backdrop-blur-sm rounded-xl w-60 border border-gray-200/50">
          <ul tabIndex={0} className="menu menu-vertical">
            {mainLanguages.sort(sortByName).map(language => {
              const languageParams = `l=${language.toLowerCase()}`;
              const currentParams = new URLSearchParams();
              if (sortField) currentParams.set('s', sortField);
              if (sortOrder) currentParams.set('o', sortOrder);
              const queryString = currentParams.toString();
              const fullQuery = queryString ? `${languageParams}&${queryString}` : languageParams;
              
              return (
                <li key={language} onClick={handleClick}>
                  <Link
                    href={`/repos/${language.toLowerCase()}?${fullQuery}`}
                    className="text-gray-700 hover:text-white hover:bg-hacktoberfest-light-blue rounded-lg transition-colors duration-200 px-3 py-2"
                  >
                    {language}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="dropdown dropdown-hover group">
        <Button tabIndex={0}>
          <ArrowUpAZ className="w-6 h-6 mr-2" />
          {selectedSort()}
        </Button>
        <div className="z-[9999] h-64 p-2 overflow-y-auto shadow-lg dropdown-content hidden group-hover:block -ml-16 bg-white/95 backdrop-blur-sm rounded-xl w-60 border border-gray-200/50">
          <ul tabIndex={0} className="menu menu-vertical">
            {navigationItems.map((item, index) => {
              const { s, o } = item.onSelect();
              const currentParams = new URLSearchParams();
              if (s) currentParams.set('s', s);
              if (o) currentParams.set('o', o);
              if (languages_ && languages_.length > 0) {
                currentParams.set('l', languages_.join(','));
              }
              const queryString = currentParams.toString();
              
              return (
                <li key={index} onClick={handleClick}>
                  <Link
                    href={`${pathname}?${queryString}`}
                    className="text-gray-700 hover:text-white hover:bg-hacktoberfest-light-blue rounded-lg transition-colors duration-200 px-3 py-2"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
