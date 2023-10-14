import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GITHUB_TOKEN: z.string().optional(),
    GITHUB_ID: z.string().optional(),
    GITHUB_SECRET: z.string().optional(),
    XATA_BRANCH: z.string().optional(),
    XATA_API_KEY: z.string().optional()
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional()
  },
  runtimeEnv: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    XATA_BRANCH: process.env.XATA_BRANCH,
    XATA_API_KEY: process.env.XATA_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});
