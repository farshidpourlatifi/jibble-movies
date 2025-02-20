import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie'

interface FavoritesState {
  favorites: Movie[]
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),

  getters: {
    isFavorite: (state) => (imdbID: string) => 
      state.favorites.some(movie => movie.imdbID === imdbID),
    
    favoritesCount: (state) => state.favorites.length
  },

  actions: {
    toggleFavorite(movie: Movie) {
      const index = this.favorites.findIndex(m => m.imdbID === movie.imdbID)
      
      if (index === -1) {
        this.favorites.push(movie)
      } else {
        this.favorites.splice(index, 1)
      }
      
      // Persist to localStorage
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }
}) 