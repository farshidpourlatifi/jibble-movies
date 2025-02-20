import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FavoritesView from '@/views/FavoritesView.vue'
import { useFavoritesStore } from '@/stores/favorites'

describe('FavoritesView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should show empty state when no favorites', () => {
    const wrapper = mount(FavoritesView)
    expect(wrapper.text()).toContain('No favorite movies yet')
  })

  it('should display favorite movies', async () => {
    const store = useFavoritesStore()
    const movie = {
      Title: 'Test Movie',
      Year: 2023,
      imdbID: 'tt1234567'
    }
    
    store.toggleFavorite(movie)
    
    const wrapper = mount(FavoritesView)
    expect(wrapper.text()).toContain('Test Movie')
    expect(wrapper.text()).toContain('2023')
  })
}) 