import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieSearch from '@/components/movies/MovieSearch.vue'
import { useMovieStore } from '@/stores/movies'

describe('MovieSearch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should update search query on input', async () => {
    const wrapper = mount(MovieSearch)
    const input = wrapper.find('input')
    
    await input.setValue('test query')
    expect(input.element.value).toBe('test query')
  })

  it('should debounce search calls', async () => {
    const store = useMovieStore()
    const searchSpy = vi.spyOn(store, 'setSearch')
    
    const wrapper = mount(MovieSearch)
    const input = wrapper.find('input')
    
    await input.setValue('t')
    await input.setValue('te')
    await input.setValue('tes')
    await input.setValue('test')
    
    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350))
    
    // Should only be called once due to debounce
    expect(searchSpy).toHaveBeenCalledTimes(1)
    expect(searchSpy).toHaveBeenLastCalledWith('test')
  })
}) 