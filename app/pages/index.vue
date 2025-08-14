<template>
  <div class="flex justify-between p-3">
    <div>{{ data?.pagination.totalElements }} eventi trovati</div>
    <UInput v-model="input" placeholder="Cerca" />
  </div>
  <UTable ref="table" sticky :columns :data="data?.rows" class="flex-1 max-h-[70vh]" :loading="status === 'pending'" />

  <div class="flex justify-center border-t border-default pt-4">
    <UPagination :items-per-page="20" :total="data?.pagination?.totalElements" @update:page="p => page = p - 1" />
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import type { TableColumn } from '@nuxt/ui'
import type { Eventt } from '~~/types'

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

const columns: TableColumn<Eventt>[] = [
  {
    accessorKey: 'images',
    header: '',
    meta: { class: { td: 'min-w-30' } },
    cell: ({ getValue }) => {
      const a = getValue<Eventt['images']>()
      const first = a?.find(img => img.width >= 300 && img.width <= 600) || a?.[0]
      return first
        ? h(NuxtImg, { src: first.url })
        : null
    }
  },
  // {
  //   accessorKey: 'seatmap',
  //   cell: ({ getValue }) => {
  //     const a = getValue<Eventt['seatmap']>()
  //     return a?.staticUrl
  //       ? h(NuxtImg, { src: a.staticUrl })
  //       : null
  //   }
  // },
  // { accessorKey: 'id', },
  { accessorKey: 'name', header: 'Nome' },
  {
    accessorKey: 'sales',
    header: 'In Venidita da',
    cell: (row) => {
      const sales = row.getValue<Eventt['sales']>().public
      if (sales.startTBD) return 'TBD'
      if (sales.startTBA) return 'TBA'
      return new Date(sales.startDateTime).toLocaleString('it-IT', {
        year: 'numeric',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'dates',
    header: 'Data',
    cell: (row) => {
      const dates = row.getValue<Eventt['dates']>().start
      if (dates.dateTBD) return 'TBD'
      if (dates.dateTBA) return 'TBA'
      return new Date(dates.dateTime).toLocaleString('it-IT', {
        year: 'numeric',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'genre',
    header: 'Genere',
    cell: ({ row }) => {
      const val = row.original.classifications[0]?.genre?.name
      return val === 'Undefined' ? undefined : val
    }
  },
  {
    accessorKey: 'subGenre',
    header: 'Sotto Genere',
    cell: ({ row }) => {
      const val = row.original.classifications[0]?.subGenre?.name
      return val === 'Undefined' ? undefined : val
    }
  },
  // {
  //   accessorKey: '_embedded',
  //   cell: row => {
  //     const v = row.getValue<Eventt['_embedded']>()
  //     console.log('_embedded ~ v:', v)
  //   }
  // },
]
</script>