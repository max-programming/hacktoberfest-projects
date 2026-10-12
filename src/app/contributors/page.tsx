import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import {
  CoralButton,
  Eyebrow,
  GITHUB_URL,
  SiteFooter,
  SiteHeader
} from '@/components/site';
import {
  avatarUrl,
  contributionTypes,
  getContributors,
  type Contributor
} from '@/lib/contributors';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contributors | Hacktoberfest Project Finder',
  description:
    'The people who built the Hacktoberfest Project Finder. Thank you for every contribution.'
};

function ContributorCard({ contributor }: { contributor: Contributor }) {
  const githubUrl = `https://github.com/${contributor.login}`;
  const website =
    contributor.profile &&
    !contributor.profile.toLowerCase().startsWith(githubUrl.toLowerCase())
      ? contributor.profile
      : null;

  return (
    <li
      id={contributor.login}
      className="flex scroll-mt-8 flex-col border-2 border-hf-ink bg-hf-cream p-5 text-hf-ink shadow-[6px_6px_0_0_#681913] target:outline target:outline-4 target:outline-offset-4 target:outline-hf-yellow"
    >
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl(contributor, 160)}
          alt=""
          width={80}
          height={80}
          loading="lazy"
          className="h-20 w-20 shrink-0 border-2 border-hf-ink bg-hf-sage object-cover"
        />
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold leading-tight">
            {contributor.name}
          </h2>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="block truncate font-mono text-sm text-hf-ink/70 underline decoration-1 underline-offset-4 hover:text-hf-red"
          >
            @{contributor.login}
          </a>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Contributions">
        {contributor.contributions.map(type => {
          const meta = contributionTypes[type];
          return (
            <li
              key={type}
              className={`border-2 border-hf-ink px-2 py-0.5 font-mono text-xs font-bold ${meta?.className ?? 'bg-hf-sage'}`}
            >
              <span aria-hidden>{meta?.emoji ?? '✨'}</span>{' '}
              {meta?.label ?? type}
            </li>
          );
        })}
      </ul>

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="mt-auto block truncate pt-4 font-mono text-xs font-bold underline decoration-2 underline-offset-4 hover:text-hf-red"
        >
          {website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>
      )}
    </li>
  );
}

export default async function ContributorsPage() {
  const contributors = await getContributors();

  const counts = Object.keys(contributionTypes)
    .map(type => ({
      type,
      count: contributors.filter(c => c.contributions.includes(type)).length
    }))
    .filter(({ count }) => count > 0);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="bg-hf-teal px-4 pb-16 pt-16 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow className="text-hf-pink">
              Hall of fame · {contributors.length} contributors
            </Eyebrow>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
              Built by the community.{' '}
              <span className="text-hf-coral">Thank you.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-hf-cream/90 sm:text-lg">
              The Hacktoberfest Project Finder has been retired, but it was
              built by these people. Every line of code, design, idea and bug
              report helped developers find their next open source project.
            </p>

            <ul className="mt-10 flex flex-wrap gap-3">
              {counts.map(({ type, count }) => (
                <li
                  key={type}
                  className="flex items-center gap-2 border-2 border-hf-ink bg-hf-teal-dark px-3 py-2 font-mono text-xs font-bold sm:text-sm"
                >
                  <span className="border-2 border-hf-ink bg-hf-yellow px-1.5 text-hf-ink">
                    {count}
                  </span>
                  {contributionTypes[type].label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t-2 border-hf-ink bg-hf-paper px-4 py-16 sm:px-6 sm:py-20">
          <ul className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map(contributor => (
              <ContributorCard
                key={contributor.login}
                contributor={contributor}
              />
            ))}
          </ul>

          <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start gap-6 text-hf-ink sm:flex-row sm:items-center">
            <CoralButton href="/">
              Why the finder retired <ArrowRight size={18} />
            </CoralButton>
            <a
              href={`${GITHUB_URL}/graphs/contributors`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm font-bold underline decoration-2 underline-offset-[6px] hover:text-hf-red"
            >
              See the full history on GitHub
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
