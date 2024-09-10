import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Footer } from '@/components/footer';
import { ReportModal } from '@/components/report-modal';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-poppins'
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html className={poppins.variable}>
      <body className="font-sans">
        {children}
        <Footer />
        <SessionProvider>
          <ReportModal />
        </SessionProvider>
        <Toaster position="bottom-right" />
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
