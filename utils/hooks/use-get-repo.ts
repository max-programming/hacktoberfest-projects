import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { repoAtom } from 'utils/state/repoAtom';

export function useGetRepo() {
  const [isReported, setIsReported] = useState(false);
  const repo = useAtomValue(repoAtom);

  useEffect(() => {
    async function checkRepo() {
      if (!repo) return;
      const repoId = repo?.id;
      const res = await axios.get(`/api/check-repo?repoId=${repoId}`);
      if (!res.data) {
        return setIsReported(false);
      }
      return setIsReported(true);
    }
    checkRepo();
  }, [repo]);

  return isReported;
}
