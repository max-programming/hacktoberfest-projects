import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import Search, { SearchProps } from './Search';


const SearchBar = (props: SearchProps) => {
  const router = useRouter();

  return (router.pathname === '/repos/[language]' ?(
      <Search {...props} />
    )
    : 
     <div className="hidden sm:inline-flex flex-1 max-w-md px-6 md:ml-5"></div>
  )
}

function Header() {
  return (
    <header className="border-b-[0.5px] border-dashed border-b-2023-manga-3 mb-5">
      <div className="container mx-auto px-4 py-2">
        <div className="justify-between lg:grid lg:grid-cols-3 shadow-lg navbar">
          <Link href="/">
            <img src="/hacktoberfest.svg" alt="Hacktoberfest" className="h-12 w-auto sm:h-auto" />
          </Link>

          <SearchBar searchBarWrapperStyles="hidden sm:inline-flex flex-1 max-w-md px-6 md:ml-5" />

          <div className="flex-none md:justify-end">
            <Link
              href="/contributors"
              className="btn btn-square btn-ghost umami--click--contributors-button"
            >
              <BsPeopleFill size="1.5rem" color='white' title="Contributors" />
            </Link>

            <a
              href="https://github.com/max-programming/hacktoberfest-projects"
              target="_blank"
              rel="noreferrer"
              className="btn btn-square btn-ghost umami--click--github-button"
            >
              <IoLogoGithub size="1.5rem" color='white' title="GitHub" />
            </a>
          </div>
        </div>          

        <SearchBar searchBarWrapperStyles="sm:hidden px-2 mb-3" />
      </div>
    </header>
  );
}

export default Header;
