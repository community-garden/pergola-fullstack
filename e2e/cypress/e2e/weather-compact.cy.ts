/** Requires Storybook on the host at http://localhost:6006 */
const STORYBOOK = 'http://127.0.0.1:6006';

describe('WeatherCompact (Storybook)', () => {
  beforeEach(() => {
    cy.visit(
      `${STORYBOOK}/iframe.html?id=weather-weathercompact--default&globals=locale:de`,
    );
  });

  it('shows compact weather with German labels', () => {
    cy.contains('Wurzelwerk', { timeout: 15000 }).should('be.visible');
    cy.contains('22°C').should('be.visible');
    cy.contains('Sonnenaufgang').should('be.visible');
    cy.contains('Sonnenuntergang').should('be.visible');
    cy.contains('Gefühlt').should('be.visible');
    cy.contains('Luftfeuchte').should('be.visible');
    cy.get('body').then(($body) => {
      const text = $body.text();
      expect(text).to.match(/Wind/);
    });
  });

  it('fits a narrow card layout', () => {
    cy.get('.MuiCard-root').first().should('exist').invoke('outerWidth').should('be.lte', 400);
  });
});