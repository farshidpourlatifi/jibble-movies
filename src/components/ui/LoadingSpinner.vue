<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div 
    class="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"
    data-testid="loading-spinner"
  >
  </div>
</template> 