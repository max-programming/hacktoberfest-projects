import Image from 'next/image';
import { emojify } from '@twuni/emojify';
import { GoStar, GoRepoForked } from 'react-icons/go';

interface Props {
  repo: any;
}

const Card = ({ repo }: Props) => {
  return (
    <div className="shadow-sm card bg-base-300">
      <div className="relative card-body">
        <div className="avatar">
          <div className="w-10 h-10 mb-2 rounded-full">
            <a
              href={repo.owner.html_url}
              title={repo.owner.login}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={repo.owner.avatar_url}
                width={50}
                height={50}
                alt={repo.owner.login}
                className="rounded-xl"
              />
            </a>
          </div>
        </div>

        <a
          href={repo.html_url}
          title={repo.name}
          target="_blank"
          rel="noreferrer"
          className="text-3xl card-title link link-hover text-primary"
        >
          {repo.name}
        </a>

        <p className="mb-2">{emojify(repo.description)}</p>

        <div className="card-actions">
          {repo.topics.map((topic: string) => (
            <a
              key={topic}
              href={`https://github.com/topics/${topic}`}
              target="_blank"
              rel="noreferrer"
              className={`badge ${
                topic === 'hacktoberfest'
                  ? 'bg-primary text-gray-900'
                  : 'bg-accent'
              }`}
            >
              {topic}
            </a>
          ))}
        </div>

        <div className="items-end justify-center h-full card-actions">
          <div className="shadow stats">
            <div className="stat">
              <div className="text-center stat-title items-center inline-flex">
                <GoStar /> <span className="ml-0.5">Stars</span>
              </div>
              <div className="text-center stat-value">
                {repo.stargazers_count}
              </div>
            </div>
          </div>
          <div className="shadow stats">
            <div className="stat">
              <div className="text-center stat-title items-center inline-flex">
                <GoRepoForked /> <span className="ml-0.5">Forks</span>
              </div>
              <div className="text-center stat-value">{repo.forks}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
