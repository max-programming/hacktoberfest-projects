import fs from 'fs/promises';
import path from 'path';

export interface Contributor {
  login: string;
  name: string;
  avatar_url: string;
  profile: string;
  contributions: string[];
}

/** all-contributors types used in .all-contributorsrc, in display order. */
export const contributionTypes: Record<
  string,
  { label: string; emoji: string; className: string }
> = {
  code: { label: 'Code', emoji: '💻', className: 'bg-hf-blue' },
  design: { label: 'Design', emoji: '🎨', className: 'bg-hf-coral' },
  content: { label: 'Content', emoji: '🖋', className: 'bg-hf-yellow' },
  ideas: { label: 'Ideas', emoji: '🤔', className: 'bg-hf-pink' },
  bug: { label: 'Bug reports', emoji: '🐛', className: 'bg-hf-sage' },
  doc: { label: 'Docs', emoji: '📖', className: 'bg-hf-sage' },
  a11y: { label: 'Accessibility', emoji: '♿', className: 'bg-hf-sage' }
};

/** Read at build time only: the contributors page is prerendered. */
export async function getContributors(): Promise<Contributor[]> {
  const filePath = path.join(process.cwd(), '.all-contributorsrc');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents).contributors as Contributor[];
}

/** GitHub serves avatars from its own CDN; `s` picks the image size. */
export function avatarUrl(contributor: Contributor, size: number) {
  const url = new URL(contributor.avatar_url);
  url.searchParams.set('s', String(size));
  return url.toString();
}
