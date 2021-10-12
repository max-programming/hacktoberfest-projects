import { IoLogoGithub } from 'react-icons/io';
import Image from 'next/image';

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
  return (
    <div className="text-center shadow-2xl card">
      <a
        href={`https://github.com/${contributor.login}`}
        target="_blank"
        rel="noreferrer"
      >
        <figure style={{height: 265.67}} className="px-10 pt-10">
          <Image 
            src={contributor.avatar_url}
            width={225.67}
            height={225.67}
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrQcAAZ8BDlpDGcMAAAAASUVORK5CYII="
            placeholder="blur"
            className="rounded-xl"
          />
        </figure>
      </a>
      <div className="card-body">
        <h2 className="card-title">{contributor.name}</h2>
        <a href={contributor.profile} className="link hover:text-[#dbe8d9]">
          {contributor.profile}
        </a>
        <div className="justify-center card-actions">
          <a
            className="text-white btn border-[#dbe8d9] hover:border-[#dbe8d9] btn-outline hover:bg-[#dbe8d9]"
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
