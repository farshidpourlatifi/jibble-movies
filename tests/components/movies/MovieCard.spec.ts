import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MovieCard from '@/components/movies/MovieCard.vue'
import { useFavoritesStore } from '@/stores/favorites'

describe('MovieCard', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia())
    
    // Clear localStorage to ensure clean state
    localStorage.clear()
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

    expect(wrapper.find('[data-testid="movie-title"]').text()).toBe('Test Movie')
    expect(wrapper.find('[data-testid="movie-year"]').text()).toBe('2023')
    expect(wrapper.find('[data-testid="movie-imdb-id"]').text()).toBe('tt1234567')
  })

  it('should toggle favorite status when heart button is clicked', async () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      }
    })

    const favoriteStore = useFavoritesStore()
    const heartButton = wrapper.find('[data-testid="favorite-button"]')
    const heartIcon = wrapper.find('[data-testid="favorite-icon"]')

    expect(favoriteStore.isFavorite(mockMovie.imdbID)).toBe(false)
    expect(heartIcon.classes()).not.toContain('text-red-500')
    
    await heartButton.trigger('click')
    expect(favoriteStore.isFavorite(mockMovie.imdbID)).toBe(true)
    expect(wrapper.find('[data-testid="favorite-icon"]').classes()).toContain('text-red-500')
  })

  it('should show tooltip with correct text for favorites', async () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie
      }
    })

    // Mock scrollHeight and clientHeight to prevent title tooltip
    const scrollHeightSpy = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
    const clientHeightSpy = vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get')
    scrollHeightSpy.mockReturnValue(24)
    clientHeightSpy.mockReturnValue(24)

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0)) // Wait for onMounted

    const favoriteStore = useFavoritesStore()
    expect(favoriteStore.isFavorite(mockMovie.imdbID)).toBe(false)

    const tooltips = wrapper.findAllComponents({ name: 'Tooltip' })
    const favoriteTooltip = tooltips[tooltips.length - 1] // Get the last tooltip (favorite button)

    expect(favoriteTooltip.props('text')).toBe('Add to favorites')
    
    await wrapper.find('[data-testid="favorite-button"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(favoriteTooltip.props('text')).toBe('Remove from favorites')

    // Clean up
    scrollHeightSpy.mockRestore()
    clientHeightSpy.mockRestore()
  })

  it('should only show title tooltip when title is truncated', async () => {
    const shortTitleMovie = {
      Title: 'Short',
      Year: 2023,
      imdbID: 'tt1234567'
    }

    const longTitleMovie = {
      Title: 'This is a very long movie title that definitely needs to be truncated because it exceeds two lines of text in the UI and should be clipped with an ellipsis',
      Year: 2023,
      imdbID: 'tt1234567'
    }

    // Mock for truncated title
    const longTitleSpy = vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
    const longTitleClientSpy = vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get')
    
    longTitleSpy.mockReturnValue(48)
    longTitleClientSpy.mockReturnValue(24)

    const wrapperLong = mount(MovieCard, {
      props: {
        movie: longTitleMovie
      }
    })

    // Mock for non-truncated title
    longTitleSpy.mockReturnValue(24)
    longTitleClientSpy.mockReturnValue(24)

    const wrapperShort = mount(MovieCard, {
      props: {
        movie: shortTitleMovie
      }
    })

    await wrapperLong.vm.$nextTick()
    await wrapperShort.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0)) // Wait for onMounted

    // Long title should have tooltip
    const longTitleTooltips = wrapperLong.findAllComponents({ name: 'Tooltip' })
    expect(longTitleTooltips).toHaveLength(2) // One for title, one for favorite button

    // Short title should not have tooltip
    const shortTitleTooltips = wrapperShort.findAllComponents({ name: 'Tooltip' })
    expect(shortTitleTooltips).toHaveLength(1) // Only favorite button tooltip

    // Clean up
    longTitleSpy.mockRestore()
    longTitleClientSpy.mockRestore()
  })
}) 