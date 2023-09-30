import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error vite SSR issue - need to use .default
    GithubProvider.default({
      clientId: useRuntimeConfig().auth.GITHUB_CLIENT_ID,
      clientSecret: useRuntimeConfig().auth.GITHUB_CLIENT_SECRET,
    }),
  ],
})
