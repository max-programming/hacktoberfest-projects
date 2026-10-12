import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

// Analytics are disabled now that the project finder is discontinued.
// Uncomment these (and the matching blocks below) to bring them back.
// The env schema lives in archive/src/env.mjs.
// import Script from 'next/script';
// import { Databuddy } from '@databuddy/sdk/react';
// import { env } from '@/env.mjs';

const atkinsonHyperlegibleMono = localFont({
  variable: '--font-atkinson-hyperlegible-mono',
  src: [
    {
      path: './fonts/AtkinsonHyperlegibleMono-Italic-VariableFont_wght.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: './fonts/AtkinsonHyperlegibleMono-VariableFont_wght.ttf',
      weight: '400',
      style: 'normal'
    }
  ]
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={atkinsonHyperlegibleMono.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-mono font-normal bg-hacktoberfest-blue">
        {children}
        {/* Umami analytics (disabled)
        {env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID}
            strategy="lazyOnload"
          />
        )}
        */}
        {/* Databuddy analytics (disabled)
        {env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID && (
          <Databuddy
            clientId={env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID}
            trackOutgoingLinks
            trackInteractions
            trackEngagement
            trackScrollDepth
            trackExitIntent
            trackBounceRate
            trackErrors
            enableBatching
          />
        )}
        */}
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: '#1c1c3f',
  colorScheme: 'dark'
};

export const metadata: Metadata = {
  title: 'Hacktoberfest Project Finder has been discontinued',
  description:
    'Hacktoberfest no longer counts pull requests, so the Hacktoberfest Project Finder has been retired. Visit hacktoberfest.com to learn how to take part.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://finder.usmans.me'
  },
  twitter: {
    creator: '@MaxProgramming1',
    card: 'summary_large_image',
    site: 'https://finder.usmans.me'
  }
};
