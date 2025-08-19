// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  routeRules: {
    '/**': { swr: 3600 },
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
    sourceMapsUploadOptions: {
      org: 'crewbe',
      project: 'tickets'
    },

    autoInjectServerSentry: 'top-level-import'
  },

  sourcemap: {
    client: 'hidden'
  }
})