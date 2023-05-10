import { Contributor } from '@/utils/getContributors';
import { IoLogoGithub } from 'react-icons/io';

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
        <figure className="px-10 pt-10">
          <img
            src={contributor.avatar_url}
            alt={contributor.name}
            className="rounded-xl"
          />
        </figure>
      </a>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{contributor.name}</h2>
        <a href={contributor.profile} className="link hover:text-[#dbe8d9]">
          {contributor.profile}
        </a>
        <div className="justify-center card-actions">
          <a
            className="text-white btn border-[#dbe8d9] hover:border-[#dbe8d9] btn-outline border-2 hover:bg-[#dbe8d9]"
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
