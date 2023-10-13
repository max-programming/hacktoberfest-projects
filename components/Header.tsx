import Link from 'next/link';
import { useRouter } from 'next/router';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import Search, { SearchProps } from './Search';
import { signIn, signOut, useSession } from 'next-auth/react';

function SearchBar(props: SearchProps) {
  const router = useRouter();

  return router.pathname === '/repos/[language]' && <Search {...props} />;
}

function Header() {
  const session = useSession();

  return (
    <header className="border-b-[0.5px] border-dashed border-b-2023-manga-3 mb-5">
      <div className="container mx-auto px-4 py-2">
        <div className="justify-between shadow-lg navbar">
          <Link href="/">
            <img
              src="/hacktoberfest.svg"
              alt="Hacktoberfest"
              className="h-12 w-auto sm:h-auto"
            />
          </Link>

          <SearchBar className="hidden sm:inline-flex flex-1 max-w-md px-6" />

          <div className="flex gap-2 lg:ml-40">
            <button
             
              className="btn btn-ghost text-white border-1 border-white" 
              onClick={() => {
                if (!session.data) signIn('github');
                else signOut();
              }}
            >
              {session.data ? 'Sign Out' : 'Sign In'}
            </button>
            <Link
              href="/contributors"
              className="btn btn-square btn-ghost umami--click--contributors-button"
            >
              <BsPeopleFill size="1.5rem" color="white" title="Contributors" />
            </Link>

            <a
              href="https://github.com/max-programming/hacktoberfest-projects"
              target="_blank"
              rel="noreferrer"
              className="btn btn-square btn-ghost umami--click--github-button"
            >
              <IoLogoGithub size="1.5rem" color="white" title="GitHub" />
            </a>
          </div>
        </div>

        <SearchBar className="sm:hidden px-2 mb-3" />
      </div>
    </header>
  );
}

export default Header;
