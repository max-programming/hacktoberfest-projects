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
        <div className="flex gap-4 items-center justify-start">
          <a
            className="border-2 rounded-full h-14 aspect-square p-1 border-neutral-100"
            href={repo.owner.html_url}
            title={repo.owner.login}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="rounded-full"
            />
          </a>
          <a
            href={repo.html_url}
            title={repo.name}
            target="_blank"
            rel="noreferrer"
            className={`text-3xl card-title link link-hover text-2023-bavarian-gold-2 overflow-hidden whitespace-nowrap overflow-ellipsis`}
          >
            {repo.name}
          </a>
        </div>

        <p className="my-2 text-neutral-300">{emojify(repo.description)}</p>

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

        {/* stars and forks cards */}
        <div className="w-full flex gap-3 xl:gap-5 text-neutral-100 cursor-pointer mt-6">
          <a
            href={`${repo.html_url}/stargazers`}
            target="_blank"
            className="group w-full border rounded-xl p-3 xl:px-4 flex items-center gap-2 xl:gap-3 relative"
          >
            <GoStar className="text-yellow-200 text-2xl" />
            <div className="flex flex-col">
              <div className="xl:text-2xl text-lg font-semibold">
                {repo.stargazers_count}
              </div>
              <div className="text-neutral-400 text-xs lg:text-sm">Stars</div>
            </div>
            <div
              id="tooltip"
              className="hidden group-hover:block absolute bg-2023-void-2 text-2023-bavarian-gold-2 px-2 py-1 rounded-md"
            >
              Checkout all the stars here!
            </div>
          </a>
          <a
            href={`${repo.html_url}/forks`}
            target="_blank"
            className="group w-full border rounded-xl p-3 flex items-center gap-3 relative"
          >
            <GoRepoForked className="text-yellow-200 text-2xl" />
            <div className="flex flex-col">
              <div className="text-2xl font-semibold">{repo.forks}</div>
              <div className="text-neutral-400 text-xs lg:text-sm">Forks</div>
            </div>
            <div
              id="tooltip"
              className="hidden group-hover:block absolute bg-2023-void-2 text-2023-bavarian-gold-2 px-2 py-1 rounded-md"
            >
              Checkout all the forks here!
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
