describe('Pergola Landing Page', () => {
  it('loads and shows the app entry point', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.title().should('not.be.empty')
    cy.get('#root', { timeout: 10000 }).should('exist')
    cy.screenshot('landing-loaded')
  })
})
