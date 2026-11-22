/**
 * Garden map — overlays: images under the beds, switched on and off.
 *
 * Needs the Wurzelwerk map features and the overlays loaded locally:
 *   scripts/local-dev.sh map-overlays
 *
 * Read-only: only switches overlays in the menu.
 */

const GARDEN_ID = 'Wurzelwerk';

describe('Garden map — overlays', () => {
  it('lists the overlays of the garden and switches them', () => {
    cy.visit(`/${GARDEN_ID}/map`, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('i18nextLng', 'de');
      },
    });
    cy.get('.maplibregl-canvas', { timeout: 20000 }).should('be.visible');
    cy.wait(3000);
    cy.screenshot('01-watercolor-on');

    cy.get('[data-testid="map-overlay-button"]', { timeout: 15000 }).click();
    cy.get('[data-testid="map-overlay-item"]').should('have.length.at.least', 2);
    cy.contains('[data-testid="map-overlay-item"]', 'Aquarellkarte 2026').find('input[type=checkbox]').should('be.checked');
    cy.contains('[data-testid="map-overlay-item"]', 'Drohnenfoto 2026').find('input[type=checkbox]').should('not.be.checked');

    // swap the watercolour for the photo
    cy.contains('[data-testid="map-overlay-item"]', 'Aquarellkarte 2026').click();
    cy.contains('[data-testid="map-overlay-item"]', 'Drohnenfoto 2026').click();
    cy.contains('[data-testid="map-overlay-item"]', 'Drohnenfoto 2026').find('input[type=checkbox]').should('be.checked');
    cy.get('body').type('{esc}');
    cy.wait(2500);
    cy.screenshot('02-drone-photo-on');
  });
});
