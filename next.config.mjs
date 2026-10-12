import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * The project finder has been discontinued (Hacktoberfest no longer counts
 * pull requests). The site is now a single static notice page, and this
 * config keeps hosting usage close to zero:
 * - every old route (/repos, /reports, /api/*, ...) is redirected to the
 *   notice page by the routing layer, so no server function, database or
 *   GitHub API call is ever invoked;
 * - the contributors page stays live as a prerendered static page;
 * - image optimization is turned off so no image transformations are billed.
 *
 * The retired feature code lives in /archive for reference.
 */

/**@type {import('next').NextConfig}*/
const config = {
  reactStrictMode: true,
  images: {
    unoptimized: true
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
      },
      {
        // Any path without a file extension (i.e. any old page or API route)
        // goes to the notice page. Static assets, /_next and the static
        // contributors page are left alone.
        source: '/:path((?!_next/|contributors$)[^.]+)',
        destination: '/',
        permanent: false
      }
    ];
  }
};

export default config;
