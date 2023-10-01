import { Octokit } from 'octokit'
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
})
