import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, KeyRound, MapPin, Sticker } from 'lucide-react';
import {
  CoralButton,
  Eyebrow,
  GITHUB_URL,
  HACKTOBERFEST_URL,
  SiteFooter,
  SiteHeader
} from '@/components/site';
import { avatarUrl, getContributors } from '@/lib/contributors';

export const dynamic = 'force-static';

/** Hexagon "sticker" badge, like the ones on hacktoberfest.com. */
function HexIcon({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div className="relative h-[76px] w-[68px]">
      <svg
        viewBox="0 0 68 76"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <polygon
          points="34,5 63,21.5 63,54.5 34,71 5,54.5 5,21.5"
          fill="#9aa7a2"
          transform="translate(0 3)"
        />
        <polygon
          points="34,3 64,20 64,54 34,71 4,54 4,20"
          fill="#f7f8f3"
          stroke="#10201d"
          strokeWidth="2"
        />
        <polygon
          points="34,10 58,24 58,50 34,64 10,50 10,24"
          fill={color}
          stroke="#10201d"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-hf-ink">
        {children}
      </div>
    </div>
  );
}

/**
 * Decorative pixel field echoing the Fest map on hacktoberfest.com.
 * Deterministic so the page stays fully static.
 */
function PixelField() {
  const cols = 48;
  const rows = 7;
  const accents = ['bg-hf-pink', 'bg-hf-coral', 'bg-hf-yellow'];
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const hash = (i * 2654435761) % 997;
    if (hash % 23 === 0) return accents[hash % 3];
    if (hash % 5 === 0) return 'bg-transparent';
    return 'bg-[#4f6f68]';
  });

  return (
    <div
      aria-hidden
      className="mx-auto grid w-full max-w-6xl gap-[3px] opacity-90"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.map((cls, i) => (
        <span key={i} className={`aspect-square ${cls}`} />
      ))}
    </div>
  );
}

const steps = [
  {
    icon: <KeyRound size={26} strokeWidth={2.25} />,
    color: '#8bb2de',
    title: 'Sign in with MyMLH',
    body: 'Create your free account on hacktoberfest.com to start your sticker book.'
  },
  {
    icon: <MapPin size={26} strokeWidth={2.25} />,
    color: '#e97a77',
    title: 'Go to a Fest, or join online',
    body: 'Find an in-person Fest near you, or join the livestreams and challenges from anywhere.'
  },
  {
    icon: <Sticker size={26} strokeWidth={2.25} />,
    color: '#f3b924',
    title: 'Collect stickers and swag',
    body: 'Earn virtual stickers as you take part, and get real swag mailed to your door.'
  }
];

export default async function DiscontinuedPage() {
  const contributors = await getContributors();

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="overflow-hidden bg-hf-teal px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-20">
          <Eyebrow className="text-hf-pink">
            Project Finder · Discontinued · October 2026
          </Eyebrow>
          <h1 className="mx-auto mt-6 max-w-5xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            No more PR hunting.{' '}
            <span className="text-hf-coral">This finder has retired.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-hf-cream/90 sm:text-lg">
            Hacktoberfest no longer counts pull requests, so there's no need to
            search for repositories tagged{' '}
            <code className="bg-hf-teal-dark px-1.5 py-0.5 font-mono text-[0.9em] text-hf-yellow">
              hacktoberfest
            </code>{' '}
            anymore. The Hacktoberfest Project Finder has been switched off.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <CoralButton href={HACKTOBERFEST_URL}>
              Go to hacktoberfest.com <ArrowRight size={18} />
            </CoralButton>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm font-bold text-hf-cream underline decoration-2 underline-offset-[6px] hover:text-hf-yellow"
            >
              View the source on GitHub
            </a>
          </div>
          <div className="mt-16">
            <PixelField />
          </div>
        </section>

        {/* What changed */}
        <section className="border-t-2 border-hf-ink bg-hf-teal-dark px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow className="text-hf-blue">What changed</Eyebrow>
              <h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                Why was it <span className="text-hf-yellow">discontinued?</span>
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-hf-cream/90 sm:text-lg">
              <p>
                <strong className="text-hf-cream">
                  This site helped you find projects for Hacktoberfest.
                </strong>{' '}
                Pick a language and it listed GitHub repositories ready for the
                pull requests the event used to require.
              </p>
              <p>
                <strong className="text-hf-cream">
                  Hacktoberfest has changed.
                </strong>{' '}
                Pull requests no longer count toward rewards. Instead, you take
                part at in-person Fests or online, and collect stickers along
                the way.
              </p>
              <p>
                <strong className="text-hf-cream">
                  With nothing left to search for,
                </strong>{' '}
                the finder, GitHub sign-in and reporting features have been
                switched off for good.
              </p>
            </div>
          </div>
        </section>

        {/* Contributors */}
        <section className="border-t-2 border-hf-ink bg-hf-paper px-4 py-20 text-hf-ink sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow className="text-hf-ink">Hall of fame</Eyebrow>
              <h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
                {contributors.length} people built this.{' '}
                <span className="text-hf-red">Thank you.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-hf-ink/80 sm:text-lg">
                The finder may be retired, but the people who wrote its code,
                designed it, reported bugs and shared ideas deserve the credit.
              </p>
              <div className="mt-10">
                <CoralButton href="/contributors">
                  Meet the contributors <ArrowRight size={18} />
                </CoralButton>
              </div>
            </div>
            <Link
              href="/contributors"
              aria-label="Meet the contributors"
              className="grid grid-cols-6 gap-2 sm:gap-3"
            >
              {contributors.slice(0, 24).map(contributor => (
                <img
                  key={contributor.login}
                  src={avatarUrl(contributor, 120)}
                  alt=""
                  width={60}
                  height={60}
                  loading="lazy"
                  className="aspect-square w-full border-2 border-hf-ink bg-hf-sage object-cover transition-transform hover:-translate-y-1"
                />
              ))}
            </Link>
          </div>
        </section>

        {/* What to do now */}
        <section className="border-t-2 border-hf-ink bg-hf-sage px-4 py-20 text-hf-ink sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Eyebrow className="text-hf-ink">What to do now</Eyebrow>
            <h2 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              Join Hacktoberfest 2026.
              <br />
              <span className="text-hf-red">The new way.</span>
            </h2>

            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="border-2 border-hf-ink bg-hf-cream p-6 shadow-[8px_8px_0_0_#681913]"
                >
                  <HexIcon color={step.color}>{step.icon}</HexIcon>
                  <div className="mt-5 flex items-start gap-3">
                    <span className="mt-0.5 border-2 border-hf-ink bg-hf-yellow px-1.5 font-mono text-xs font-bold leading-5">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-hf-ink/80">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <CoralButton href={HACKTOBERFEST_URL}>
                Start on hacktoberfest.com <ArrowRight size={18} />
              </CoralButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
