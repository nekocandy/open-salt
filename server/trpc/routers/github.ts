import { Octokit } from 'octokit'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const githubRouter = router({
  getRepositories: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.user.user

      const octokit = new Octokit({
        auth: user.token,
      })

      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        type: 'owner',
      })

      return data
    }),

  getRepositoryWithoutLicense: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.user.user

      const octokit = new Octokit({
        auth: user.token,
      })

      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        type: 'owner',
      })

      return data.filter(repo => repo.license == null)
    }),

  getRepositoryWithoutCodeOfConduct: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.user.user

      const octokit = new Octokit({
        auth: user.token,
      })

      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        type: 'owner',
      })

      const fileTrees = data.filter(async (repo) => {
        try {
          const { status } = await octokit.rest.repos.getContent({
            owner: user.username,
            repo: repo.name,
            path: 'CODE_OF_CONDUCT.md',
          })

          if (status !== 200)
            return false

          return true
        }
        catch (error) {
          return false
        }
      })

      return fileTrees
    }),

  addLicense: protectedProcedure
    .input(z.object({
      repositoryName: z.string(),
      license: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user.user

      const octokit = new Octokit({
        auth: user.token,
      })

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: user.username,
        repo: input.repositoryName,
        path: 'LICENSE',
        message: 'docs: add license | added from website',
        // eslint-disable-next-line n/prefer-global/buffer
        content: Buffer.from(input.license).toString('base64'),
        author: {
          name: 'Nekocandy Bot',
          email: 'saucebot@nekocandy.club',
        },
      })
    }),
})
