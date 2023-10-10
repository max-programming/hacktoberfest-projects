import { env } from 'env.mjs';
import NextAuth, { type AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers:
    env.GITHUB_ID && env.GITHUB_SECRET
      ? [
          GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET
          })
        ]
      : []
} satisfies AuthOptions;

export default NextAuth(authOptions);
