import { githubRouter } from './routers/github'
import { router } from './trpc'

export const appRouter = router({
  githubRouter,
})

export type AppRouter = typeof appRouter
