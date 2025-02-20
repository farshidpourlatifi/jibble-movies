<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movies'

const store = useMovieStore()

const pages = computed(() => {
  const current = store.currentPage
  const total = store.totalPages
  const items: (number | string)[] = []

  // Always show first page
  items.push(1)

  // Calculate range around current page
  let start = Math.max(2, current - 1)
  let end = Math.min(total - 1, current + 1)

  // Add ellipsis if needed before current range
  if (start > 2) {
    items.push('...')
  }

  // Add pages around current
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) { // Avoid duplicating first and last pages
      items.push(i)
    }
  }

  // Add ellipsis if needed after current range
  if (end < total - 1) {
    items.push('...')
  }

  // Always show last page if there is more than one page
  if (total > 1) {
    items.push(total)
  }

  return items
})

const handlePageClick = (page: number | string) => {
  if (typeof page === 'number' && page !== store.currentPage) {
    store.setPage(page)
  }
}
</script>

<template>
  <div v-if="store.totalPages > 1" class="flex justify-center gap-2 mt-8">
    <button
      v-for="page in pages"
      :key="page"
      :class="[
        'px-3 py-1 rounded',
        {
          'bg-blue-500 text-white': page === store.currentPage,
          'bg-gray-200 hover:bg-gray-300': page !== store.currentPage && page !== '...',
          'cursor-default': page === '...'
        }
      ]"
      :disabled="page === '...'"
      @click="handlePageClick(page)"
    >
      {{ page }}
    </button>
  </div>
</template> 