import Link from 'next/link';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import { SearchForm } from './search-form';
import { auth } from '@/auth';
import { signInAction, signOutAction } from '../../actions';
import { LogoIconsSvg } from '@/components/Icons';
import { Button } from './button';
import { MobileMenu } from './mobile-menu';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-4 sm:px-6">
      <div className="border border-hacktoberfest-light-blue rounded-lg py-4 px-4 sm:px-6 container mx-auto backdrop-blur-md shadow-lg">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <LogoIconsSvg />
          </Link>

          {/* Search Form */}
          <div className="flex-1 max-w-md">
            <SearchForm />
          </div>

          {/* Navigation Actions */}
          <div className="flex gap-2 flex-shrink-0 items-center">
            <form action={session ? signOutAction : signInAction}>
              <Button className="text-sm whitespace-nowrap">
                {session && session.user ? 'Sign Out' : 'Sign In'}
              </Button>
            </form>
            <Link
              href="/contributors"
              className="btn btn-square btn-ghost umami--click--contributors-button hover:text-hacktoberfest-light transition-colors"
            >
              <BsPeopleFill size="1.5rem" color="white" title="Contributors" />
            </Link>

            <a
              href="https://github.com/max-programming/hacktoberfest-projects"
              target="_blank"
              rel="noreferrer"
              className="btn btn-square btn-ghost umami--click--github-button hover:text-hacktoberfest-light transition-colors"
            >
              <IoLogoGithub size="1.5rem" color="white" title="GitHub" />
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo and Hamburger Menu */}
          <div className="flex justify-between items-center ">
            <Link href="/" className="flex-shrink-0">
              <LogoIconsSvg />
            </Link>
            <MobileMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
}