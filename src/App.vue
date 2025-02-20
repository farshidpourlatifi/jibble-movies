<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <nav class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Movie Listing App</h1>
        <div class="flex gap-4">
          <RouterLink 
            to="/" 
            class="text-blue-500 hover:text-blue-700"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/favorites" 
            class="text-blue-500 hover:text-blue-700"
          >
            Favorites ({{ favoritesStore.favoritesCount }})
          </RouterLink>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
