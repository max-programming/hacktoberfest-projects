// Fonts are self-hosted (bundled from npm) so visitors make no requests to
// third-party font services.
import '@fontsource/barlow-semi-condensed/latin-700.css';
import '@fontsource/barlow-semi-condensed/latin-800.css';
import '@fontsource/space-mono/latin-400.css';
import '@fontsource/space-mono/latin-700.css';
import '@fontsource-variable/inter/wght.css';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';

// Analytics are disabled now that the project finder is discontinued.
// Uncomment these (and the matching blocks below) to bring them back.
// The env schema lives in archive/src/env.mjs.
// import Script from 'next/script';
// import { Databuddy } from '@databuddy/sdk/react';
// import { env } from '@/env.mjs';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-hf-teal font-sans text-hf-cream antialiased">
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
  themeColor: '#3d5e58',
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
