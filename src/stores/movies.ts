import { defineStore } from 'pinia'
import type { Movie, MovieState } from '@/types/movie'

export const useMovieStore = defineStore('movies', {
  state: (): MovieState => ({
    movies: [],
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
    searchQuery: '',
  }),

  getters: {
    hasMovies: (state) => state.movies.length > 0,
    totalMovies: (state) => state.movies.length,
  },

  actions: {
    async fetchMovies(page: number = 1, title: string = '') {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await fetch(
          `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }

        const data = await response.json()
        
        this.movies = data.data
        this.totalPages = data.total_pages
        this.currentPage = data.page
        this.searchQuery = title
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch movies'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    setPage(page: number) {
      this.currentPage = page
      return this.fetchMovies(page, this.searchQuery)
    },

    setSearch(query: string) {
      this.searchQuery = query
      this.currentPage = 1
      return this.fetchMovies(1, query)
    }
  }
}) 