import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { repoAtom } from '@/state/repoAtom';
import { useSession } from 'next-auth/react';

export function useGetRepo() {
  const [isReported, setIsReported] = useState(false);
  const session = useSession();
  const repo = useAtomValue(repoAtom);

  useEffect(() => {
    async function checkRepo() {
      if (!session.data?.user) return;
      if (!repo) return;
      const repoId = repo?.id;
      const res = await axios.get(`/api/check-repo?repoId=${repoId}`);
      if (!res.data) {
        return setIsReported(false);
      }
      return setIsReported(true);
    }
    checkRepo();
  }, [repo, session]);

  return isReported;
}
