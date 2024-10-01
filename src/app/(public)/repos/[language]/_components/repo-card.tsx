import type { RepoItem } from '@/types';
import { emojify } from '@twuni/emojify';
import { GoIssueOpened, GoRepoForked, GoStar } from 'react-icons/go';
import { ReportButton } from './report-button';

const MAX_DESCRIPTION_LENGTH = 100;
const MAX_TOPICS_DISPLAY = 3;
const numberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short'
});

interface RepoCardProps {
  repo: RepoItem;
}

export function RepoCard({ repo }: RepoCardProps) {
  const truncatedDescription =
    repo.description.length > MAX_DESCRIPTION_LENGTH
      ? repo.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      : repo.description;

  // Ensure 'hacktoberfest' topic appears first
  const sortedTopics = repo.topics.toSorted((a, b) => {
    if (a === 'hacktoberfest') return -1;
    if (b === 'hacktoberfest') return 1;
    return 0;
  });

  const displayedTopics = sortedTopics.slice(0, MAX_TOPICS_DISPLAY);
  const hasMoreTopics = sortedTopics.length > MAX_TOPICS_DISPLAY;

  return (
    <section className="transition duration-300 shadow-sm card bg-hacktoberfest-black ring-1 ring-hacktoberfest-light-pink hover:scale-105 hover:shadow-2xl hover:shadow-hacktoberfest-deep-pink">
      <div className="relative p-6 card-body">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <a
              className="border-2 rounded-full h-14 aspect-square p-1.5 border-hacktoberfest-beige"
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
            <h2 className="overflow-hidden text-3xl cursor-pointer text-hacktoberfest-pink whitespace-nowrap text-ellipsis underline-expand">
              <a
                href={repo.html_url + '?ref=finder.usmans.me'}
                title={repo.name}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>
            </h2>
            <ReportButton repo={repo} />
          </div>

          <h6 className="my-5 text-lg text-hacktoberfest-beige">
            {emojify(truncatedDescription)}
            {repo.description.length > MAX_DESCRIPTION_LENGTH && (
              <a
                href={repo.html_url + '?ref=finder.usmans.me'}
                target="_blank"
                rel="noreferrer"
                className="text-hacktoberfest-pink ml-2 underline-expand"
              >
                Read more
              </a>
            )}
          </h6>

          <div className="card-actions gap-y-3">
            {displayedTopics.map((topic: string) => (
              <a
                key={topic}
                href={`https://github.com/topics/${topic}`}
                target="_blank"
                rel="noreferrer"
                className={`badge inline px-3 py-0.5 h-auto ${
                  topic === 'hacktoberfest'
                    ? 'bg-hacktoberfest-light-green text-hacktoberfest-dark-green'
                    : 'bg-hacktoberfest-deep-pink text-hacktoberfest-light-pink'
                }`}
              >
                {topic}
              </a>
            ))}
            {hasMoreTopics && (
              <span className="text-hacktoberfest-pink ml-2">...</span>
            )}
          </div>
        </div>

        {/* stars and forks cards */}
        <div className="flex flex-wrap justify-between gap-4 mt-8 cursor-pointer container-query text-neutral-100">
          <a
            href={`${repo.html_url}/stargazers?ref=finder.usmans.me`}
            target="_blank"
            className="w-full flex-shrink-0 flex-grow basis-[120px] border rounded-xl flex items-center justify-center py-4 gap-3 relative border-hacktoberfest-pink tooltip tooltip-bottom"
            data-tip="Click to see stargazers"
          >
            <GoStar className="text-2xl text-hacktoberfest-pink" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-light">
                {numberFormatter.format(repo.stargazers_count)}
              </div>
              <div className="text-xs text-neutral-300 lg:text-sm">Stars</div>
            </div>
          </a>
          <a
            href={`${repo.html_url}/forks?ref=finder.usmans.me`}
            target="_blank"
            className="flex-shrink-0 flex-grow basis-[120px] border rounded-xl p-4 flex items-center justify-center gap-3 relative border-hacktoberfest-pink tooltip tooltip-bottom"
            data-tip="Click to see forks"
          >
            <GoRepoForked className="text-2xl text-hacktoberfest-pink" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-light">
                {numberFormatter.format(repo.forks)}
              </div>
              <div className="text-xs text-neutral-300 lg:text-sm">Forks</div>
            </div>
          </a>
          <a
            href={`${repo.html_url}/issues?ref=finder.usmans.me`}
            target="_blank"
            className="flex-shrink-0 flex-grow basis-[120px] border rounded-xl p-4 flex items-center justify-center gap-3 relative border-hacktoberfest-pink tooltip tooltip-bottom"
            data-tip="Click to see issues"
          >
            <GoIssueOpened className="text-2xl text-hacktoberfest-pink" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-medium mb-0.5 text-hacktoberfest-light">
                {numberFormatter.format(repo.open_issues_count)}
              </div>
              <div className="text-xs text-neutral-300 lg:text-sm">Issues</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
