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
    <div className="text-center shadow-2xl card">
      <a
        href={`https://github.com/${contributor.login}`}
        target="_blank"
        rel="noreferrer"
      >
        <figure className="px-10 pt-10">
          <img src={contributor.avatar_url} className="rounded-xl" />
        </figure>
      </a>
      <div className="card-body items-center text-center">
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
