<template>
  <div class="flex justify-between p-3">
    <div>{{ data?.pagination.totalElements }} luoghi trovati</div>
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
import type { Venue } from '~~/types'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

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

const { data, status } = await useFetch('/api/venues', {
  watch: [page, keyword],
  params: { page, keyword },
})

const columns: TableColumn<Venue>[] = [
  {
    accessorKey: 'images',
    header: 'Immagine',
    cell: ({ getValue }) => {
      const a = getValue<Venue['images']>()
      const first = a?.find(img => img.width >= 300 && img.width <= 600) || a?.[0]
      return first
        ? h(NuxtImg, { src: first.url })
        : null
    }
  },
  // { accessorKey: 'id', },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'timezone', header: 'Fuso Orario' },
  {
    accessorKey: 'city',
    header: 'Città',
    cell: ({ row }) => { return row.getValue<Venue['city']>('city').name }
  },
  {
    accessorKey: 'state',
    header: 'Stato',
    cell: ({ row }) => {
      const val = row.getValue<Venue['state']>('state')
      return val ? [val.stateCode, val.name].filter(Boolean).join(', ') : undefined
    }
  },
  { accessorKey: 'postalCode', header: 'CAP' },
  {
    accessorKey: 'country',
    header: 'Nazione',
    cell: ({ row }) => {
      const val = row.getValue<Venue['country']>('country')
      return val.countryCode + ' - ' + val.name
    }
  },
  {
    accessorKey: 'address',
    header: 'Indirizzo',
    cell: ({ row }) => {
      const val = row.getValue<Venue['address']>('address')
      return val ? [val.line1, val.line2, val.line3].filter(Boolean).join(', ') : undefined
    }
  },
  {
    accessorKey: 'markets',
    header: 'Mercati',
    cell: ({ row }) => {
      const val = row.getValue<Venue['markets']>('markets')
      return val?.map(market => market.name).join(', ')
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

function getRowItems (row: Row<Venue>): DropdownMenuItem[] {
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
      to: `/?venueId=${row.original.id}`
    }
  ]
}
</script>