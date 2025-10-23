import { emojify } from '@twuni/emojify';
import {
  GoIssueOpened,
  GoRepoForked,
  GoStar,
  GoGitPullRequest
} from 'react-icons/go';
import { ReportButton } from './report-button';
import { cn } from '@/lib/utils';
import type { Repository } from '@/types';

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_TOPICS_DISPLAY = 3;
const numberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short'
});

interface RepoCardProps {
  repo: NonNullable<Repository>;
}

export function RepoCard({ repo }: RepoCardProps) {
  const truncatedDescription =
    repo.description && repo.description.length > MAX_DESCRIPTION_LENGTH
      ? repo.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      : repo.description;

  // Ensure 'hacktoberfest' topic appears first
  const sortedTopics = repo.repositoryTopics.nodes
    ?.map(node => node.topic.name)
    .toSorted((a, b) => {
      if (a === 'hacktoberfest') return -1;
      if (b === 'hacktoberfest') return 1;
      return 0;
    });

  const displayedTopics = sortedTopics?.slice(0, MAX_TOPICS_DISPLAY);
  const hasMoreTopics =
    sortedTopics && sortedTopics.length > MAX_TOPICS_DISPLAY;

  return (
    <section className="transition duration-300 shadow-sm card bg-hacktoberfest-blue ring-1 ring-hacktoberfest-light hover:scale-105 hover:shadow-2xl hover:shadow-hacktoberfest-light-blue h-125">
      <div className="relative p-6 card-body">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 overflow-hidden">
            <div className="flex items-center gap-2">
              <a
                className="border-2 rounded-full h-12 w-12 sm:h-14 sm:w-14 p-1.5 border-hacktoberfest-beige flex-shrink-0"
                href={`https://github.com/${repo.owner.login}`}
                title={repo.owner.login}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={repo.owner.avatarUrl}
                  alt={repo.owner.login}
                  className="rounded-full"
                />
              </a>
              <h2 className="overflow-hidden text-xl sm:text-3xl cursor-pointer text-hacktoberfest-light line-clamp-1">
                <a
                  href={repo.url + '?ref=finder.usmans.me'}
                  title={repo.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repo.name}
                </a>
              </h2>
            </div>
            <ReportButton repo={repo} />
          </div>

          <h6 className="my-5 text-lg text-hacktoberfest-beige">
            {emojify(truncatedDescription ?? '')}
            {repo.description &&
              repo.description.length > MAX_DESCRIPTION_LENGTH && (
                <a
                  href={repo.url + '?ref=finder.usmans.me'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-hacktoberfest-light ml-2 underline-expand"
                >
                  Read more
                </a>
              )}
          </h6>

          <div className="card-actions gap-y-3">
            {displayedTopics?.map((topic: string) => (
              <a
                key={topic}
                href={`https://github.com/topics/${topic}`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'badge inline px-3 py-0.5 h-auto',
                  topic === 'hacktoberfest'
                    ? 'bg-hacktoberfest-beige text-hacktoberfest-blue'
                    : 'bg-hacktoberfest-light-blue text-hacktoberfest-light'
                )}
              >
                {topic}
              </a>
            ))}
            {hasMoreTopics && (
              <span className="text-hacktoberfest-light ml-2">...</span>
            )}
          </div>
        </div>

        {/* stars and forks cards */}
        <div className="flex flex-wrap justify-between mt-8 gap-4 cursor-pointer container-query text-neutral-100">
          <a
            href={`${repo.url}/stargazers?ref=finder.usmans.me`}
            target="_blank"
            className="w-full flex-shrink-0 flex-grow basis-[120px] border rounded-xl flex items-center justify-center py-4 gap-3 relative border-hacktoberfest-light tooltip tooltip-bottom"
            data-tip="Click to see stargazers"
          >
            <GoStar className="text-2xl text-hacktoberfest-light" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-beige">
                {numberFormatter.format(repo.stargazerCount)}
              </div>
              <div className="text-xs text-hacktoberfest-light lg:text-sm">
                Stars
              </div>
            </div>
          </a>
          <a
            href={`${repo.url}/forks?ref=finder.usmans.me`}
            target="_blank"
            className="flex-shrink-0 flex-grow basis-[120px] border rounded-xl p-4 flex items-center justify-center gap-3 relative border-hacktoberfest-light tooltip tooltip-bottom"
            data-tip="Click to see forks"
          >
            <GoRepoForked className="text-2xl text-hacktoberfest-light" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-beige">
                {numberFormatter.format(repo.forkCount)}
              </div>
              <div className="text-xs text-hacktoberfest-light lg:text-sm">
                Forks
              </div>
            </div>
          </a>

          <a
            href={`${repo.url}/issues?ref=finder.usmans.me`}
            target="_blank"
            className="flex-shrink-0 flex-grow basis-[120px] border rounded-xl p-4 flex items-center justify-center gap-3 relative border-hacktoberfest-light tooltip tooltip-bottom"
            data-tip="Click to see pull requests"
          >
            <GoGitPullRequest className="text-2xl text-hacktoberfest-light" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-beige">
                {numberFormatter.format(repo.pullRequests.totalCount)}
              </div>
              <div className="text-xs text-hacktoberfest-light lg:text-sm">
                PRs
              </div>
            </div>
          </a>
          <a
            href={`${repo.url}/issues?ref=finder.usmans.me`}
            target="_blank"
            className="flex-shrink-0 flex-grow basis-[120px] border rounded-xl p-4 flex items-center justify-center gap-3 relative border-hacktoberfest-light tooltip tooltip-bottom"
            data-tip="Click to see issues"
          >
            <GoIssueOpened className="text-2xl text-hacktoberfest-light" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-beige">
                {numberFormatter.format(repo.issues.totalCount)}
              </div>
              <div className="text-xs text-hacktoberfest-light lg:text-sm">
                Issues
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
