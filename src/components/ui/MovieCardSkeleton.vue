<script setup lang="ts">
import { HeartIcon } from '@/components/ui/icons'
</script>

<template>
  <div 
    class="h-full min-h-[126px] bg-gray-50 rounded-lg border border-gray-200 p-4"
    data-testid="movie-skeleton"
  >
    <div class="h-full flex flex-col">
      <div class="flex justify-between items-start gap-4">
        <div class="flex-1">
          <div class="h-[22px] bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-[22px] bg-gray-200 rounded w-3/4"></div>
        </div>
        <div class="p-2">
          <HeartIcon class="w-5 h-5 text-gray-200" />
        </div>
      </div>
      <div class="mt-auto pt-4 flex items-center gap-2">
        <div class="h-[16px] bg-gray-200 rounded w-12"></div>
        <div class="h-[16px] bg-gray-200 rounded w-1"></div>
        <div class="h-[16px] bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
</template> 