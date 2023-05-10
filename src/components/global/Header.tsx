import Link from 'next/link';
import Image from 'next/image';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';
import Search from '../Search';
import { Suspense } from 'react';

export default function Header() {
  return (
    <div className='justify-between px-2  mt-2 mb-2 ml-1.5 w-[99.2%] shadow-lg navbar bg-accent rounded-box'>
      <Link href='/'>
        <div className='flex-none'>
          <div className='w-10 h-10 m-1 rounded-full'>
            <Image
              src='/hacktoberfest.svg'
              width={50}
              height={50}
              alt='Hacktoberfest'
              blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrQcAAZ8BDlpDGcMAAAAASUVORK5CYII='
              placeholder='blur'
            />
          </div>
        </div>
        <div className='flex-1 hidden px-2 mx-auto lg:block'>
          <span className='text-2xl font-bold text-center'>
            Hacktoberfest Projects
          </span>
        </div>
      </Link>
      <Suspense fallback={<SearchFallback />}>
        <Search />
      </Suspense>
      <div className='flex-none'>
        <Link passHref href='/contributors'>
          <button className='btn btn-square btn-ghost umami--click--contributors-button'>
            <BsPeopleFill size='1.5rem' title='Contributors' />
          </button>
        </Link>
        <a
          href='https://github.com/max-programming/hacktoberfest-projects'
          target='_blank'
          rel='noreferrer'
          className='btn btn-square btn-ghost umami--click--github-button'
        >
          <IoLogoGithub size='1.5rem' title='GitHub' />
        </a>
      </div>
    </div>
  );
}

function SearchFallback() {
  return <>Search Fallback</>;
}
