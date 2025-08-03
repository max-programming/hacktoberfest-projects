import path from 'path';
import './src/env.mjs';

/**@type {import('next').NextConfig}*/
const config = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
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
