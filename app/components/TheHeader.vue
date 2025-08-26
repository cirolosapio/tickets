<template>
  <div class="sticky top-0 z-50 flex justify-between items-center p-4 bg-gray-800 text-white">
    <div class="text-2xl font-bold tracking-wide flex items-center gap-2">
      <span class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
        🎟️ TICKETS
      </span>
    </div>
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
    <DarkButton />
  </div>
</template>