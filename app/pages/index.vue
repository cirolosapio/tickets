<template>
  <div class="flex justify-between p-3">
    <div>
      {{ data?.pagination.totalElements }} eventi trovati
      <template v-if="attractionId && data?.pagination?.totalElements! > 0">
        per artista {{ data?.rows[0]?._embedded?.attractions?.[0]?.name }}
      </template>
    </div>
    <UInput v-model="input" placeholder="Cerca" />
  </div>

  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
    <template v-if="data?.rows?.length">
      <UCard v-for="event in data.rows" :key="event.id"
        class="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
        <div class="aspect-video w-full mb-2 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
          <Images v-if="event.images" :images="event.images" />
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="font-semibold text-lg line-clamp-2">{{ event.name }}</div>
          <div class="text-sm text-gray-500">{{ formatDate(event.dates?.start) }}</div>
          <div class="text-xs text-gray-400">{{ formatSales(event.sales?.public) }}</div>
          <Badges :classification="event.classifications[0]" v-if="event.classifications?.length" />
        </div>
      </UCard>
    </template>
    <template v-else>
      <div class="col-span-full text-center text-gray-400 py-8">Nessun evento trovato.</div>
    </template>
  </div>

  <div class="flex justify-center border-t border-default pt-4">
    <UPagination :items-per-page="20" :total="data?.pagination?.totalElements" @update:page="p => page = p - 1" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath
})

const page = ref(0)
const input = shallowRef('')
const keyword = shallowRef('')
watchDebounced(
  input,
  (val) => {
    keyword.value = val
    page.value = 0
  },
  { debounce: 500, maxWait: 1000 },
)

const { attractionId, subGenreId, venueId } = useRoute<'/events/'>().query

const { data, status } = await useFetch('/api/events', {
  watch: [page, keyword],
  params: { page, keyword, attractionId, subGenreId, venueId },
})

function formatDate (start?: any) {
  if (!start) return ''
  if (start.dateTBD) return 'TBD'
  if (start.dateTBA) return 'TBA'
  if (!start.dateTime) return ''
  return new Date(start.dateTime).toLocaleString('it-IT', {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

function formatSales (sales?: any) {
  if (!sales) return ''
  if (sales.startTBD) return 'TBD'
  if (sales.startTBA) return 'TBA'
  if (!sales.startDateTime) return ''
  return 'In vendita da ' + new Date(sales.startDateTime).toLocaleString('it-IT', {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}
</script>