import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_GITHUB_SECRET: z.string().min(1, 'AUTH_GITHUB_SECRET is required'),
    AUTH_GITHUB_ID: z.string().min(1, 'AUTH_GITHUB_ID is required'),
    AUTH_GITHUB_TOKEN: z.string().optional(),
    AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
    XATA_BRANCH: z.string().optional(),
    XATA_API_KEY: z.string().optional()
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});
