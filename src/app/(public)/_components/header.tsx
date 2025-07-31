import Link from 'next/link';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import { SearchForm } from './search-form';
import { auth } from '@/auth';
import { signInAction, signOutAction } from '../../actions';
import { LogoIconsSvg } from '@/components/Icons';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-6">
      <div className="border border-hacktoberfest-light-blue rounded-lg py-4 px-6 container mx-auto bg-[radial-gradient(85.48%_85.48%_at_50%_0%,rgb(64,63,125)_0%,rgb(from_rgb(28,28,63)_r_g_b/_0)_100%)] backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center">
          <Link href="/" className="z-5">
            <LogoIconsSvg />
          </Link>

          <SearchForm />

          <div className="flex gap-2 lg:ml-40">
            <form action={session ? signOutAction : signInAction}>
              <button className="text-white border-white btn btn-ghost border-1 ms-4 hover:bg-blue-700 transition-colors">
                {session && session.user ? 'Sign Out' : 'Sign In'}
              </button>
            </form>
            <Link
              href="/contributors"
              className="btn btn-square btn-ghost umami--click--contributors-button hover:bg-blue-700 transition-colors"
            >
              <BsPeopleFill size="1.5rem" color="white" title="Contributors" />
            </Link>

            <a
              href="https://github.com/max-programming/hacktoberfest-projects"
              target="_blank"
              rel="noreferrer"
              className="btn btn-square btn-ghost umami--click--github-button hover:bg-blue-700 transition-colors"
            >
              <IoLogoGithub size="1.5rem" color="white" title="GitHub" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
