<template>
  <div class="flex justify-end p-3">
    <UInput v-model="input" placeholder="Cerca" />
  </div>

  <UTree :items @update:model-value="onSelect" />
</template>

<script setup lang="ts">
// import { useClipboard } from '@vueuse/core'

const input = shallowRef('')
const keyword = debouncedRef(input, 500)
const { data: items, status } = await useFetch('/api/classifications', { params: { keyword }, watch: [keyword], })

// const toast = useToast()
// const { copy } = useClipboard()

async function onSelect (row: any) {
  if (!row.children) {
    // await copy(row.value)
    // toast.add({
    //   title: 'ID copiato negli appunti!',
    //   color: 'success',
    //   icon: 'i-lucide-circle-check'
    // })
    await navigateTo(`/?subGenreId=${row.value}`)
  }
}
</script>