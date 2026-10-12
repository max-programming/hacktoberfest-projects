import type { PropsWithChildren, ReactNode } from 'react';
import { ArrowRight, KeyRound, MapPin, Sticker } from 'lucide-react';

const HACKTOBERFEST_URL = 'https://hacktoberfest.com';
const GITHUB_URL = 'https://github.com/max-programming/hacktoberfest-projects';

export const dynamic = 'force-static';

function CoralButton({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 border-2 border-hf-ink bg-hf-coral px-6 py-3.5 font-mono text-sm font-bold text-hf-ink shadow-block transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#681913] sm:text-base"
    >
      {children}
    </a>
  );
}

function Eyebrow({
  className,
  children
}: PropsWithChildren<{ className: string }>) {
  return (
    <p
      className={`font-mono text-xs font-bold uppercase tracking-[0.18em] sm:text-sm ${className}`}
    >
      {children}
    </p>
  );
}

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

export default function DiscontinuedPage() {
  return (
    <>
      <header className="border-b-2 border-hf-ink bg-hf-teal">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="/hacktoberfest-2026.svg"
              alt="Hacktoberfest 2026"
              width={2243}
              height={215}
              className="h-5 w-auto sm:h-7"
            />
            <span className="hidden whitespace-nowrap border border-hf-cream/60 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-hf-cream/80 sm:inline">
              Project Finder
            </span>
          </div>
          <a
            href={HACKTOBERFEST_URL}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap border-2 border-hf-ink bg-hf-coral px-3 py-2 font-mono text-xs font-bold text-hf-ink shadow-block-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#681913] sm:px-5 sm:text-sm"
          >
            hacktoberfest.com
          </a>
        </div>
      </header>

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

      <footer className="border-t-2 border-hf-ink bg-hf-cream px-4 py-8 text-hf-ink sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            Hacktoberfest Project Finder:{' '}
            <span className="text-hf-red">thanks for every PR.</span>
          </p>
          <div className="space-y-1 font-mono text-xs uppercase tracking-wider text-hf-ink/70 md:text-right">
            <p>
              Made with <span className="text-hf-red">♥</span> by Usman, Sunrit
              and you all
            </p>
            <p>Independent project · not affiliated with Hacktoberfest</p>
          </div>
        </div>
      </footer>
    </>
  );
}
