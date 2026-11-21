/**
 * Plant images: the main image of a plant replaces its emoji on the map and
 * is entered in the plant form as a URL with a preview.
 *
 * Needs the Wurzelwerk season data and the static plant images locally:
 *   scripts/local-dev.sh seed-season 2027
 *   scripts/local-dev.sh plant-images
 * (frontend-vite/public/media is not versioned.)
 *
 * Read-only: switches label modes, zooms, and cancels the form.
 */

const GARDEN_ID = 'Wurzelwerk';

const visitDe = (path: string) =>
  cy.visit(`/${GARDEN_ID}/${path}`, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem('i18nextLng', 'de');
    },
  });

const label = (text: string) => cy.contains('[data-testid="map-label"]', text, { timeout: 15000 });

const loaded = ($img: JQuery<HTMLElement>) => {
  const img = $img[0] as HTMLImageElement;
  expect(img.complete, 'image complete').to.equal(true);
  expect(img.naturalWidth, 'image width').to.be.greaterThan(0);
};

describe('Plant images', () => {
  it('shows plant images instead of emoji on the map, switchable in the menu', () => {
    visitDe('map?labels=2027');
    cy.get('.maplibregl-canvas', { timeout: 20000 }).should('be.visible');
    cy.wait(3000);

    // compact level: one round image per plant
    cy.contains('Zum Beschriften näher heranzoomen', { timeout: 15000 }).click();
    cy.get('[data-testid="map-label"] img[src*="/media/plants/"]', { timeout: 15000 })
      .should('have.length.greaterThan', 0)
      .first()
      .should('be.visible')
      .and(loaded);
    cy.wait(1000);
    cy.screenshot('01-map-plant-images');

    // zoomed in: the images grow into a grid that fits the bed …
    const imageWidth = () =>
      label('Dachs-Beet')
        .find('img[src*="/media/plants/knoblauch/"]')
        .should(loaded)
        .then(($img) => $img[0].getBoundingClientRect().width);
    cy.get('.maplibregl-ctrl-zoom-in').click();
    cy.wait(1500);
    label('Dachs-Beet').find('img').should('have.length', 4);
    imageWidth().then((at20) => {
      expect(at20).to.be.greaterThan(22);
      cy.screenshot('02-map-image-grid');
      // … and get bigger, with names, one level further in
      cy.get('.maplibregl-ctrl-zoom-in').click();
      cy.wait(1500);
      imageWidth().should('be.greaterThan', at20);
      label('Dachs-Beet').should('contain', 'Knoblauch');
      cy.screenshot('03-map-image-grid-with-names');
    });

    // switch to emoji
    cy.get('[aria-label="Beschriftung wählen"]').click();
    cy.contains('[role="menuitem"]', 'Bilder').should('exist');
    cy.screenshot('04-menu-plant-symbols');
    cy.contains('[role="menuitem"]', 'Emojis').click();
    cy.location('search').should('include', 'icons=emoji');
    cy.get('[data-testid="map-label"] img').should('not.exist');
    label('Dachs-Beet').should('contain', '🧄');
    cy.wait(500);
    cy.screenshot('05-map-emoji');
  });

  it('shows the main image as a preview in the plant form', () => {
    visitDe('plants?tab=species');
    // the row whose name cell is "Kartoffeln" (other rows mention it in their hints);
    // its actions column sits right of the horizontally scrolled table area
    cy.contains('td', /^\s*Kartoffeln\s*$/, { timeout: 20000 })
      .closest('tr')
      .find('button[aria-label="Row Actions"]')
      .click({ force: true });
    cy.contains('[role="menuitem"]', 'edit').click();

    cy.contains('label', 'Hauptbild (URL)', { timeout: 15000 }).should('be.visible');
    cy.get('input[value="Kartoffeln"]').should('exist');
    cy.get('input[value="/media/plants/kartoffel/frucht.webp"]').should('exist');
    cy.get('[data-testid="image-url-preview"] img').should('be.visible').and(loaded);
    cy.wait(500);
    cy.screenshot('06-plant-form-main-image');

    cy.contains('button', /^cancel$/i).click();
  });
});
