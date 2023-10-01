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

  getRepositoryWithoutFile: protectedProcedure
    .input(z.object({
      filePath: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user.user

      const octokit = new Octokit({
        auth: user.token,
      })

      const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        type: 'owner',
      })

      const fileTrees = await Promise.all(data.map(async (repo) => {
        try {
          const everything = await octokit.rest.repos.getContent({
            owner: user.username,
            repo: repo.name,
            path: input.filePath,
          })

          if (everything.status === 200)
            return false

          return repo
        }
        catch (error) {
          return repo
        }
      }))

      return fileTrees.filter(tree => tree !== false)
    }),

  addFile: protectedProcedure
    .input(z.object({
      repositoryName: z.string(),
      filePath: z.string(),
      contents: z.string(),
      message: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user.user

      const octokit = new Octokit({
        auth: user.token,
      })

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: user.username,
        repo: input.repositoryName,
        path: input.filePath,
        message: input.message,
        // eslint-disable-next-line n/prefer-global/buffer
        content: Buffer.from(input.contents).toString('base64'),
        author: {
          name: 'Nekocandy Bot',
          email: 'saucebot@nekocandy.club',
        },
      })

      return true
    }),
})
