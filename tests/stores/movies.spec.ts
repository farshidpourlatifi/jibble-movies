import { describe, it, expect, beforeEach } from 'vitest'
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
  })
}) 