import Head from 'next/head';
import { Poppins } from 'next/font/google';
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';
import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import './globals.css';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacktoberfest Projects',
  description: `Quickly and easily find projects to contribute to this Hacktoberfest 2023!`,
  keywords: [
    'hacktoberfest',
    'github',
    'projects',
    'open source',
    'oss',
    'contribution'
  ],
  themeColor: '#1A202C',
  colorScheme: 'dark',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://finder.usmans.me',
    title: 'Hacktoberfest projects',
    description: `Quickly and easily find projects to contribute to this Hacktoberfest 2022!`,
    siteName: 'Hacktoberfest projects',
    images: [
      {
        url: '/hacktoberfest.svg',
        width: 800,
        height: 600,
        alt: 'Hacktoberfest Logo',
        type: 'image/svg+xml'
      }
    ]
  },
  twitter: {
    creatorId: '@MaxProgramming1',
    card: 'summary_large_image',
    title: 'Hacktoberfest projects',
    site: 'https://finder.usmans.me'
  },
  icons: {
    href: '/favicon.ico',
    apple: '/apple-touch-icon.ico'
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          defer
          data-website-id="2529a688-ee5c-4869-9f85-7bb8fa5b6518"
          src="https://insights.usman-s.me/umami.js"
        ></script>
      </Head>
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
