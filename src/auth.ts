import { XataAdapter } from '@auth/xata-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { getXataClient } from './xata';

const client = getXataClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: XataAdapter(client),
  providers: [GitHub]
});
