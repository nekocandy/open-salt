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

      const fileTrees = await Promise.allSettled(
        data.map(async (repo) => {
          const { data } = await octokit.rest.git.getTree({
            owner: user.username,
            repo: repo.name,
            tree_sha: 'HEAD',
            recursive: 'true',
          })

          return data
        }),
      )

      const locations = [
        'CODE_OF_CONDUCT',
        'docs/CODE_OF_CONDUCT',
        '.github/CODE_OF_CONDUCT',
      ]

      const withoutCodeOfConduct = fileTrees.filter((fileTree) => {
        if (fileTree.status === 'rejected')
          return false

        return locations.every((location) => {
          return !fileTree.value.tree.filter(file => file.path).some((file) => {
            return file.path!.includes(location)
          })
        })
      })

      return withoutCodeOfConduct
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
