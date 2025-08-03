import path from 'path';
import { fileURLToPath } from 'url';
import './src/env.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
