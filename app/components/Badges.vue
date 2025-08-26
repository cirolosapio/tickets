<template>
  <div class="flex flex-wrap gap-1">
    <UBadge v-if="primary" class="bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 text-white" variant="soft">
      {{ primary }}
      <template v-if="secondary"> / {{ secondary }}</template>
    </UBadge>
  </div>
</template>

<script setup lang="ts">
import type { Attraction } from '~~/types';

const { classification } = defineProps<{
  classification: Attraction['classifications'][0]
}>()

const primary = computed(() => classification.genre.name !== 'Non definito' ? classification.genre.name : undefined)
const secondary = computed(() => (classification.subGenre.name !== 'Non definito' && classification.subGenre.name !== primary.value) ? classification.subGenre.name : undefined)
</script>