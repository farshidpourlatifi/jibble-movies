import { defineStore } from 'pinia'
import type { Movie, MovieState } from '@/types/movie'

export const useMovieStore = defineStore('movies', {
  state: (): MovieState => ({
    movies: [],
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
    searchQuery: ''
  }),

  actions: {
    async fetchMovies(page: number = 1, title: string = '') {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await fetch(
          `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
        )
        const data = await response.json()
        
        this.movies = data.data
        this.totalPages = data.total_pages
        this.currentPage = data.page
      } catch (error) {
        this.error = 'Failed to fetch movies'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}) 