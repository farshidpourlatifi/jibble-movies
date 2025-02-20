import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

describe('Favorites Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty favorites if localStorage is empty', () => {
    const store = useFavoritesStore()
    expect(store.favorites).toEqual([])
    expect(store.favoritesCount).toBe(0)
  })

  it('should add movie to favorites', () => {
    const store = useFavoritesStore()
    const movie = {
      Title: 'Test Movie',
      Year: 2023,
      imdbID: 'tt1234567'
    }

    store.toggleFavorite(movie)
    
    expect(store.favorites).toContainEqual(movie)
    expect(store.favoritesCount).toBe(1)
    expect(store.isFavorite(movie.imdbID)).toBe(true)
  })

  it('should remove movie from favorites', () => {
    const store = useFavoritesStore()
    const movie = {
      Title: 'Test Movie',
      Year: 2023,
      imdbID: 'tt1234567'
    }

    // Add then remove
    store.toggleFavorite(movie)
    store.toggleFavorite(movie)
    
    expect(store.favorites).not.toContainEqual(movie)
    expect(store.favoritesCount).toBe(0)
    expect(store.isFavorite(movie.imdbID)).toBe(false)
  })

  it('should persist favorites to localStorage', () => {
    const store = useFavoritesStore()
    const movie = {
      Title: 'Test Movie',
      Year: 2023,
      imdbID: 'tt1234567'
    }

    store.toggleFavorite(movie)
    
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    expect(stored).toContainEqual(movie)
  })
}) 