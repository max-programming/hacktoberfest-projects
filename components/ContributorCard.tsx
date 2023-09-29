import { color } from 'framer-motion';
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
  return (
    <div className="text-center shadow-2xl card" >
      <a
        href={`https://github.com/${contributor.login}`}
        target="_blank"
        rel="noreferrer"
      >
        <figure className="px-10 pt-10">
          <img
            src={contributor.avatar_url}
            alt={contributor.name}
            className="rounded-xl"
          />
        </figure>
      </a>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{contributor.name}</h2>
        <a href={contributor.profile} className="link text-[#848482] hover:text-[#fde92d]">
          {contributor.profile}
        </a>
        <div className="justify-center card-actions">
          <a
            className="text-[#848482] btn border-[#848482] hover:border-[#fde92d] btn-outline border-2 hover:text-[#fde92d]"
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
