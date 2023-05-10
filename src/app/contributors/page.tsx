import ContributorCard from '@/components/ContributorCard';
import { getContributors } from '@/utils/getContributors';

export default async function Contributors() {
  const contributors = await getContributors();

  return (
    <div>
      <div className="container mx-auto mb-5">
        <h1 className="my-5 text-5xl font-bold text-center">Contributors ✨</h1>
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
