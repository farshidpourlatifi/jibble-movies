import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import MovieSearch from '@/components/movies/MovieSearch.vue'
import { useMovieStore } from '@/stores/movies'

describe('MovieSearch', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: []
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  const mountComponent = () => {
    return mount(MovieSearch, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          router
        ]
      }
    })
  }

  it('should update search query on input', async () => {
    const wrapper = mountComponent()
    const store = useMovieStore()
    
    await wrapper.find('input').setValue('test')
    expect(wrapper.find('input').element.value).toBe('test')
  })

  it('should debounce search calls', async () => {
    const wrapper = mountComponent()
    const store = useMovieStore()
    const searchSpy = vi.spyOn(store, 'setSearch')

    await wrapper.find('input').setValue('test')
    await wrapper.find('input').setValue('test2')
    await wrapper.find('input').setValue('test3')

    // Fast-forward timers to trigger debounced function
    vi.advanceTimersByTime(300)

    // Should only be called once due to debounce
    expect(searchSpy).toHaveBeenCalledTimes(1)
    expect(searchSpy).toHaveBeenLastCalledWith('test3', router)
  })
}) 