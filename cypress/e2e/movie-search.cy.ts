describe('Movie Search', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Batman&page=1',
      { fixture: 'movies.json' }
    ).as('searchMovies')

    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=xxxxxxxxxxx&page=1',
      { data: [], total_pages: 0, page: 1 }
    ).as('noResults')

    cy.visit('/')
  })

  it('should search for movies', () => {
    cy.searchMovies('Batman')
    cy.wait('@searchMovies')
    cy.contains('Batman').should('exist')
  })

  it('should show no results message when no movies found', () => {
    cy.searchMovies('xxxxxxxxxxx')
    cy.wait('@noResults')
    cy.contains('No movies found').should('be.visible')
  })

  it('should show loading state while searching', () => {
    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Superman&page=1',
      {
        delay: 1000,
        fixture: 'movies.json'
      }
    ).as('delayedSearch')

    cy.searchMovies('Superman')
    cy.get('[role="status"]').should('exist')
    cy.wait('@delayedSearch')
  })
}) 