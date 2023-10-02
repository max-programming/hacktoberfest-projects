await import('./env.mjs');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com']
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination:
          'https://github.com/max-programming/hacktoberfest-projects',
        permanent: true
      }
    ];
  }
};

export default config;
