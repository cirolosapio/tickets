// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: false },
  },

  image: {
    domains: ['s1.ticketm.net']
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@sentry/nuxt/module'
  ],

  css: ['assets/css/main.css'],

  runtimeConfig: {
    public: {
      sentry: {
        dsn: ''
      }
    },
    ticketmaster: {
      apiKey: '',
    }
  },

  sentry: {
    autoInjectServerSentry: 'top-level-import',
    sourceMapsUploadOptions: {
      org: 'crewbe',
      project: 'tickets'
    },
  },

  sourcemap: {
    client: 'hidden'
  }
})