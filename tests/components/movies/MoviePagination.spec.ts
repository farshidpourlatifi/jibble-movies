import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MoviePagination from '@/components/movies/MoviePagination.vue'
import { useMovieStore } from '@/stores/movies'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn()
  }))
}))

describe('MoviePagination', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should not render pagination when total pages is 1', () => {
    const store = useMovieStore()
    store.totalPages = 1

    const wrapper = mount(MoviePagination)
    expect(wrapper.find('[data-testid="pagination"]').exists()).toBe(false)
  })

  it('should render correct number of pages', () => {
    const store = useMovieStore()
    store.totalPages = 3
    store.currentPage = 1

    const wrapper = mount(MoviePagination)
    const pages = wrapper.findAll('[data-testid^="page-"]')
    expect(pages).toHaveLength(3)
  })

  it('should highlight current page', () => {
    const store = useMovieStore()
    store.totalPages = 3
    store.currentPage = 2

    const wrapper = mount(MoviePagination)
    const currentPage = wrapper.find('[data-testid="page-2"]')
    expect(currentPage.classes()).toContain('bg-blue-500')
  })

  it('should call setPage when clicking a page', async () => {
    const store = useMovieStore()
    store.totalPages = 3
    store.currentPage = 1
    const setPageSpy = vi.spyOn(store, 'setPage')

    const wrapper = mount(MoviePagination)
    await wrapper.find('[data-testid="page-2"]').trigger('click')

    expect(setPageSpy).toHaveBeenCalledWith(2, expect.anything())
  })

  it('should show ellipsis for larger page ranges', async () => {
    const store = useMovieStore()
    store.totalPages = 10
    store.currentPage = 5
    
    const wrapper = mount(MoviePagination)
    const buttons = wrapper.findAll('button')
    
    // Should show: 1, ..., 4, 5, 6, ..., 10
    expect(buttons).toHaveLength(7)
    expect(buttons[0].text()).toBe('1')
    expect(buttons[1].text()).toBe('...')
    expect(buttons[2].text()).toBe('4')
    expect(buttons[3].text()).toBe('5')
    expect(buttons[4].text()).toBe('6')
    expect(buttons[5].text()).toBe('...')
    expect(buttons[6].text()).toBe('10')
  })
}) 