<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/types/movie'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps<{
  movie: Movie
}>()

const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.imdbID))

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.movie)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold">{{ movie.Title }}</h3>
        <button
          @click="toggleFavorite"
          class="text-2xl focus:outline-none"
          :class="{ 'text-yellow-500': isFavorite, 'text-gray-300': !isFavorite }"
        >
          ★
        </button>
      </div>
      <div class="flex justify-between text-sm text-gray-600">
        <span>Year: {{ movie.Year }}</span>
        <span>IMDB: {{ movie.imdbID }}</span>
      </div>
    </div>
  </div>
</template> 