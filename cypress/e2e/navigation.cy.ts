describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate between home and favorites', () => {
    // Check home page
    cy.url().should('include', '/')
    cy.contains('Movie Listing App').should('be.visible')

    // Go to favorites
    cy.contains('Favorites').click()
    cy.url().should('include', '/favorites')

    // Go back home
    cy.contains('Home').click()
    cy.url().should('include', '/')
  })

  it('should show active navigation state', () => {
    cy.contains('Home').should('have.class', 'text-blue-700')
    cy.contains('Favorites').click()
    cy.contains('Favorites').should('have.class', 'text-blue-700')
  })
}) 