<template>
  <div class="flex justify-between p-3">
    <div>{{ data?.pagination.totalElements }} artisti trovati</div>
    <UInput v-model="input" placeholder="Cerca" />
  </div>

  <UTable ref="table" sticky :columns :data="data?.rows" class="flex-1 max-h-[70vh]" :loading="status === 'pending'" />

  <div class="flex justify-center border-t border-default pt-4">
    <UPagination :items-per-page="20" :total="data?.pagination?.totalElements" @update:page="p => page = p - 1" />
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
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
        ? h(NuxtImg, { src: first.url })
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