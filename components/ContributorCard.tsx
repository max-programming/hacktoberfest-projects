import { env } from 'env.mjs';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { IoLogoGithub } from 'react-icons/io';

interface Contributor {
  login: string;
  name: string;
  avatar_url: string;
  profile: string;
  contributions: Array<string>;
}

interface Props {
  contributor: Contributor;
}

export default function ContributorCard({ contributor }: Props) {
  const router = useRouter();
  const cardRef = useRef<HTMLButtonElement>(null);
  const hash = router.asPath.split('#')[1];
  const url = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ? getCldImageUrl({
        src: contributor.avatar_url,
        deliveryType: 'fetch',
        width: 250,
        height: 250
      })
    : contributor.avatar_url;

  useEffect(() => {
    if (!hash) return;
    if (hash.toLowerCase() === contributor.login.toLowerCase()) {
      cardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      cardRef.current?.focus();
    }
  }, [hash, contributor.login]);

  return (
    <button
      className="justify-center min-w-full text-center shadow-2xl card focus-within:outline-sky-300"
      id={contributor.login}
      onClick={() => router.replace({ hash: contributor.login })}
      ref={cardRef}
    >
      <div className="w-full pt-5 mx-auto">
        <figure className="w-full h-full">
          <img src={url} alt={contributor.name} className="rounded-xl" />
        </figure>
      </div>
      <div className="w-full gap-3 text-center card-body">
        <h2 className="text-2xl font-bold text-center text-2023-bavarian-blue-1">
          {contributor.name}
        </h2>
        <a
          href={contributor.profile}
          className="link text-2023-bavarian-blue-1 hover:text-2023-bavarian-blue-2"
        >
          {contributor.profile}
        </a>
        <div className="justify-center mt-auto card-actions">
          <a
            className="border-2 text-2023-bavarian-blue-1 btn border-2023-bavarian-blue-2 hover:border-2023-bavarian-blue-2 btn-outline hover:bg-2023-bavarian-blue-2 hover:text-2023-bavarian-blue-4"
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
