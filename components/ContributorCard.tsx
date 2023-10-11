import { env } from 'env.mjs';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
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
  const url = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    ? getCldImageUrl({
        src: contributor.avatar_url,
        deliveryType: 'fetch',
        width: 250,
        height: 250
      })
    : contributor.avatar_url;

  return (
    <div className="text-center shadow-2xl card">
      <a
        href={`https://github.com/${contributor.login}`}
        target="_blank"
        rel="noreferrer"
      >
        <figure className="px-10 pt-10 h-[351px] md:h-[336px] lg:h-[204px] xl:h-[268px]">
          <img src={url} alt={contributor.name} className="rounded-xl" />
        </figure>
      </a>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-neutral-100">{contributor.name}</h2>
        <a
          href={contributor.profile}
          className="link text-neutral-100 hover:text-[#dbe8d9]"
        >
          {contributor.profile}
        </a>
        <div className="justify-center card-actions mt-auto">
          <a
            className="text-white btn border-[#dbe8d9] hover:border-[#dbe8d9] btn-outline border-2 hover:bg-[#dbe8d9] hover:text-slate-900"
            href={`https://github.com/${contributor.login}`}
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoGithub />
            &nbsp; Profile
          </a>
        </div>
      </div>
    </div>
  );
}
