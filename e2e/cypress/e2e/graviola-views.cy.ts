/**
 * Graviola 2026-11 features in Pergola: per-row table menu with Pergola's own
 * entries, the new detail view, editing from the detail view (intent bus above
 * the modals), lossless saving, and the season planner on the typed store API.
 *
 * Needs the Wurzelwerk season data locally:
 *   scripts/local-dev.sh seed-season 2027
 * Saves Knoblauch once without changes; everything else is cancelled.
 *
 * The SPARQL endpoint for the store check defaults to the local stack when the
 * app runs on localhost, else to dev01; override with CYPRESS_SPARQL_URL.
 */

const GARDEN_ID = 'Wurzelwerk';
const KNOBLAUCH = 'https://data.semantic-desk.top/garden/PlantSpecies/knoblauch';
const G = 'https://ontology.semantic-desk.top/garden#';

const sparqlUrl = () =>
  (Cypress.env('SPARQL_URL') as string | undefined) ??
  (Cypress.config('baseUrl')?.includes('localhost')
    ? 'http://localhost:7880/query'
    : 'https://sparql-dev01.pergola.kuenste.live/query');

const sparqlCount = (query: string) =>
  cy
    .request({
      method: 'POST',
      url: sparqlUrl(),
      form: true,
      body: { query },
      headers: { accept: 'application/sparql-results+json' },
    })
    .then((res) => {
      const row = (res.body.results.bindings[0] ?? {}) as Record<string, { value: string }>;
      return Number(Object.values(row)[0]?.value ?? 0);
    });

const visitDe = (path: string) =>
  cy.visit(`/${GARDEN_ID}/${path}`, {
    onBeforeLoad: (win) => {
      win.localStorage.setItem('i18nextLng', 'de');
    },
  });

/** Opens the row menu of the table row whose name cell is exactly `name`. */
const openRowMenu = (name: string) =>
  cy
    .contains('td', new RegExp(`^\\s*${name}\\s*$`), { timeout: 20000 })
    .closest('tr')
    .find('button[aria-label="Row Actions"]')
    .click({ force: true });

const menuItem = (label: RegExp | string) => cy.contains('[role="menuitem"]', label);

describe('Graviola views', () => {
  it('row menu: built-in Show/Edit per row plus Pergola entries', () => {
    visitDe('plants?tab=species');
    openRowMenu('Knoblauch');
    menuItem(/^Show$/).should('be.visible');
    menuItem(/^Edit$/).should('be.visible');
    menuItem('Pflanzung anlegen').should('be.visible');
    cy.wait(500);
    cy.screenshot('01-row-menu');

    // "Pflanzung anlegen" opens the planting dialog with the species prefilled
    menuItem('Pflanzung anlegen').click();
    cy.contains('Edit entry', { timeout: 15000 }).should('be.visible');
    cy.contains(KNOBLAUCH).should('be.visible');
    cy.wait(500);
    cy.screenshot('02-create-planting-prefilled');
    cy.contains('button', /^cancel$/i).click();
  });

  it('detail view, edit from it, save without duplicating nested objects', () => {
    visitDe('plants?tab=species');
    openRowMenu('Knoblauch');
    menuItem(/^Show$/).click();

    // new detail renderer with labels from the JSON Forms translations
    cy.get('[role="dialog"]', { timeout: 15000 }).within(() => {
      cy.contains('Knoblauch').should('be.visible');
      cy.contains('Pflanzenfamilie').should('exist');
      cy.contains('Anbaukalender').should('exist');
      cy.contains('Mischkultur').should('exist');
    });
    cy.wait(500);
    cy.screenshot('03-detail-view');

    // "Edit" in the detail view dispatches an edit-entity intent → edit dialog
    cy.get('[role="dialog"]').contains('button', /^edit$/i).scrollIntoView().click();
    cy.contains('Edit entry', { timeout: 15000 }).should('be.visible');
    cy.get('input[value="Knoblauch"]').should('exist');
    cy.wait(500);
    cy.screenshot('04-edit-from-detail');

    cy.contains('button', /save and accept/i).click();
    cy.contains('Gespeichert', { timeout: 15000 }).should('exist');
    cy.screenshot('05-saved');

    // exactly one of each nested object after the save
    for (const prop of ['growingSeason', 'gardeningInfo', 'physicalCharacteristics']) {
      sparqlCount(`SELECT (COUNT(?b) AS ?c) WHERE { <${KNOBLAUCH}> <${G}${prop}> ?b }`).should('eq', 1);
    }
    sparqlCount(
      'SELECT (COUNT(DISTINCT ?b) AS ?c) WHERE { ?b ?p ?o . FILTER(isBlank(?b)) FILTER NOT EXISTS { ?x ?y ?b } }',
    ).should('eq', 0);
  });

  it('plantings: duplicate from the row menu', () => {
    visitDe('plants?tab=plantings');
    cy.get('button[aria-label="Row Actions"]', { timeout: 20000 }).first().click({ force: true });
    menuItem('Duplizieren').should('be.visible').click();
    cy.contains('Edit entry', { timeout: 15000 }).should('be.visible');
    cy.wait(500);
    cy.screenshot('06-duplicate-planting');
    cy.contains('button', /^cancel$/i).click();
  });

  it('season planner reads beds, plantings and wishes through the typed store', () => {
    visitDe('season-planner');
    cy.contains(/Wunschliste \(\d+\)/, { timeout: 20000 }).should('be.visible');
    cy.contains('Dachs-Beet').should('be.visible');
    cy.contains('Knoblauch').should('be.visible');
    cy.wait(500);
    cy.screenshot('07-season-planner');
  });
});
