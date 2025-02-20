<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'
import MovieCard from './MovieCard.vue'
import MoviePagination from './MoviePagination.vue'

const store = useMovieStore()

onMounted(async () => {
  await store.fetchMovies()
})
</script>

<template>
  <div class="movie-list">
    <div v-if="store.isLoading" class="text-center py-8">
      Loading...
    </div>
    
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      {{ store.error }}
    </div>
    
    <div v-else-if="!store.hasMovies" class="text-center py-8">
      No movies found
    </div>
    
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MovieCard
          v-for="movie in store.movies"
          :key="movie.imdbID"
          :movie="movie"
        />
      </div>
      <MoviePagination />
    </template>
  </div>
</template> 