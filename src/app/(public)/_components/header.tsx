import Link from 'next/link';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import { SearchForm } from './search-form';
import { auth } from '@/auth';
import { signInAction, signOutAction } from '../../actions';

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b-[0.5px] border-dashed border-b-hacktoberfest-light-green mb-5">
      <div className="container px-4 py-2 mx-auto">
        <div className="justify-between shadow-lg navbar">
          <Link href="/">
            <img
              src="/horizontal_beige.png"
              alt="Hacktoberfest"
              className="w-56"
            />
          </Link>

          <SearchForm />

          <div className="flex gap-2 lg:ml-40">
            <form action={session ? signOutAction : signInAction}>
              <button className="text-white border-white btn btn-ghost border-1">
                {session && session.user ? 'Sign Out' : 'Sign In'}
              </button>
            </form>
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
      </div>
    </header>
  );
}
