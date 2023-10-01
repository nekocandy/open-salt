import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { GithubEmail, GithubProfile } from 'next-auth/providers/github'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { prisma } from '~/lib/database'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error vite SSR issue - need to use .default
    GithubProvider.default({
      clientId: useRuntimeConfig().auth.GITHUB_CLIENT_ID,
      clientSecret: useRuntimeConfig().auth.GITHUB_CLIENT_SECRET,
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: { scope: 'public_repo read:user user:email' },
      },
      userinfo: {
        url: 'https://api.github.com/user',
        // @ts-expect-error no typings
        async request({ client, tokens }) {
          const profile = await client.userinfo(tokens.access_token!)

          if (!profile.email) {
            const res = await fetch('https://api.github.com/user/emails', {
              headers: { Authorization: `token ${tokens.access_token}` },
            })

            if (res.ok) {
              const emails: GithubEmail[] = await res.json()
              profile.email = (emails.find(e => e.primary) ?? emails[0]).email
            }
          }

          return {
            ...profile,
            token: tokens.access_token,
          }
        },
      },
      profile(profile: GithubProfile & { token: string }) {
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name ?? profile.login,
          email: profile.email,
          token: profile.token,
          image: profile.avatar_url,
          bio: profile.bio,
          publicRepoCount: profile.public_repos,
        }
      },
    }),
  ],
})
