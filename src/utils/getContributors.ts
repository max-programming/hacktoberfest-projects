import path from 'path';
import fs from 'fs/promises';

export interface Contributor {
  login: string;
  name: string;
  avatar_url: string;
  profile: string;
  contributions: Array<string>;
}

export async function getContributors() {
  const filePath = path.join(process.cwd(), '.all-contributorsrc');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const contributors = JSON.parse(fileContents).contributors as Contributor[];

  return contributors;
}
