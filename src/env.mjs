import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_GITHUB_SECRET: z.string().min(1, 'AUTH_GITHUB_SECRET is required'),
    AUTH_GITHUB_ID: z.string().min(1, 'AUTH_GITHUB_ID is required'),
    AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
    AUTH_GITHUB_TOKEN: z.string().optional(),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    AUTH_DRIZZLE_URL: z.string().min(1, 'AUTH_DRIZZLE_URL is required')
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional().nullable(),
    NEXT_PUBLIC_ANALYTICS_WEBSITE_ID: z.string().uuid().optional().nullable()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_ANALYTICS_WEBSITE_ID:
      process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_DRIZZLE_URL: process.env.AUTH_DRIZZLE_URL
  }
});
