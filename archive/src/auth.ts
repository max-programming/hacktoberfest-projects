import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from './lib/db/connection';
import * as schema from './lib/db/migrations/schema';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.usersTable,
    accountsTable: schema.accountsTable,
    sessionsTable: schema.sessionsTable,
    verificationTokensTable: schema.verificationTokensTable
  }),
  providers: [GitHub]
});
