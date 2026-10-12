import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export const HACKTOBERFEST_URL = 'https://hacktoberfest.com';
export const GITHUB_URL =
  'https://github.com/max-programming/hacktoberfest-projects';

const coralButtonClass =
  'inline-flex items-center justify-center gap-2 border-2 border-hf-ink bg-hf-coral px-6 py-3.5 font-mono text-sm font-bold text-hf-ink shadow-block transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_#681913] sm:text-base';

/** Coral button with a hard maroon shadow, like on hacktoberfest.com. */
export function CoralButton({
  href,
  children
}: PropsWithChildren<{ href: string }>) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={coralButtonClass}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={coralButtonClass}
    >
      {children}
    </a>
  );
}

export function Eyebrow({
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

export function SiteHeader() {
  return (
    <header className="border-b-2 border-hf-ink bg-hf-teal">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
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
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/contributors"
            className="font-mono text-xs font-bold text-hf-cream hover:text-hf-yellow sm:text-sm"
          >
            Contributors
          </Link>
          <a
            href={HACKTOBERFEST_URL}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap border-2 border-hf-ink bg-hf-coral px-3 py-2 font-mono text-xs font-bold text-hf-ink shadow-block-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#681913] sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Hacktoberfest</span>
            <span className="hidden sm:inline">hacktoberfest.com</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-hf-ink bg-hf-cream px-4 py-8 text-hf-ink sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-2xl font-extrabold tracking-tight">
          Hacktoberfest Project Finder:{' '}
          <span className="text-hf-red">thanks for every PR.</span>
        </p>
        <div className="space-y-1 font-mono text-xs uppercase tracking-wider text-hf-ink/70 md:text-right">
          <p>
            Made with <span className="text-hf-red">♥</span> by{' '}
            <Link
              href="/contributors"
              className="font-bold text-hf-ink underline decoration-2 underline-offset-4 hover:text-hf-red"
            >
              our contributors
            </Link>
          </p>
          <p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-hf-red"
            >
              Source on GitHub
            </a>{' '}
            · Independent project · not affiliated with Hacktoberfest
          </p>
        </div>
      </div>
    </footer>
  );
}
