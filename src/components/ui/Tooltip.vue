<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}>()

const isVisible = ref(false)
</script>

<template>
  <div class="relative inline-block" data-testid="tooltip">
    <div @mouseenter="isVisible = true" @mouseleave="isVisible = false">
      <slot></slot>
    </div>
    <div 
      v-if="isVisible"
      class="absolute z-10 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-sm whitespace-nowrap"
      :class="{
        '-top-8 left-1/2 -translate-x-1/2 transform': position === 'top' || !position,
        '-bottom-8 left-1/2 -translate-x-1/2 transform': position === 'bottom',
        'left-full top-1/2 -translate-y-1/2 ml-2 transform': position === 'right',
        'right-full top-1/2 -translate-y-1/2 mr-2 transform': position === 'left'
      }"
      data-testid="tooltip-content"
    >
      <div class="relative">
        {{ text }}
        <div 
          class="absolute w-2 h-2 bg-gray-900 transform rotate-45"
          :class="{
            '-bottom-1 left-1/2 -translate-x-1/2': position === 'top' || !position,
            '-top-1 left-1/2 -translate-x-1/2': position === 'bottom',
            '-left-1 top-1/2 -translate-y-1/2': position === 'right',
            '-right-1 top-1/2 -translate-y-1/2': position === 'left'
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 