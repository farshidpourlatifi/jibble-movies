<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movies'

const store = useMovieStore()
const router = useRouter()

const pages = computed(() => {
  const current = store.currentPage
  const total = store.totalPages
  const items: (number | string)[] = []

  // If total pages is 5 or less, show all pages
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      items.push(i)
    }
    return items
  }

  // For more than 5 pages, use ellipsis
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

  // Always show last page
  items.push(total)

  return items
})

const handlePageClick = (page: number | string) => {
  if (typeof page === 'number' && page !== store.currentPage) {
    store.setPage(page, router)
  }
}
</script>

<template>
  <div 
    v-if="store.totalPages > 1" 
    class="flex justify-center mt-8 gap-2"
    data-testid="pagination"
  >
    <button
      v-for="page in pages"
      :key="page"
      class="px-3 py-1 rounded border"
      :class="{ 'bg-blue-500 text-white': page === store.currentPage }"
      @click="handlePageClick(page)"
      :data-testid="`page-${page}`"
    >
      {{ page }}
    </button>
  </div>
</template> 