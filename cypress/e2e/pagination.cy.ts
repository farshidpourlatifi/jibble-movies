describe('Pagination', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Batman&page=1',
      { fixture: 'movies.json' }
    ).as('page1')

    cy.intercept(
      'GET',
      'https://jsonmock.hackerrank.com/api/movies/search/?Title=Batman&page=2',
      {
        page: 2,
        per_page: 10,
        total: 20,
        total_pages: 2,
        data: [
          {
            "Title": "Batman: The Dark Knight Returns",
            "Year": "2012",
            "imdbID": "tt2313197"
          }
        ]
      }
    ).as('page2')

    cy.visit('/')
    cy.get('[data-testid="search-input"]').type('Batman')
    cy.wait('@page1')
  })

  it('should navigate through pages', () => {
    // Check first page
    cy.get('[data-testid="movie-list"]').should('exist')
    cy.url().should('include', 'q=Batman')
    
    // Go to next page
    cy.get('[data-testid="page-2"]').click()
    cy.wait('@page2')
    cy.url().should('include', 'page=2')
    cy.get('[data-testid="movie-list"]').should('exist')
    
    // Go back to first page
    cy.get('[data-testid="page-1"]').click()
    cy.wait('@page1')
    cy.url().should('include', 'q=Batman')
  })

  it('should maintain search query when changing pages', () => {
    cy.get('[data-testid="page-2"]').click()
    cy.wait('@page2')
    cy.url().should('include', 'Batman')
    cy.url().should('include', 'page=2')
  })
}) 