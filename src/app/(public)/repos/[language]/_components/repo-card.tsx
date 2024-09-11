import type { RepoItem } from '@/types';
import { emojify } from '@twuni/emojify';
import {
  GoAlertFill,
  GoIssueOpened,
  GoRepoForked,
  GoStar
} from 'react-icons/go';
import { ReportButton } from './report-button';

interface RepoCardProps {
  repo: RepoItem;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <section className="transition duration-300 shadow-sm card bg-2023-void-2 ring-1 ring-2023-manga-3 hover:scale-105 hover:shadow-2xl hover:shadow-2023-bavarian-gold-2/30">
      <div className="relative p-6 card-body">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <a
              className="border-2 rounded-full h-14 aspect-square p-1.5 border-neutral-100"
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
            <h2 className="overflow-hidden text-3xl cursor-pointer hover:underline text-2023-bavarian-gold-2 whitespace-nowrap text-ellipsis">
              <a
                href={repo.html_url}
                title={repo.name}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>
            </h2>
            <ReportButton repo={repo} />
          </div>

          <h6 className="my-5 text-lg text-2023-manga-2">
            {emojify(repo.description)}
          </h6>

          <div className="card-actions gap-y-3">
            {repo.topics.map((topic: string) => (
              <a
                key={topic}
                href={`https://github.com/topics/${topic}`}
                target="_blank"
                rel="noreferrer"
                className={`badge inline px-3 py-0.5 h-auto ${
                  topic === 'hacktoberfest'
                    ? 'bg-2023-bavarian-gold-1 text-2023-void-2'
                    : 'bg-2023-bavarian-blue-2 text-2023-void-2'
                }`}
              >
                {topic}
              </a>
            ))}
          </div>
        </div>

        {/* stars and forks cards */}
        <div className="flex flex-wrap justify-between gap-3 mt-8 cursor-pointer container-query xl:gap-5 text-neutral-100">
          <a
            href={`${repo.html_url}/stargazers`}
            target="_blank"
            className="group w-full flex-shrink-0 flex-grow-1  basis-[120px] border rounded-xl p-3 xl:px-4 flex items-center gap-2 xl:gap-3 relative"
          >
            <GoStar className="text-2xl text-yellow-200" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5">
                {repo.stargazers_count}
              </div>
              <div className="text-xs text-neutral-300 lg:text-sm">Stars</div>
            </div>
            <div
              id="tooltip"
              className="absolute hidden px-2 py-1 text-sm rounded-md group-hover:block bg-2023-void-2 text-2023-bavarian-gold-2"
            >
              Checkout all the stars here!
            </div>
          </a>
          <a
            href={`${repo.html_url}/forks`}
            target="_blank"
            className="group flex-shrink-0 flex-grow-1  basis-[120px] border rounded-xl p-3 flex items-center gap-3 relative"
          >
            <GoRepoForked className="text-2xl text-yellow-200" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5">
                {repo.forks}
              </div>
              <div className="text-xs text-neutral-300 lg:text-sm">Forks</div>
            </div>
            <div
              id="tooltip"
              className="absolute hidden px-2 py-1 text-sm rounded-md group-hover:block bg-2023-void-2 text-2023-bavarian-gold-2"
            >
              Checkout all the forks here!
            </div>
          </a>
          <a
            href={`${repo.html_url}/issues`}
            target="_blank"
            className="group issues-btn flex-shrink-0 flex-grow-1 basis-[120px] border rounded-xl p-3 flex items-center gap-3 relative"
          >
            <GoIssueOpened className="text-2xl text-yellow-200" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5">
                {repo.open_issues_count}
              </div>
              <div className="text-xs text-neutral-300 lg:text-sm">Issues</div>
            </div>
            <div
              id="tooltip"
              className="absolute hidden px-2 py-1 text-sm rounded-md group-hover:block bg-2023-void-2 text-2023-bavarian-gold-2"
            >
              Checkout all open issues here!
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
