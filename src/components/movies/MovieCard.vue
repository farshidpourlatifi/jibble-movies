<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/types/movie'
import { useFavoritesStore } from '@/stores/favorites'
import Tooltip from '@/components/ui/Tooltip.vue'

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
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold">{{ movie.Title }}</h3>
        <div class="relative">
          <Tooltip :text="isFavorite ? 'Remove from favorites' : 'Add to favorites'">
            <button
              @click="toggleFavorite"
              class="text-2xl focus:outline-none transition-colors"
              :class="{ 'text-yellow-500': isFavorite, 'text-gray-300 hover:text-gray-400': !isFavorite }"
            >
              ★
            </button>
          </Tooltip>
        </div>
      </div>
      <div class="flex justify-between text-sm text-gray-600">
        <span>Year: {{ movie.Year }}</span>
        <span>IMDB: {{ movie.imdbID }}</span>
      </div>
    </div>
  </div>
</template> 