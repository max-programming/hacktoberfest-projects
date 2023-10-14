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
      className="text-center shadow-2xl card min-w-full justify-center focus-within:outline-sky-300"
      id={contributor.login}
      onClick={() => router.replace({ hash: contributor.login })}
      ref={cardRef}
    >
      <div className="w-full mx-auto pt-5">
        <figure className="h-full w-full">
          <img src={url} alt={contributor.name} className="rounded-xl" />
        </figure>
      </div>
      <div className="card-body gap-3 text-center w-full">
        <h2 className="text-center text-2xl font-bold text-2023-bavarian-blue-1">
          {contributor.name}
        </h2>
        <a
          href={contributor.profile}
          className="link text-2023-bavarian-blue-1 hover:text-2023-bavarian-blue-2"
        >
          {contributor.profile}
        </a>
        <div className="justify-center card-actions mt-auto">
          <a
            className="text-2023-bavarian-blue-1 btn border-2023-bavarian-blue-2 hover:border-2023-bavarian-blue-2 btn-outline border-2 hover:bg-2023-bavarian-blue-2 hover:text-2023-bavarian-blue-4"
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
