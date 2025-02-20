<script setup lang="ts">
import MovieList from '@/components/movies/MovieList.vue'
import MovieSearch from '@/components/movies/MovieSearch.vue'
</script>

<template>
  <div class="home-view">
    <MovieSearch class="mb-8" />
    <MovieList />
  </div>
</template> 