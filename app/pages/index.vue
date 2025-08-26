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
        class="flex flex-col h-full shadow-md transition-all duration-200 bg-white/90">
        <div
          class="aspect-video w-full mb-3 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg overflow-hidden">
          <Images v-if="event.images" :images="event.images" />
        </div>
        <div class="flex-1 flex flex-col gap-2 px-2 pb-2">
          <div class="font-bold text-lg line-clamp-2 mb-1">
            {{ event.name }}
          </div>
          <div v-if="event._embedded?.venues?.[0]?.name" class="flex items-center gap-2 text-sm text-gray-400">
            <UIcon name="i-heroicons-map-pin" class="text-primary-400" />
            <span>{{ event._embedded.venues[0].name }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <UIcon name="i-heroicons-calendar-days" class="text-primary-400" />
            <span>
              <template
                v-if="event.sales?.public?.startDateTime && new Date(event.sales.public.startDateTime) > new Date()">
                {{ formatSales(event.sales.public) }}
              </template>
              <template v-else>
                {{ formatDate(event.dates?.start) }}
              </template>
            </span>
          </div>
          <div class="mt-2">
            <Badges v-if="event.classifications?.length" :classification="event.classifications[0]" />
          </div>
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