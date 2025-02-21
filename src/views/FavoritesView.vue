<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import MovieCard from '@/components/movies/MovieCard.vue'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="favorites-view" data-testid="favorites-view">
    <h2 class="text-2xl font-bold mb-6">My Favorites</h2>
    
    <div 
      v-if="!favoritesStore.favoritesCount" 
      class="text-center py-8 text-gray-500"
      data-testid="no-favorites-message"
    >
      No favorite movies yet
    </div>
    
    <div 
      v-else 
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      data-testid="favorites-grid"
    >
      <MovieCard
        v-for="movie in favoritesStore.favorites"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>
  </div>
</template> 