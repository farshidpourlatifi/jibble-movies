<script setup lang="ts">
import MovieList from '@/components/movies/MovieList.vue'
import MovieSearch from '@/components/movies/MovieSearch.vue'
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4">Movie Listing App</h1>
      <MovieSearch />
    </header>
    <main>
      <MovieList />
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
