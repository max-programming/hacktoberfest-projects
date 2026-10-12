import type { PropsWithChildren } from 'react';

const HACKTOBERFEST_URL = 'https://hacktoberfest.com';
const GITHUB_URL = 'https://github.com/max-programming/hacktoberfest-projects';

export const dynamic = 'force-static';

function LinkButton({
  href,
  variant = 'primary',
  children
}: PropsWithChildren<{ href: string; variant?: 'primary' | 'ghost' }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        variant === 'primary'
          ? 'relative group inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-bold uppercase text-hacktoberfest-blue bg-hacktoberfest-beige hover:bg-white transition-colors'
          : 'relative group inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-bold uppercase text-hacktoberfest-light bg-primary-btn-gradient shadow-primary-btn-shadow hover:bg-primary-btn-hover-gradient hover:text-white transition-colors'
      }
    >
      {variant === 'ghost' && (
        <span className="btn-clip group-hover:opacity-0" aria-hidden />
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export default function DiscontinuedPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero-gradient text-hacktoberfest-light">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#c2c2ff_1px,transparent_1px),linear-gradient(90deg,#c2c2ff_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-4 sm:px-6 py-10 sm:py-14">
        <header>
          <a href={HACKTOBERFEST_URL} target="_blank" rel="noreferrer">
            <img
              src="/horizontal_beige.png"
              alt="Hacktoberfest"
              width={1510}
              height={601}
              className="h-12 sm:h-14 w-auto"
            />
          </a>
        </header>

        <section className="flex flex-1 flex-col justify-center py-14 sm:py-20">
          <div className="mb-8 flex items-center gap-4">
            <span aria-hidden className="h-3 w-[68px] bg-square-box-gradient" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#c2c2ff]">
              Notice · Project discontinued
            </span>
          </div>

          <h1 className="heading-text text-3xl sm:text-5xl font-bold uppercase leading-tight">
            Hacktoberfest Project Finder has been retired
          </h1>

          <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-hacktoberfest-light/90">
            <p>
              This site helped you find open source repositories tagged{' '}
              <code className="bg-hacktoberfest-light-blue/60 px-1.5 py-0.5 text-hacktoberfest-beige">
                hacktoberfest
              </code>{' '}
              so you could open the pull requests that Hacktoberfest used to
              require.
            </p>
            <p>
              <strong className="text-hacktoberfest-beige">
                Hacktoberfest no longer counts pull requests.
              </strong>{' '}
              Since there is nothing left to search for, the project finder,
              sign-in and reporting features have been switched off.
            </p>
            <p>
              Contributing to open source is still encouraged. To learn how
              Hacktoberfest works this year and how to take part, head to the
              official website.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <LinkButton href={HACKTOBERFEST_URL}>
              Visit hacktoberfest.com <span aria-hidden>→</span>
            </LinkButton>
            <LinkButton href={GITHUB_URL} variant="ghost">
              View source on GitHub
            </LinkButton>
          </div>
        </section>

        <footer className="border-t border-dashed border-hacktoberfest-light-blue pt-6 text-sm text-hacktoberfest-light/70">
          Thank you to everyone who used and contributed to this project.{' '}
          <span className="text-red-400">💗</span> Usman, Sunrit and you all.
        </footer>
      </div>
    </main>
  );
}
