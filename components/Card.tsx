import { emojify } from '@twuni/emojify';
import {
  GoStar,
  GoRepoForked,
  GoAlertFill,
  GoIssueOpened
} from 'react-icons/go';
import { RepoItem } from 'types';
import { useSetAtom } from 'jotai';
import { repoAtom } from 'utils/state/repoAtom';

interface Props {
  repo: RepoItem;
}

function Card({ repo }: Props) {
  const setRepo = useSetAtom(repoAtom);
  return (
    <section className="shadow-sm card bg-2023-void-2 ring-1 ring-2023-manga-3 transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-2023-bavarian-gold-2/30">
      <div className="relative card-body p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center justify-start">
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
              <h2 className="text-3xl cursor-pointer hover:underline text-2023-bavarian-gold-2 whitespace-pre-wrap text-ellipsis overflow-hidden">
                <a
                  href={repo.html_url}
                  title={repo.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {repo.name}
                </a>
              </h2>
            </div>
            <button
              className="hover:bg-2023-bavarian-red-2 p-2 text-center stat-title items-center inline-flex rounded-lg transition ease-linear duration-200"
              onClick={() => {
                const modal = document.getElementById(
                  'modal'
                ) as HTMLDialogElement;

                if (modal) {
                  setRepo(repo);
                  modal.showModal();
                }
              }}
            >
              <GoAlertFill className="text-2023-manga-2 outline-none border-none text-lg" />
            </button>
          </div>

          <h6 className="my-5 text-2023-manga-2 text-lg">
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
        <div className="container-query flex flex-wrap justify-between gap-3 xl:gap-5 text-neutral-100 cursor-pointer mt-8">
          <a
            href={`${repo.html_url}/stargazers`}
            target="_blank"
            className="group w-full flex-shrink-0 flex-grow-1  basis-[120px] border rounded-xl p-3 xl:px-4 flex items-center gap-2 xl:gap-3 relative"
          >
            <GoStar className="text-yellow-200 text-2xl" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-semibold mb-0.5">
                {repo.stargazers_count}
              </div>
              <div className="text-neutral-300 text-xs lg:text-sm">Stars</div>
            </div>
            <div
              id="tooltip"
              className="hidden group-hover:block text-sm absolute bg-2023-void-2 text-2023-bavarian-gold-2 px-2 py-1 rounded-md"
            >
              Checkout all the stars here!
            </div>
          </a>
          <a
            href={`${repo.html_url}/forks`}
            target="_blank"
            className="group flex-shrink-0 flex-grow-1  basis-[120px] border rounded-xl p-3 flex items-center gap-3 relative"
          >
            <GoRepoForked className="text-yellow-200 text-2xl" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-semibold mb-0.5">
                {repo.forks}
              </div>
              <div className="text-neutral-300 text-xs lg:text-sm">Forks</div>
            </div>
            <div
              id="tooltip"
              className="hidden group-hover:block absolute text-sm bg-2023-void-2 text-2023-bavarian-gold-2 px-2 py-1 rounded-md"
            >
              Checkout all the forks here!
            </div>
          </a>
          <a
            href={`${repo.html_url}/issues`}
            target="_blank"
            className="group issues-btn flex-shrink-0 flex-grow-1 basis-[120px] border rounded-xl p-3 flex items-center gap-3 relative"
          >
            <GoIssueOpened className="text-yellow-200 text-2xl" />
            <div className="flex flex-col">
              <div className="text-lg xl:text-2xl font-semibold mb-0.5">
                {repo.open_issues_count}
              </div>
              <div className="text-neutral-300 text-xs lg:text-sm">Issues</div>
            </div>
            <div
              id="tooltip"
              className="hidden group-hover:block absolute text-sm bg-2023-void-2 text-2023-bavarian-gold-2 px-2 py-1 rounded-md"
            >
              Checkout all open issues here!
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Card;
