import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieCard from '@/components/movies/MovieCard.vue'
import { useFavoritesStore } from '@/stores/favorites'

describe('MovieCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockMovie = {
    Title: 'Test Movie',
    Year: 2023,
    imdbID: 'tt1234567'
  }

  it('should render movie information correctly', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      }
    })

    expect(wrapper.text()).toContain('Test Movie')
    expect(wrapper.text()).toContain('2023')
    expect(wrapper.text()).toContain('tt1234567')
  })

  it('should toggle favorite status when star is clicked', async () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      }
    })

    const favoriteStore = useFavoritesStore()
    const starButton = wrapper.find('button')

    expect(favoriteStore.isFavorite(mockMovie.imdbID)).toBe(false)
    
    await starButton.trigger('click')
    expect(favoriteStore.isFavorite(mockMovie.imdbID)).toBe(true)
    
    await starButton.trigger('click')
    expect(favoriteStore.isFavorite(mockMovie.imdbID)).toBe(false)
  })

  it('should show filled star when movie is favorite', async () => {
    const favoriteStore = useFavoritesStore()
    favoriteStore.toggleFavorite(mockMovie)

    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      }
    })

    const starButton = wrapper.find('button')
    expect(starButton.classes()).toContain('text-yellow-500')
  })
}) 