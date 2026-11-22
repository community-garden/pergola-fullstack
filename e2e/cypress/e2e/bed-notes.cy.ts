/**
 * Single bed page: timeline view and Markdown notes on the bed.
 *
 * Runs on the Igel-Beet (Wurzelwerk season data, `scripts/local-dev.sh seed-season 2027`).
 * The only thing it writes is one note
 * whose text contains "cypress-note"; the `after` hook deletes every such note.
 */

const GARDEN_ID = 'Wurzelwerk';
const G = 'https://ontology.semantic-desk.top/garden#';
const BED = '8vfrdlxuyq9';
const SPARQL_UPDATE = Cypress.env('SPARQL_UPDATE_URL') || 'http://localhost:7880/update';

const visitBed = (query: string) =>
  cy.visit(`/${GARDEN_ID}/beds/${BED}/plan?season=2027&${query}`, {
    onBeforeLoad: (win) => win.localStorage.setItem('i18nextLng', 'de'),
  });

const removeTestNotes = () =>
  cy.request({
    method: 'POST',
    url: SPARQL_UPDATE,
    form: true,
    body: {
      update: `PREFIX g: <${G}>
DELETE { ?n ?p ?o } WHERE { ?n a g:BedNote ; g:text ?t ; ?p ?o . FILTER(CONTAINS(?t, "cypress-note")) }`,
    },
    failOnStatusCode: false,
  });

describe('Bed page: timeline and notes', () => {
  before(removeTestNotes);
  after(removeTestNotes);

  it('shows only this bed in the timeline, without wish list and legend', () => {
    visitBed('view=timeline');
    cy.get('[data-testid="bed-view-timeline"]', { timeout: 20000 }).should('have.class', 'Mui-selected');
    cy.contains('Karotten', { timeout: 20000 }).should('be.visible');
    cy.contains('Wunschliste').should('not.exist');
    cy.contains('Igel-Beet').should('be.visible');
    cy.wait(500);
    cy.screenshot('01-timeline');
  });

  it('writes, edits and deletes a Markdown note on the bed', () => {
    visitBed('view=timeline');
    cy.get('[data-testid="bed-notes"]', { timeout: 20000 }).should('be.visible');

    cy.get('[data-testid="bed-note-new"] textarea').type('**cypress-note** Reihen *dünn* säen');
    cy.get('[data-testid="bed-note-save-new"]').click();

    // rendered as Markdown, with its date
    cy.get('[data-testid="bed-note"]', { timeout: 15000 }).within(() => {
      cy.get('strong').should('contain', 'cypress-note');
      cy.get('em').should('contain', 'dünn');
      cy.get('[data-testid="bed-note-meta"]').invoke('text').should('match', /\d{2}\.\d{2}\.\d{4}/);
    });
    cy.wait(500);
    cy.screenshot('02-note');

    // saved: still there after a reload
    cy.reload();
    cy.contains('[data-testid="bed-note"]', 'cypress-note', { timeout: 20000 }).should('exist');

    // edit
    cy.get('[data-testid="bed-note-edit-button"]').click();
    cy.get('[data-testid="bed-note-edit"] textarea').type(' – bearbeitet');
    cy.get('[data-testid="bed-note-save-edit"]').click();
    cy.contains('[data-testid="bed-note-meta"]', 'bearbeitet', { timeout: 15000 }).should('exist');

    // delete (Cypress accepts the confirm dialog)
    cy.get('[data-testid="bed-note-delete"]').click();
    cy.get('[data-testid="bed-note"]').should('not.exist');
  });

  it('switches to the bed plan', () => {
    visitBed('view=timeline');
    cy.get('[data-testid="bed-view-plan"]', { timeout: 20000 }).click();
    cy.url().should('not.include', 'view=timeline');
    cy.get('[data-testid="bed-planner-map"]', { timeout: 20000 }).should('be.visible');
  });
});
