import path from 'path';
import fs from 'fs/promises';
import { Header } from '../_components/header';
import { ContributorCard } from './_components/contributor-card';
import type { Contributor } from '@/types';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Contributors',
  description: 'List of contributors to the project'
};

export default async function ContributorsPage() {
  const contributors = await getContributors();

  return (
    <div>
      <Header />
      <div className="container mx-auto mb-5">
        <h1 className="my-5 text-5xl font-bold text-center text-neutral-100">
          Contributors ✨
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contributors.map(contributor => (
            <ContributorCard
              key={contributor.login}
              contributor={contributor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

async function getContributors(): Promise<Contributor[]> {
  const filePath = path.join(process.cwd(), '.all-contributorsrc');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const contributors = JSON.parse(fileContents).contributors as Contributor[];

  return contributors;
}
