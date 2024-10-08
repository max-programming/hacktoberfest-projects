'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getCldImageUrl } from 'next-cloudinary';
import { env } from '@/env.mjs';

import { IoLogoGithub } from 'react-icons/io';
import type { Contributor } from '@/types';

interface ContributorCardProps {
  contributor: Contributor;
}

export function ContributorCard({ contributor }: ContributorCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLButtonElement>(null);
  const url = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ? getCldImageUrl({
        src: contributor.avatar_url,
        deliveryType: 'fetch',
        width: 250,
        height: 250
      })
    : contributor.avatar_url;

  useEffect(() => {
    if (!cardRef.current || !Boolean(location.hash)) return;

    const hash = location.hash.split('#')[1]?.toLowerCase();
    if (hash !== contributor.login.toLowerCase()) return;

    cardRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    cardRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      className="justify-center min-w-full text-center shadow-2xl card focus-within:outline-hacktoberfest-green bg-hacktoberfest-black"
      id={contributor.login}
      onClick={() => router.replace(`/contributors#${contributor.login}`)}
      ref={cardRef}
    >
      <div className="w-full pt-5 mx-auto">
        <figure className="w-full h-full">
          <img src={url} alt={contributor.name} className="rounded-xl" />
        </figure>
      </div>
      <div className="w-full gap-3 items-center card-body">
        <h2 className="text-2xl font-medium text-hacktoberfest-green">
          {contributor.name}
        </h2>
        <a
          href={contributor.profile}
          className="link text-hacktoberfest-green hover:text-hacktoberfest-pink w-fit underline-expand"
        >
          {contributor.profile}
        </a>
        <div className="justify-center mt-auto card-actions">
          <a
            className="border-2 text-hacktoberfest-light btn border-hacktoberfest-pink hover:border-hacktoberfest-pink btn-outline hover:bg-hacktoberfest-pink hover:text-hacktoberfest-black"
            href={`https://github.com/${contributor.login}`}
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoGithub className="w-5 h-5" />
            &nbsp; Profile
          </a>
        </div>
      </div>
    </button>
  );
}
