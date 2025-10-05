import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/migrations/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  }
});
