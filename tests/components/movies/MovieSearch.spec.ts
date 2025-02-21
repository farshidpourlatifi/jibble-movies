import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieSearch from '@/components/movies/MovieSearch.vue'
import { useMovieStore } from '@/stores/movies'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn()
  }))
}))

describe('MovieSearch', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should update search query on input', async () => {
    const wrapper = mount(MovieSearch)
    const store = useMovieStore()
    const setSearchSpy = vi.spyOn(store, 'setSearch')

    const input = wrapper.find('[data-testid="search-input"]')
    await input.setValue('Batman')
    
    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350))
    
    expect(setSearchSpy).toHaveBeenCalledWith('Batman', expect.anything())
  })

  it('should show loading spinner while searching', async () => {
    const wrapper = mount(MovieSearch)
    const store = useMovieStore()
    store.isLoading = true

    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-testid="loading-spinner"]').exists()).toBe(true)
  })

  it('should clear search input when clicking clear button', async () => {
    const wrapper = mount(MovieSearch)
    const input = wrapper.find<HTMLInputElement>('[data-testid="search-input"]')
    
    await input.setValue('Batman')
    await wrapper.find('[data-testid="clear-search"]').trigger('click')
    
    expect(input.element.value).toBe('')
  })
}) 