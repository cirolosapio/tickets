<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <TheHeader />
      <NuxtPage />
    </UApp>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'it'
  }
})
const title = 'Concert App'
const description = 'A modern Nuxt application for discovering concerts.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: '',
  // twitterImage: '',
  twitterCard: 'summary_large_image'
})
</script>
