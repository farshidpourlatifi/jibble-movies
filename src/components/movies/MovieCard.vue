<script setup lang="ts">
import type { Movie } from '@/types/movie'

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ movie.Title }}</h3>
      <div class="flex justify-between text-sm text-gray-600">
        <span>Year: {{ movie.Year }}</span>
        <span>IMDB: {{ movie.imdbID }}</span>
      </div>
    </div>
  </div>
</template> 