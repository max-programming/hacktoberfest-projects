'use client';

import { repoAtom } from '@/state/repoAtom';
import { RepoItem } from '@/types';
import { useSetAtom } from 'jotai';
import { GoAlertFill } from 'react-icons/go';

interface ReportButtonProps {
  repo: RepoItem;
}

export function ReportButton({ repo }: ReportButtonProps) {
  const setRepo = useSetAtom(repoAtom);

  return (
    <button
      className="inline-flex items-center p-2 text-center transition duration-200 ease-linear rounded-lg hover:bg-hacktoberfest-light-pink hover:*:text-hacktoberfest-deep-pink stat-title"
      onClick={() => {
        const modal = document.getElementById('modal') as HTMLDialogElement;
        console.log(modal);

        if (modal) {
          setRepo(repo);
          modal.showModal();
        }
      }}
    >
      <GoAlertFill className="text-lg border-none outline-none text-hacktoberfest-light" />
    </button>
  );
}
