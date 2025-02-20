<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'

const store = useMovieStore()

onMounted(async () => {
  await store.fetchMovies()
})
</script>

<template>
  <div class="movie-list">
    <div v-if="store.isLoading">Loading...</div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <div v-else>
      <div v-for="movie in store.movies" :key="movie.imdbID">
        {{ movie.Title }} ({{ movie.Year }})
      </div>
    </div>
  </div>
</template> 