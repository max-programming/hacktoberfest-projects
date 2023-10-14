await import('./env.mjs');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
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
