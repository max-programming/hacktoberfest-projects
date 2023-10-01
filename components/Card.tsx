import { emojify } from '@twuni/emojify';
import { GoStar, GoRepoForked } from 'react-icons/go';
import { RepoItem } from 'types';

interface Props {
  repo: RepoItem;
}

function Card({ repo }: Props) {
  return (
    <div className="shadow-sm lg:w- w-[90%] ml-auto mr-auto card bg-2023-void-2 ring-1 ring-2023-manga-3">
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
                className="rounded-full"
              />
            </a>
          </div>
        </div>

        <a
          href={repo.html_url}
          title={repo.name}
          target="_blank"
          rel="noreferrer"
          className={`lg:text-4xl text-3xl card-title link link-hover mb-2 text-2023-bavarian-gold-2`}
        >
          {repo.name}
        </a>

        <p className="mb-2 text-neutral-100">{emojify(repo.description)}</p>

        <div className="card-actions">
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
                <GoStar color="rgb(163 163 163 / var(--tw-text-opacity))"/>{' '}
                <span className="ml-0.5 text-neutral-400">Stars</span>
              </div>
              <div className="text-center stat-value text-neutral-400">
                {repo.stargazers_count}
              </div>
            </div>
          </div>
          <div className="shadow stats bg-transparent ring-1 ring-2023-manga-2">
            <div className="stat">
              <div className="text-center stat-title items-center inline-flex">
                <GoRepoForked color="rgb(163 163 163 / var(--tw-text-opacity))" />{' '}
                <span className="ml-0.5 text-neutral-400">Forks</span>
              </div>
              <div className="text-center stat-value text-neutral-400">
                {repo.forks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
