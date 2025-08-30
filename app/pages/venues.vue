<template>
  <div class="flex justify-between p-3">
    <div>{{ data?.pagination.totalElements }} luoghi trovati</div>
    <UInput v-model="input" color="warning" placeholder="Cerca" :loading="status === 'pending'" />
  </div>


  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
    <template v-if="data?.rows?.length">
      <UCard v-for="venue in data.rows" :key="venue.id"
        class="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
        <div class="aspect-video w-full mb-2 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
          <Images v-if="venue.images" :images="venue.images" />
          <!-- <div v-for="img in venue.images">
            <img :key="img.url" :src="img.url" class="object-cover w-full h-full" />
          </div> -->
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <div class="font-semibold text-lg line-clamp-2">{{ venue.name }}</div>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <div class="text-sm text-gray-500">{{ venue.city?.name }}<span v-if="venue.state?.name">, {{
                venue.state.name
                  }}</span>
              </div>
              <div class="text-xs text-gray-400">{{ venue.country?.countryCode }} - {{ venue.country?.name }}</div>
            </div>
            <UButton color="secondary" variant="soft" :to="`/?venueId=${venue.id}`">Eventi</UButton>
          </div>
        </div>
      </UCard>
    </template>
    <template v-else>
      <div class="col-span-full text-center text-gray-400 py-8">
        {{ status === 'pending' ? 'Loading...' : 'Nessun luogo trovato.' }}
      </div>
    </template>
  </div>

  <div class="flex justify-center py-4">
    <UPagination active-color="secondary" :items-per-page="20" :total="data?.pagination?.totalElements"
      @update:page="p => page = p - 1" />
  </div>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Venue } from '~~/types'

// const UDropdownMenu = resolveComponent('UDropdownMenu')
// const UButton = resolveComponent('UButton')

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

const { data, status } = await useLazyFetch('/api/venues', {
  watch: [page, keyword],
  params: { page, keyword },
})

// const columns: TableColumn<Venue>[] = [
//   {
//     accessorKey: 'images',
//     header: '',
//     meta: { class: { td: 'min-w-30' } },
//     cell: ({ getValue }) => {
//       const a = getValue<Venue['images']>()
//       const first = a?.find(img => img.width >= 300 && img.width <= 600) || a?.[0]
//       return first
//         ? h('img', { src: first.url })
//         : null
//     }
//   },
//   // { accessorKey: 'id', },
//   { accessorKey: 'name', header: 'Nome' },
//   { accessorKey: 'timezone', header: 'Fuso Orario' },
//   {
//     accessorKey: 'city',
//     header: 'Città',
//     cell: ({ row }) => { return row.getValue<Venue['city']>('city').name }
//   },
//   {
//     accessorKey: 'state',
//     header: 'Stato',
//     cell: ({ row }) => {
//       const val = row.getValue<Venue['state']>('state')
//       return val ? [val.stateCode, val.name].filter(Boolean).join(', ') : undefined
//     }
//   },
//   { accessorKey: 'postalCode', header: 'CAP' },
//   {
//     accessorKey: 'country',
//     header: 'Nazione',
//     cell: ({ row }) => {
//       const val = row.getValue<Venue['country']>('country')
//       return val.countryCode + ' - ' + val.name
//     }
//   },
//   {
//     accessorKey: 'address',
//     header: 'Indirizzo',
//     cell: ({ row }) => {
//       const val = row.getValue<Venue['address']>('address')
//       return val ? [val.line1, val.line2, val.line3].filter(Boolean).join(', ') : undefined
//     }
//   },
//   {
//     accessorKey: 'markets',
//     header: 'Mercati',
//     cell: ({ row }) => {
//       const val = row.getValue<Venue['markets']>('markets')
//       return val?.map(market => market.name).join(', ')
//     }
//   },
//   {
//     id: 'actions',
//     header: 'Azioni',
//     cell: ({ row }) => {
//       return h(
//         'div',
//         { class: 'text-right' },
//         h(
//           UDropdownMenu,
//           {
//             content: {
//               align: 'end'
//             },
//             items: getRowItems(row),
//             'aria-label': 'Actions dropdown'
//           },
//           () =>
//             h(UButton, {
//               icon: 'i-lucide-ellipsis-vertical',
//               color: 'neutral',
//               variant: 'ghost',
//               class: 'ml-auto',
//               'aria-label': 'Actions dropdown'
//             })
//         )
//       )
//     }
//   }
// ]

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