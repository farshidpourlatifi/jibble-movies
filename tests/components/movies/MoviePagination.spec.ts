import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import MoviePagination from '@/components/movies/MoviePagination.vue'
import { useMovieStore } from '@/stores/movies'

describe('MoviePagination', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: []
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mountComponent = () => {
    return mount(MoviePagination, {
      global: {
        plugins: [router]
      }
    })
  }

  it('should not render pagination when only one page exists', () => {
    const store = useMovieStore()
    store.totalPages = 1
    
    const wrapper = mountComponent()
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('should render correct number of page buttons', async () => {
    const store = useMovieStore()
    store.totalPages = 5
    store.currentPage = 3
    
    const wrapper = mountComponent()
    const buttons = wrapper.findAll('button')
    
    // Should show: 1, 2, 3, 4, 5
    expect(buttons).toHaveLength(5)
    expect(buttons[0].text()).toBe('1')
    expect(buttons[1].text()).toBe('2')
    expect(buttons[2].text()).toBe('3')
    expect(buttons[3].text()).toBe('4')
    expect(buttons[4].text()).toBe('5')
  })

  it('should call setPage when clicking a page button', async () => {
    const store = useMovieStore()
    store.totalPages = 3
    store.currentPage = 1
    
    const wrapper = mountComponent()
    const pageButton = wrapper.findAll('button')[1] // Second page button
    
    await pageButton.trigger('click')
    expect(store.currentPage).toBe(2)
  })

  // Add a new test for when we actually need ellipsis
  it('should show ellipsis for larger page ranges', async () => {
    const store = useMovieStore()
    store.totalPages = 10
    store.currentPage = 5
    
    const wrapper = mountComponent()
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