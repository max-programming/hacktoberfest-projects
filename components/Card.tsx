import { emojify } from '@twuni/emojify';
import { GoStar, GoRepoForked } from 'react-icons/go';
import { RepoItem } from 'types';

interface Props {
  repo: RepoItem;
}

function Card({ repo }: Props) {
  return (
    <div className="shadow-sm card bg-2023-void-2 ring-1 ring-2023-manga-3">
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
          className={`text-3xl card-title link link-hover text-2023-bavarian-gold-2 overflow-x-clip`}
        >
          {repo.name}
        </a>

        <p className="mb-2">{emojify(repo.description)}</p>

        <div className="card-actions pb-2">
          {repo.topics.map((topic: string) => (
            <a
              key={topic}
              href={`https://github.com/topics/${topic}`}
              target="_blank"
              rel="noreferrer"
              className={`badge ${
                topic === 'hacktoberfest'
                  ? 'bg-2023-bavarian-gold-1 text-2023-void-2'
                  : 'bg-2023-bavarian-blue-2 text-2023-void-2'
              }`}
            >
              {topic}
            </a>
          ))}
        </div>

        <div className="items-end justify-center h-full card-actions">
          <div className="shadow stats bg-transparent ring-1 ring-2023-manga-2">
            <div className="stat">
              <div className="text-center stat-title items-center inline-flex">
                <GoStar /> <span className="ml-0.5">Stars</span>
              </div>
              <div className="text-center stat-value">
                {repo.stargazers_count}
              </div>
            </div>
          </div>
          <div className="shadow stats bg-transparent ring-1 ring-2023-manga-2">
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
}

export default Card;
