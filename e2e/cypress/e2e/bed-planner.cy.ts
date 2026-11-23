/**
 * Bed planner — plants, rows and areas in a bed, saved in the store.
 *
 * The spec brings its own test bed (a 4 × 3 m bed outside the garden with one planting
 * in 2027), so it never touches the real beds and their plans. It places a single plant
 * and a row, reloads to see that they were saved, and removes them again; the `after`
 * hook deletes the test bed, its planting and all placements of that planting.
 */

const GARDEN_ID = 'Wurzelwerk';
const GARDEN = 'https://data.semantic-desk.top/garden/Garden/Wurzelwerk';
const G = 'https://ontology.semantic-desk.top/garden#';
const BED = 'cypress-bed-planner';
const TEST_PATCH = `${G}Patch/${BED}`;
const TEST_FEATURE = `${G}GeoFeature/${BED}`;
const TEST_PLANTING = `https://data.semantic-desk.top/garden/Planting/${BED}`;
const URL = `/${GARDEN_ID}/beds/${BED}/plan?season=2027`;
const SPARQL_UPDATE = Cypress.env('SPARQL_UPDATE_URL') || 'http://localhost:7880/update';

const update = (body: string) =>
  cy.request({
    method: 'POST',
    url: SPARQL_UPDATE,
    form: true,
    body: { update: `PREFIX g: <${G}>\n${body}` },
    failOnStatusCode: false,
  });

/** Removes the test bed and everything that hangs on it — nothing else. */
const removeTestBed = () => {
  update(`DELETE { ?pp ?p ?o } WHERE { ?pp a g:PlantPlacement ; g:planting <${TEST_PLANTING}> ; ?p ?o }`);
  update(`DELETE WHERE { <${TEST_PLANTING}> ?p ?o }`);
  update(`DELETE WHERE { <${TEST_PATCH}> ?p ?o }`);
  update(`DELETE WHERE { <${GARDEN}> g:geoFeatures <${TEST_FEATURE}> }`);
  update(`DELETE WHERE { <${TEST_FEATURE}> ?p ?o }`);
};

/** The plan opens read-only; most steps need the edit mode. */
const visitPlan = (edit = true) => {
  cy.visit(URL, { onBeforeLoad: (win) => win.localStorage.setItem('i18nextLng', 'de') });
  if (edit) cy.get('[data-testid="edit-mode-toggle"]', { timeout: 20000 }).click();
};

const count = () =>
  cy
    .get('[data-testid="bed-planner-count"]', { timeout: 20000 })
    .invoke('text')
    .then((text) => Number(/\d+/.exec(text)?.[0] ?? 0));

describe('Bed planner', () => {
  before(() => {
    removeTestBed();
    update(`INSERT DATA {
      <${TEST_FEATURE}> a g:GeoFeature ;
        g:geo "POLYGON ((13.7320 51.08255, 13.732057 51.08255, 13.732057 51.082523, 13.7320 51.082523, 13.7320 51.08255))" .
      <${GARDEN}> g:geoFeatures <${TEST_FEATURE}> .
      <${TEST_PATCH}> a g:Patch ; g:name "Cypress-Testbeet" ; g:patchType "bed" ; g:geoFeature <${TEST_FEATURE}> .
      <${TEST_PLANTING}> a g:Planting ; g:name "Cypress-Test" ; g:patch <${TEST_PATCH}> ;
        g:plantSpecies <https://data.semantic-desk.top/garden/PlantSpecies/kartoffel> ;
        g:startDate "2027-04-01" ; g:endDate "2027-09-30" ; g:status "planned" ; g:role "main" .
    }`);
  });

  after(() => {
    removeTestBed();
  });

  it('opens the plan of the test bed with its planting', () => {
    visitPlan(false);
    cy.get('[data-testid="bed-planner-map"]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-testid="bed-plan-item"]').should('have.length.at.least', 1);
    cy.wait(1500);
    cy.screenshot('01-empty-plan');
  });

  it('is read-only until the edit mode is switched on', () => {
    visitPlan(false);
    cy.get('[data-testid="edit-mode-toggle"]', { timeout: 20000 }).should('have.attr', 'aria-pressed', 'false');
    // nothing to place with, nothing to turn
    cy.get('[data-testid="bed-plan-mode"]').should('not.exist');
    cy.get('[data-testid="bed-plan-other-plant"]').should('not.exist');
    cy.get('[data-testid="bed-planner-turn-toggle"]').should('not.exist');
    cy.get('[data-testid="edit-mode-toggle"]').click().should('have.attr', 'aria-pressed', 'true');
    cy.get('[data-testid="bed-plan-mode"]').should('be.visible');
    cy.get('[data-testid="bed-planner-turn-toggle"]').should('be.visible');
    cy.screenshot('01b-edit-mode');
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
