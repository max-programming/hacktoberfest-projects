import { atom } from 'jotai';
import type { Repository } from '@/types';

export const repoAtom = atom<Repository | null>(null);
