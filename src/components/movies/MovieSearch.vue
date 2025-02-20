<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { useDebounceFn } from '@vueuse/core'
import SearchInput from '@/components/ui/SearchInput.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const store = useMovieStore()
const searchQuery = ref('')

const debouncedSearch = useDebounceFn((query: string) => {
  store.setSearch(query)
}, 300)

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})
</script>

<template>
  <div class="relative">
    <SearchInput
      v-model="searchQuery"
      placeholder="Search movies..."
      class="w-full max-w-md"
    />
    <div 
      v-if="store.isLoading" 
      class="absolute right-12 top-1/2 -translate-y-1/2"
    >
      <LoadingSpinner size="sm" />
    </div>
  </div>
</template> 