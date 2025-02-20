<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { useDebounceFn } from '@vueuse/core'

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
  <div class="w-full max-w-md">
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Search movies..."
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template> 