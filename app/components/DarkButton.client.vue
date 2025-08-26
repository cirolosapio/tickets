<template>
  <UButton class="rounded-full" variant="ghost" color="warning"
    :aria-label="isDark ? 'Attiva modalità chiara' : 'Attiva modalità scura'" @click="toggleDark()">
    <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="size-5" />
  </UButton>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleDark () {
  colorMode.value = isDark.value ? 'light' : 'dark'
}
</script>
