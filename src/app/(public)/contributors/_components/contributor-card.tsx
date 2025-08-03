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
      className="group justify-center min-w-full text-center shadow-2xl card focus-within:outline-hacktoberfest-blue bg-hacktoberfest-light-blue hover:bg-hacktoberfest-light transition-all duration-300 transform hover:-translate-y-1 overflow-hidden pt-6"
      id={contributor.login}
      onClick={() => router.replace(`/contributors#${contributor.login}`)}
      ref={cardRef}
    >
      <div className="w-full mx-auto">
        <figure className="size-56 rounded-full mx-auto">
          <img
            src={url}
            alt={contributor.name}
            className="max-h-full w-auto object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </figure>
      </div>
      <div className="w-full gap-3 items-center card-body">
        <h2 className="text-2xl font-medium text-hacktoberfest-light group-hover:text-hacktoberfest-blue">
          {contributor.name}
        </h2>
        <a
          href={contributor.profile}
          className="link text-hacktoberfest-light group-hover:text-hacktoberfest-black group-hover:text-hacktoberfest-blue w-fit underline-expand"
        >
          {contributor.profile}
        </a>
        <div className="justify-center mt-auto card-actions">
          <a
            className="border-2 text-hacktoberfest-light btn border-hacktoberfest-blue  group-hover:!text-white group-hover:-translate-y-1"
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
