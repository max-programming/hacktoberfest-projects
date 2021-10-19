const config = {
  title: 'Hacktoberfest Projects',
  description: `Quickly and easily find projects to contribute to this Hacktoberfest 2021!`,
  additionalMetaTags: [
    {
      property: 'keywords',
      content: 'hacktoberfest, open-source, contribution, oss'
    },
    {
      name: 'theme-color',
      content: '#1A202C'
    },
    {
      name: 'color-scheme',
      content: 'dark'
    },
    {
      name: 'msapplication-TileColor',
      content: '#da532c'
    }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hacktoberfest-projects.vercel.app',
    title: 'Hacktoberfest projects',
    description: `Quickly and easily find projects to contribute to this Hacktoberfest 2021!`,
    site_name: 'Hacktoberfest projects'
  },
  twitter: {
    creator: '@MaxProgramming1',
    cardType: 'summary',
    title: 'Hacktoberfest projects',
    url: 'https://hacktoberfest-projects.vercel.app'
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'icon',
      href: '/favicon-32x32.ico',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      href: '/favicon-16x16.ico',
      sizes: '16x16'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.ico',
      sizes: '76x76'
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#5bbad5'
    }
  ]
};

export default config;
