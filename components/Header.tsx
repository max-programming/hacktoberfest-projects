import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import Search from './Search';

function Header() {
  const router = useRouter();

  return (
    <div className="justify-between px-2 mb-2 ml-1.5 w-[99.2%] shadow-lg navbar rounded-box">
      <Link href="/">
        <img src="/hacktoberfest.svg" alt="Hacktoberfest" />
      </Link>
      {router.pathname === '/repos/[language]' && (
        <div className="justify-center flex-1">
          <Search />
        </div>
      )}
      <div className="flex-none">
        <Link
          href="/contributors"
          className="btn btn-square btn-ghost umami--click--contributors-button"
        >
          <BsPeopleFill size="1.5rem" title="Contributors" />
        </Link>
        <a
          href="https://github.com/max-programming/hacktoberfest-projects"
          target="_blank"
          rel="noreferrer"
          className="btn btn-square btn-ghost umami--click--github-button"
        >
          <IoLogoGithub size="1.5rem" title="GitHub" />
        </a>
      </div>
    </div>
  );
}

export default Header;
