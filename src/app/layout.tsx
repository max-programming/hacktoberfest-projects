import '@/styles/globals.css';
import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible_Mono } from 'next/font/google';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Footer } from '@/components/footer';
import { ReportModal } from '@/components/report-modal';
import { env } from '@/env.mjs';

const atkinsonHyperlegibleMono = Atkinson_Hyperlegible_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-space-grotesk'
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html className={atkinsonHyperlegibleMono.variable}>
      <body className="font-sans font-normal bg-hacktoberfest-blue">
        <ViewTransition>
          {children}
          <Footer />
          <SessionProvider>
            <ReportModal />
          </SessionProvider>
          <Toaster position="bottom-right" />
          {env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID && (
            <Script
              src="https://cloud.umami.is/script.js"
              data-website-id={env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID}
              strategy="lazyOnload"
            />
          )}
        </ViewTransition>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: '#1A202C',
  colorScheme: 'dark'
};
export function generateMetadata(): Metadata {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return {
    title: {
      template: '%s | Hacktoberfest Project Finder',
      default: 'Home | Hacktoberfest Project Finder'
    },
    description: `Quickly and easily find projects to contribute to ${currentMonth > 9 ? `upcoming Hacktoberfest ${currentYear + 1}` : `this Hacktoberfest ${currentYear}`}!`,
    keywords: [
      'hacktoberfest',
      'open-source',
      'contribution',
      'oss',
      'open source'
    ],
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
}
