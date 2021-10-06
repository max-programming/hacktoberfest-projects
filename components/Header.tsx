import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoLogoGithub } from 'react-icons/io';
import Search from './Search';

const Header = () => {
  const router = useRouter();
  return (
    <div className="justify-between px-2 mt-2 mb-2 ml-2 mr-2 shadow-lg navbar bg-base-200 rounded-box">
      <Link href="/">
        <a>
          <div className="flex-none">
            <div className="w-10 h-10 m-1 rounded-full">
              <Image
                src="/static/hacktoberfest.png"
                width={50}
                height={50}
                alt="Hacktoberfest"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrQcAAZ8BDlpDGcMAAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          </div>
          <div className="flex-1 hidden px-2 mx-auto lg:block">
            <span className="text-2xl font-bold text-center">
              Hacktoberfest Projects
            </span>
          </div>
        </a>
      </Link>
      {router.pathname === '/repos/[language]' && (
        <div className="justify-center flex-1">
          <Search />
        </div>
      )}
      <div className="flex-none">
        <a
          href="https://github.com/max-programming/hacktoberfest-projects"
          target="_blank"
          rel="noreferrer"
          className="btn btn-square btn-ghost"
        >
          <IoLogoGithub size="1.5rem" />
        </a>
      </div>
    </div>
  );
};

export default Header;
