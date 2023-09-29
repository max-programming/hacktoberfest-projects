import { GetStaticProps } from 'next';

import fs from 'fs';
import path from 'path';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ContributorCard from 'components/ContributorCard';

interface Contributor {
  login: string;
  name: string;
  avatar_url: string;
  profile: string;
  contributions: Array<string>;
}

interface Props {
  contributors: Contributor[];
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const filePath = path.join(process.cwd(), '.all-contributorsrc');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const contributors = JSON.parse(fileContents).contributors as Contributor[];

  return {
    props: { contributors }
  };
};

export default function Contrubutors({ contributors }: Props) {
  return (
    <div>
      <Header />
      <div className="container mx-auto mb-5">
        <h1 className="my-5 text-5xl font-bold text-white text-center">Contributors ✨</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contributors.map(contributor => (
            <ContributorCard
              key={contributor.login}
              contributor={contributor}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
