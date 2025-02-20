export interface Movie {
  Title: string
  Year: number
  imdbID: string
}

export interface MovieApiResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Movie[]
}

export interface MovieState {
  movies: Movie[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  searchQuery: string
} 