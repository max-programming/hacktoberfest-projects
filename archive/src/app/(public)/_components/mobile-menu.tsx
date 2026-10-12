'use client';

import Link from 'next/link';
import { useState } from 'react';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi';

import { Button } from './button';
import { signInAction, signOutAction } from '../../actions';

interface MobileMenuProps {
  session: any;
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden flex-shrink-0">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-white hover:text-hacktoberfest-light transition-colors p-2 rounded-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <HiX size="1.25rem" /> : <HiMenu size="1.25rem" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-hacktoberfest-light-blue border border-hacktoberfest-light-blue rounded-lg py-4 px-4 sm:px-6 container mx-auto backdrop-blur-md shadow-lg">
          <div className="flex flex-col gap-3">
            <form action={session ? signOutAction : signInAction}>
              <Button className="w-full text-center text-xs">
                {session && session.user ? 'Sign Out' : 'Sign In'}
              </Button>
            </form>

            <Link
              href="/contributors"
              className="flex items-center gap-3 text-white hover:text-hacktoberfest-light transition-colors p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <BsPeopleFill size="1.1rem" />
              <span className="text-sm font-medium">Contributors</span>
            </Link>

            <a
              href="https://github.com/max-programming/hacktoberfest-projects"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-white hover:text-hacktoberfest-light transition-colors p-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <IoLogoGithub size="1.1rem" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
