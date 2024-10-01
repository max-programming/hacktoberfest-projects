import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_GITHUB_SECRET: z.string().min(1, 'AUTH_GITHUB_SECRET is required'),
    AUTH_GITHUB_ID: z.string().min(1, 'AUTH_GITHUB_ID is required'),
    AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
    XATA_BRANCH: z.string().min(1, 'XATA_BRANCH is required'),
    XATA_API_KEY: z.string().min(1, 'XATA_API_KEY is required'),
    AUTH_GITHUB_TOKEN: z.string().optional()
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),
    NEXT_PUBLIC_ANALYTICS_WEBSITE_ID: z.string().uuid().optional()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_ANALYTICS_WEBSITE_ID:
      process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID
  }
});
