import { atom } from 'jotai';
import { RepoItem } from 'types';

export const repoAtom = atom<RepoItem | null>(null);
