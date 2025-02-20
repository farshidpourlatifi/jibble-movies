describe('Favorites', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Batman&page=1',
      { fixture: 'movies.json' }
    ).as('searchMovies')

    cy.visit('/')
    cy.searchMovies('Batman')
    cy.wait('@searchMovies')
  })

  it('should add and remove movies from favorites', () => {
    // Add to favorites
    cy.contains('.bg-white', 'Batman')
      .find('button')
      .click()
    
    // Navigate to favorites
    cy.contains('Favorites').click()
    cy.url().should('include', '/favorites')
    cy.contains('Batman').should('exist')

    // Remove from favorites and verify empty state
    cy.contains('.bg-white', 'Batman')
      .find('button')
      .click()
    
    // Wait for the empty state to appear
    cy.contains('No favorites yet').should('be.visible')
  })

  it('should persist favorites after page reload', () => {
    cy.toggleFavorite('Batman')
    cy.reload()
    cy.contains('Favorites (1)').should('exist')
  })
}) 