import './src/env.mjs';

/**@type {import('next').NextConfig}*/
const config = {
  reactStrictMode: true,
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
