<template>
  <img v-if="first" :src="first.url"
    class="object-cover w-full h-full transition-transform duration-500 hover:scale-110" width="320" height="180"
    loading="lazy" />
</template>

<script setup lang="ts">
import type { Attraction } from '~~/types';

const { images } = defineProps<{
  images: Attraction['images']
}>()

const first = computed(() => images.find(img => img.width >= 300 && img.width <= 600) || images[0])
</script>
