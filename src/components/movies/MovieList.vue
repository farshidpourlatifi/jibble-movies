<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movies'
import MovieCard from './MovieCard.vue'
import MoviePagination from './MoviePagination.vue'
import MovieCardSkeleton from '@/components/ui/MovieCardSkeleton.vue'
import ErrorAlert from '@/components/ui/ErrorAlert.vue'

const store = useMovieStore()
const router = useRouter()

onMounted(async () => {
  await store.fetchMovies(1, '', router)
})
</script>

<template>
  <div class="movie-list" data-testid="movie-list">
    <ErrorAlert
      v-if="store.error"
      :message="store.error"
      class="mb-8"
      data-testid="error-alert"
    />
    
    <div 
      v-if="store.isLoading" 
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      data-testid="loading-grid"
    >
      <MovieCardSkeleton v-for="n in 10" :key="n" />
    </div>
    
    <div 
      v-else-if="!store.hasMovies" 
      class="text-center py-12 bg-gray-50 rounded-lg border border-gray-200"
      data-testid="no-results"
    >
      <svg 
        class="mx-auto h-12 w-12 text-gray-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No movies found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
    </div>
    
    <template v-else>
      <div 
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
        data-testid="movies-grid"
      >
        <TransitionGroup name="fade" appear>
          <MovieCard
            v-for="movie in store.movies"
            :key="movie.imdbID"
            :movie="movie"
          />
        </TransitionGroup>
      </div>
      <MoviePagination />
    </template>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}
</style> 