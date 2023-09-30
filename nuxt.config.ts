import { env } from 'std-env'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'opinionated nuxt',
      meta: [
        {
          name: 'description',
          content: 'an opinionated nuxt starter template',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/oink.svg',
        },
      ],
    },
  },

  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@sidebase/nuxt-auth'],
  css: [
    '@unocss/reset/tailwind.css',
    'notivue/notifications.css',
    'notivue/animations.css',
  ],
  build: {
    transpile: ['trpc-nuxt'],
  },
  imports: {
    imports: [
      {
        name: 'nanoid',
        from: 'nanoid',
      },
      {
        name: 'consola',
        from: 'consola',
      },
    ],
  },
  runtimeConfig: {
    auth: {
      SECRET: env.SECRET,
      GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: env.GITHUB_CLIENT_SECRET,
    },
  },
})
