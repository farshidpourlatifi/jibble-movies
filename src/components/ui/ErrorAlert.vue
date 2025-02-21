<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div 
    class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
    data-testid="error-alert"
  >
    <span class="block sm:inline">{{ message }}</span>
  </div>
</template> 