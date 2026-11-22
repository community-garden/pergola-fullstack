/**
 * Bed planner — plants, rows and areas in the Igel-Beet, saved in the store.
 *
 * Needs the Wurzelwerk season data (scripts/local-dev.sh seed-season 2027).
 * The spec places a single plant and a row, reloads to see that they were
 * saved, and removes them again; an `after` hook deletes leftovers.
 */

const GARDEN_ID = 'Wurzelwerk';
const BED = '8vfrdlxuyq9'; // Igel-Beet
const URL = `/${GARDEN_ID}/beds/${BED}/plan?season=2027`;
const SPARQL_UPDATE = Cypress.env('SPARQL_UPDATE_URL') || 'http://localhost:7880/update';

const visitPlan = () =>
  cy.visit(URL, { onBeforeLoad: (win) => win.localStorage.setItem('i18nextLng', 'de') });

const count = () =>
  cy
    .get('[data-testid="bed-planner-count"]', { timeout: 20000 })
    .invoke('text')
    .then((text) => Number(/\d+/.exec(text)?.[0] ?? 0));

describe('Bed planner', () => {
  after(() => {
    // leftovers of a failed run
    cy.request({
      method: 'POST',
      url: SPARQL_UPDATE,
      form: true,
      body: {
        update:
          'PREFIX g: <https://ontology.semantic-desk.top/garden#> DELETE { ?s ?p ?o } WHERE { ?s a g:PlantPlacement . ?s ?p ?o }',
      },
      failOnStatusCode: false,
    });
  });

  it('opens the plan of the Igel-Beet with its plantings', () => {
    visitPlan();
    cy.get('[data-testid="bed-planner-map"]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-testid="bed-plan-item"]').should('have.length.at.least', 1);
    cy.wait(1500);
    cy.screenshot('01-empty-plan');
  });

  it('turns the bed, keeps the turn after a reload, and goes back to automatic', () => {
    visitPlan();
    cy.get('[data-testid="bed-planner-turn-toggle"]', { timeout: 20000 }).click();
    const value = () => cy.get('[data-testid="bed-planner-rotation-value"]', { timeout: 20000 }).invoke('text');
    value().then((auto) => {
      cy.get('[data-testid="bed-planner-turn-auto"]').should('be.disabled');
      cy.get('[data-testid="bed-planner-turn-right"]').click();
      value().should('not.equal', auto);
      cy.wait(1500);
      cy.screenshot('02a-turned');
      visitPlan();
      cy.get('[data-testid="bed-planner-rotation-value"]').should('not.exist'); // folded away again
      cy.get('[data-testid="bed-planner-turn-toggle"]', { timeout: 20000 }).click();
      value().should('not.equal', auto);
      cy.get('[data-testid="bed-planner-turn-auto"]').click();
      value().should('equal', auto);
      cy.wait(1500); // the field is removed from the bed again
    });
  });

  it('places a plant and a row, and still has them after a reload', () => {
    visitPlan();
    cy.get('[data-testid="bed-plan-item"]', { timeout: 20000 }).first().as('item');
    count().then((before) => {
      // one plant
      cy.get('@item').click();
      // the view is fitted to the bed, so the middle of the map is inside it
      cy.get('[data-testid="bed-planner-map"]').click('center');
      cy.get('[data-testid="bed-planner-done"]').click();
      cy.get('[data-testid="bed-plant"]').should('have.length', 1);

      // a row: two points, Enter
      cy.get('[data-testid="bed-plan-mode-line"]').click();
      cy.get('@item').click();
      cy.get('[data-testid="bed-planner-map"]').then(($map) => {
        const [w, h] = [$map.width()!, $map.height()!];
        cy.wrap($map).click(w / 2 + 40, h / 2 - 80).click(w / 2 + 40, h / 2 + 80);
      });
      cy.get('body').type('{enter}');
      cy.get('[data-testid="bed-shape"]').should('have.length', 1);
      cy.get('[data-testid="bed-planner-done"]').click();

      count().should('be.greaterThan', before + 1);
      cy.screenshot('02-placed');

      cy.wait(1500); // writes are queued; let them finish
      visitPlan();
      cy.get('[data-testid="bed-plant"]', { timeout: 20000 }).should('have.length', 1);
      cy.get('[data-testid="bed-shape"]').should('have.length', 1);
      cy.screenshot('03-after-reload');
    });
  });

  it('removes them again', () => {
    visitPlan();
    cy.get('[data-testid="bed-plant"]', { timeout: 20000 }).first().click({ force: true });
    cy.get('[data-testid="bed-planner-remove"]').click();
    cy.get('[data-testid="bed-shape"]').first().click({ force: true });
    cy.get('[data-testid="bed-planner-remove"]').click();
    cy.wait(1500);
    visitPlan();
    cy.get('[data-testid="bed-plan-item"]', { timeout: 20000 }).should('have.length.at.least', 1);
    cy.get('[data-testid="bed-plan-item-count"]').first().invoke('text').should('match', /^0\b/);
    cy.get('[data-testid="bed-plant"]').should('not.exist');
    cy.get('[data-testid="bed-shape"]').should('not.exist');
  });
});
