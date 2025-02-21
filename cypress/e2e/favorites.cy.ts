describe('Favorites', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Batman&page=1',
      { fixture: 'movies.json' }
    ).as('searchMovies')

    cy.visit('/')
    cy.get('[data-testid=search-input]').type('Batman')
    cy.wait('@searchMovies')
    cy.contains('Batman').should('exist')
  })

  it('should add and remove movies from favorites', () => {
    // Add to favorites
    cy.get('[data-testid="favorite-button"]').first().click()
    cy.get('[data-testid="favorite-icon"]').should('have.class', 'text-red-500')

    // Go to favorites page
    cy.contains('Favorites').click()
    cy.url().should('include', '/favorites')
    cy.get('[data-testid="movie-title"]').should('contain', 'Batman')

    // Remove from favorites
    cy.get('[data-testid="favorite-button"]').first().click()
    cy.get('[data-testid="no-results"]').should('be.visible')
  })

  it('should persist favorites after page reload', () => {
    cy.get('button[class*="rounded-full"]').first().click()
    cy.get('svg[class*="text-red-500"]').should('exist')
    cy.reload()
    cy.contains('Batman').should('exist')
  })
}) 