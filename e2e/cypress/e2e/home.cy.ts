/**
 * Garden home — glass shortcuts and background painting credit.
 */

const GARDEN_ID = 'Wurzelwerk';

const visitDe = (path: string) =>
  cy.visit(`/${GARDEN_ID}/${path}`, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem('i18nextLng', 'de');
    },
  });

describe('Garden home', () => {
  it('shows glass shortcuts to main features', () => {
    visitDe('home');
    cy.get('[data-testid="home-shortcuts"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-testid="home-shortcut-map"]').should('be.visible').and('have.attr', 'href', `/${GARDEN_ID}/map`);
    cy.get('[data-testid="home-shortcut-plants"]').should('be.visible');
    cy.get('[data-testid="home-shortcut-watering"]').should('be.visible');
    cy.get('[data-testid="weather-compact"]', { timeout: 15000 })
      .should('be.visible')
      .and('have.attr', 'data-latitude')
      .and('not.equal', '52.52');
    cy.get('[data-testid="weather-compact"]').should('not.contain.text', 'Wurzelwerk');
    cy.get('[data-testid="weather-compact"]', { timeout: 15000 }).should('contain.text', 'Dresden');
    cy.screenshot('home-shortcuts');
  });

  it('opens painting focus with artist link on credit click', () => {
    visitDe('home');
    cy.get('[data-testid="painting-credit"]', { timeout: 15000 }).click();
    cy.get('[data-testid="painting-focus-active"]').should('exist');
    cy.get('[data-testid="home-shortcuts"]').should('not.be.visible');
    cy.get('[data-testid="painting-artist-link"]')
      .should('be.visible')
      .and('have.attr', 'href', 'http://www.joachim-tilsch.de/')
      .and('have.attr', 'target', '_blank');
    cy.screenshot('home-painting-focus');
    cy.get('[data-testid="painting-focus-close"]').should('be.visible').click();
    cy.get('[data-testid="painting-focus-active"]').should('not.exist');
    cy.get('[data-testid="home-shortcuts"]').should('be.visible');
  });
});