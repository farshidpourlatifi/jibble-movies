import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from '@/stores/movies'

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = useMovieStore()
    expect(store.movies).toEqual([])
    expect(store.currentPage).toBe(1)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.searchQuery).toBe('')
  })

  it('should update loading state during fetch', async () => {
    const store = useMovieStore()
    const fetchPromise = store.fetchMovies()
    expect(store.isLoading).toBe(true)
    await fetchPromise
    expect(store.isLoading).toBe(false)
  })

  it('should handle fetch errors', async () => {
    const store = useMovieStore()
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
    
    await store.fetchMovies()
    expect(store.error).toBe('Network error')
    expect(store.isLoading).toBe(false)
  })
}) 