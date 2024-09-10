import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GITHUB_SECRET: z.string().optional(),
    XATA_BRANCH: z.string().optional(),
    XATA_API_KEY: z.string().optional(),
    AUTH_GITHUB_TOKEN: z.string().optional(),
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_SECRET: z.string(),
    AUTH_URL: z.string()
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});
