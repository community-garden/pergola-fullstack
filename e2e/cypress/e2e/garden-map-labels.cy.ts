/**
 * Garden map — labels: bed names and the plantings of a season.
 *
 * Needs the Wurzelwerk map features and the season data loaded locally:
 *   scripts/local-dev.sh seed-season 2027
 *
 * Read-only: only switches label modes and zooms.
 */

const GARDEN_ID = 'Wurzelwerk';

const visitDe = (path: string) =>
  cy.visit(`/${GARDEN_ID}/${path}`, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem('i18nextLng', 'de');
    },
  });

const label = (text: string) => cy.contains('[data-testid="map-label"]', text, { timeout: 15000 });

describe('Garden map — labels', () => {
  it('shows bed names from a certain zoom level on', () => {
    visitDe('map?labels=names');
    // the map flies to the garden after loading; wait for it before zooming
    cy.get('.maplibregl-canvas', { timeout: 20000 }).should('be.visible');
    cy.wait(3000);
    cy.screenshot('01-map-zoomed-out');

    cy.contains('Zum Beschriften näher heranzoomen', { timeout: 15000 }).click();
    label('Dachs-Beet').should('be.visible');
    // one geo feature carrying two objects shows both names
    label('Folientunnel St. Josef – Beet').should('be.visible');
    cy.wait(1000);
    cy.screenshot('02-bed-names');
  });

  it('switches to the plantings of a season via the FAB menu', () => {
    // emoji symbols: the text list (plant images grow into a grid, see plant-images.cy.ts)
    visitDe('map?labels=names&icons=emoji');
    cy.get('.maplibregl-canvas', { timeout: 20000 }).should('be.visible');
    cy.wait(3000);

    cy.get('[aria-label="Beschriftung wählen"]').click();
    cy.contains('[role="menuitem"]', 'Beetnamen').should('exist');
    cy.screenshot('03-label-menu');
    cy.contains('[role="menuitem"]', 'Saison 2027').click();
    cy.location('search').should('include', 'labels=2027');

    // icons from zoom 18.5, plant names from zoom 19.75
    cy.contains('Zum Beschriften näher heranzoomen').click();
    cy.wait(1500);
    cy.screenshot('04-season-icons');
    cy.get('.maplibregl-ctrl-zoom-in').click();
    cy.wait(1500);
    label('Dachs-Beet').should('be.visible').and('contain', 'Knoblauch');
    cy.screenshot('05-season-plants');
  });
});
