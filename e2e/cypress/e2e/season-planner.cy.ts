/**
 * Season planning — plants & seeds, plant calendar, timeline per bed.
 *
 * Works on an empty garden as well, but is most meaningful with the
 * Wurzelwerk season data loaded locally:
 *   scripts/local-dev.sh seed-season 2027
 *
 * Read-only: the spec opens dialogs and cancels them, it never saves.
 */

const GARDEN_ID = 'Wurzelwerk';

const visitDe = (path: string) =>
  cy.visit(`/${GARDEN_ID}/${path}`, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem('i18nextLng', 'de');
    },
  });

describe('Season planning — plants & seeds', () => {
  it('shows the plant management tabs', () => {
    visitDe('plants');
    ['Arten', 'Sorten', 'Saatgut', 'Pflanzungen', 'Kalender'].forEach((tab) =>
      cy.contains('[role="tab"]', tab, { timeout: 15000 }).should('be.visible'),
    );
    cy.wait(1500);
    cy.screenshot('01-plants-species');
  });

  it('opens the gardener-oriented species form', () => {
    visitDe('plants?tab=species');
    // icon-only toolbar button since edb-table-components 2.3
    cy.get('button[aria-label="create new"]', { timeout: 15000 }).first().click();
    cy.contains('Steckbrief', { timeout: 10000 }).should('be.visible');
    cy.contains('label', 'Nährstoffbedarf').should('exist');
    // botanical details are hidden in the gardener form
    cy.contains('Taxonomie').should('not.exist');
    cy.screenshot('02-species-form');
    cy.contains('button', /cancel|abbrechen/i).click();
  });

  it('shows the sowing / planting / harvest calendar', () => {
    visitDe('plants?tab=calendar');
    cy.wait(2000);
    cy.screenshot('03-plant-calendar');
  });
});

describe('Season planning — timeline', () => {
  beforeEach(() => {
    visitDe('season-planner');
    cy.contains('Saisonplanung', { timeout: 15000 }).should('be.visible');
  });

  it('shows beds as rows and the wish list', () => {
    cy.contains('Beete').should('be.visible');
    cy.contains('button', 'Wunschliste').should('be.visible');
    cy.contains('2027').should('exist');
    cy.wait(1500);
    cy.screenshot('04-season-timeline');
  });

  it('is read-only until the edit mode is switched on', () => {
    cy.get('[data-testid="edit-mode-toggle"]').should('have.attr', 'aria-pressed', 'false');
    cy.contains('button', 'Neue Pflanzung').should('not.exist');
    cy.get('[data-testid="edit-mode-toggle"]').first().click();
    cy.get('[data-testid="edit-mode-toggle"]').first().should('have.attr', 'aria-pressed', 'true');
    cy.contains('button', 'Neue Pflanzung').should('be.visible');
    cy.screenshot('04b-edit-mode');
  });

  it('opens the bed in the detail dialog, with an action to its planning', () => {
    cy.get('[data-testid="season-planner-open-bed"]', { timeout: 20000 }).first().click();
    cy.get('[data-testid="entity-detail-dialog"]', { timeout: 15000 }).should('be.visible');
    cy.wait(1000);
    cy.screenshot('04c-bed-detail');
    cy.get('[data-testid="entity-detail-dialog"]').contains('button', 'Beetplanung öffnen').click();
    cy.location('pathname', { timeout: 15000 }).should('match', /\/beds\/[^/]+\/plan$/);
    cy.get('[data-testid="entity-detail-dialog"]').should('not.exist');
  });

  it('opens a wish in the planting dialog with dropdowns (no entity finder)', () => {
    cy.get('[data-testid="edit-mode-toggle"]').first().click();
    cy.get('[data-testid="season-planner-wishlist"]').click();
    cy.get('body').then(($body) => {
      const wish = $body.find('.MuiChip-clickable');
      if (!wish.length) {
        cy.log('no wishes loaded — run scripts/local-dev.sh seed-season');
        return;
      }
      cy.wrap(wish.first()).click();
      cy.contains('Pflanzenart', { timeout: 10000 }).should('be.visible');
      cy.contains('Beet').should('be.visible');
      cy.contains('Gewünscht von').should('be.visible');
      cy.screenshot('05-planting-dialog');
      cy.contains('button', /cancel|abbrechen/i).click();
    });
  });

  it('switches the season', () => {
    cy.get('[role="group"][aria-label="Saison"] button').first().click();
    cy.wait(1000);
    cy.screenshot('06-previous-season');
  });
});
