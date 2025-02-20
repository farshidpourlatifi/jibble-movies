/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    searchMovies(query: string): Chainable<void>
    toggleFavorite(movieTitle: string): Chainable<void>
  }
}

// Add custom commands here
Cypress.Commands.add('searchMovies', (query: string) => {
  cy.get('input[type="search"]').clear().type(query)
  // Wait for debounce
  cy.wait(300)
})

Cypress.Commands.add('toggleFavorite', (movieTitle: string) => {
  cy.contains('.bg-white', movieTitle)
    .find('button')
    .click()
})

export {} 