import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './migrations/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const db = drizzle(process.env.DATABASE_URL, { schema });
