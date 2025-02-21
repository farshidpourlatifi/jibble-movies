<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)

const clearSearch = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <div 
    class="relative"
    :class="{ 'ring-2 ring-blue-500 ring-opacity-50': isFocused }"
  >
    <input
      type="text"
      :value="modelValue"
      @input="e => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :placeholder="placeholder"
      class="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none transition-shadow duration-200"
      autocomplete="off"
      data-testid="search-input"
    >
    <button
      v-if="modelValue"
      @click="clearSearch"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      data-testid="clear-search"
    >
      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template> 