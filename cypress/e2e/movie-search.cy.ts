describe('Movie Search', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Batman&page=1',
      { fixture: 'movies.json' }
    ).as('searchMovies')

    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=ThisMovieDoesNotExist123456789*',
      { 
        data: [], 
        total_pages: 0, 
        page: 1,
        total: 0,
        per_page: 10 
      }
    ).as('noResults')

    cy.visit('/')
  })

  it('should search for movies', () => {
    cy.get('[data-testid="search-input"]').type('Batman')
    cy.wait('@searchMovies')
    cy.get('[data-testid="movie-list"]').should('exist')
    cy.get('[data-testid="movie-title"]').should('contain', 'Batman')
  })

  it('should show no results message when no movies found', () => {
    cy.get('[data-testid="search-input"]').type('ThisMovieDoesNotExist123456789')
    cy.wait('@noResults')
    cy.get('[data-testid="no-results"]').should('be.visible')
  })

  it('should show loading state while searching', () => {
    cy.intercept('GET', 'https://jsonmock.hackerrank.com/api/movies/search/**', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000)
      })
    }).as('searchRequest')

    cy.get('[data-testid="search-input"]').type('Batman')
    cy.get('[data-testid="loading-grid"]').should('exist')
    cy.get('[data-testid="movie-skeleton"]').should('exist')
    cy.wait('@searchRequest')
  })
}) 