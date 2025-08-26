<template>
  <div class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div>TICKETS</div>
    <div class="space-x-4">
      <NuxtLink to="/" class="pb-0.75 border-b-2 border-transparent hover:border-white transition"
        :class="{ 'border-white': $route.path === '/' }">Eventi</NuxtLink>
      <NuxtLink to="/attractions" class="pb-0.75 border-b-2 border-transparent hover:border-white transition"
        :class="{ 'border-white': $route.path === '/attractions' }">Artisti</NuxtLink>
      <NuxtLink to="/classifications" class="pb-0.75 border-b-2 border-transparent hover:border-white transition"
        :class="{ 'border-white': $route.path === '/classifications' }">Generi</NuxtLink>
      <NuxtLink to="/venues" class="pb-0.75 border-b-2 border-transparent hover:border-white transition"
        :class="{ 'border-white': $route.path === '/venues' }">Luoghi</NuxtLink>
    </div>
  </div>
</template>