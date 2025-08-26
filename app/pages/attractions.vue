<template>
  <div class="flex justify-between p-3">
    <div>{{ data?.pagination.totalElements }} artisti trovati</div>
    <UInput v-model="input" color="warning" placeholder="Cerca" />
  </div>


  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
    <template v-if="data?.rows?.length">
      <UCard v-for="attraction in data.rows" :key="attraction.id"
        class="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
        <div class="aspect-video w-full mb-2 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
          <Images v-if="attraction.images" :images="attraction.images" />
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="font-semibold text-lg line-clamp-2">{{ attraction.name }}</div>
          <div class="flex justify-between mt-1">
            <Badges v-if="attraction.classifications[0]" :classification="attraction.classifications[0]" />

            <UButton size="xs" color="secondary" variant="soft" :to="`/?attractionId=${attraction.id}`">Eventi</UButton>
          </div>
        </div>
      </UCard>
    </template>
    <template v-else>
      <div class="col-span-full text-center text-gray-400 py-8">Nessun artista trovato.</div>
    </template>
  </div>

  <div class="flex justify-center border-t border-default pt-4">
    <UPagination :items-per-page="20" :total="data?.pagination?.totalElements" @update:page="p => page = p - 1" />
  </div>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Attraction } from '~~/types'
// import { useClipboard } from '@vueuse/core'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

// const toast = useToast()
// const { copy } = useClipboard()

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

const { data, status } = await useFetch('/api/attractions', {
  watch: [page, keyword],
  params: { page, keyword },
})

const columns: TableColumn<Attraction>[] = [
  {
    accessorKey: 'images',
    header: '',
    meta: { class: { td: 'min-w-30' } },
    cell: ({ getValue }) => {
      const a = getValue<Attraction['images']>()
      const first = a?.find(img => img.width >= 300 && img.width <= 600) || a?.[0]
      return first
        ? h('img', { src: first.url })
        : null
    }
  },
  // { accessorKey: 'id', },
  // { accessorKey: 'locale', },
  // { accessorKey: '_links', },
  { accessorKey: 'name', header: 'Nome' },
  {
    accessorKey: 'genre',
    header: 'Genere',
    cell: ({ row }) => {
      const val = row.original.classifications[0]?.genre?.name
      return val === 'Non definito' ? undefined : val
    }
  },
  {
    accessorKey: 'subGenre',
    header: 'Sotto Genere',
    cell: ({ row }) => {
      const val = row.original.classifications[0]?.subGenre?.name
      return val === 'Non definito' ? undefined : val
    }
  },
  {
    id: 'actions',
    header: 'Azioni',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

function getRowItems (row: Row<Attraction>): DropdownMenuItem[] {
  return [
    // {
    //   type: 'label',
    //   label: 'Azioni',
    // },
    // {
    //   label: 'Copia ID attrazione',
    //   async onSelect () {
    //     await copy(row.original.id)

    //     toast.add({
    //       title: 'ID copiato negli appunti!',
    //       color: 'success',
    //       icon: 'i-lucide-circle-check'
    //     })
    //   }
    // },
    // {
    //   type: 'separator'
    // },
    {
      label: 'Visualizza Eventi',
      to: `/?attractionId=${row.original.id}`
    }
  ]
}
</script>