<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { Movie } from '@/types/movie'
import { useFavoritesStore } from '@/stores/favorites'
import Tooltip from '@/components/ui/Tooltip.vue'
import { HeartIcon, HeartFilledIcon } from '@/components/ui/icons'

const props = defineProps<{
  movie: Movie
}>()

const favoritesStore = useFavoritesStore()
const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.imdbID))
const titleRef = ref<HTMLHeadingElement | null>(null)
const isTitleTruncated = ref(false)

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.movie)
}

onMounted(() => {
  const titleElement = titleRef.value
  if (titleElement) {
    isTitleTruncated.value = titleElement.scrollHeight > titleElement.clientHeight
  }
})
</script>

<template>
  <div class="group h-full bg-gray-50 rounded-lg border border-gray-200" data-testid="movie-card">
    <div class="p-4 h-full flex flex-col">
      <div class="flex justify-between items-start gap-4">
        <Tooltip 
          v-if="isTitleTruncated"
          :text="movie.Title"
        >
          <h3 
            ref="titleRef"
            class="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors cursor-default"
            data-testid="movie-title"
          >
            {{ movie.Title }}
          </h3>
        </Tooltip>
        <h3 
          v-else
          ref="titleRef"
          class="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors"
          data-testid="movie-title"
        >
          {{ movie.Title }}
        </h3>
        <Tooltip :text="isFavorite ? 'Remove from favorites' : 'Add to favorites'">
          <button
            @click.stop="toggleFavorite"
            class="p-2 rounded-full hover:bg-white transition-colors"
            data-testid="favorite-button"
          >
            <component
              :is="isFavorite ? HeartFilledIcon : HeartIcon"
              class="w-5 h-5"
              :class="isFavorite ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'"
              data-testid="favorite-icon"
            />
          </button>
        </Tooltip>
      </div>
      <div class="mt-auto pt-4 flex items-center gap-2 text-sm text-gray-600">
        <span data-testid="movie-year">{{ movie.Year }}</span>
        <span class="text-gray-400">•</span>
        <span data-testid="movie-imdb-id" class="text-xs text-gray-500">{{ movie.imdbID }}</span>
      </div>
    </div>
  </div>
</template> 