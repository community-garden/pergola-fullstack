/**
 * Garden events — start page panel and the events page.
 *
 * Creates only events whose title starts with "cypress-" and removes them
 * again through the SPARQL update endpoint.
 */

const GARDEN_ID = 'Wurzelwerk';
const GARDEN_IRI = `https://data.semantic-desk.top/garden/Garden/${GARDEN_ID}`;
const SPARQL_UPDATE = Cypress.env('SPARQL_UPDATE_URL') ?? 'http://localhost:7880/update';
const NS = 'https://ontology.semantic-desk.top/garden#';

const day = (offset: number) => new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);

const sparqlUpdate = (update: string) =>
  cy.request({
    method: 'POST',
    url: SPARQL_UPDATE,
    headers: { 'Content-Type': 'application/sparql-update' },
    body: update,
  });

const insertEvent = (id: string, name: string, startsOn: string, extra = '') =>
  sparqlUpdate(`INSERT DATA { <https://data.semantic-desk.top/garden/GardenEvent/cypress-${id}> a <${NS}GardenEvent> ;
    <${NS}name> "${name}" ; <${NS}startsOn> "${startsOn}" ; <${NS}timeZone> "Europe/Berlin" ;
    <${NS}eventStatus> "confirmed" ; <${NS}garden> <${GARDEN_IRI}> ${extra} . }`);

const cleanup = () =>
  sparqlUpdate(`DELETE { ?s ?p ?o } WHERE { ?s ?p ?o FILTER(STRSTARTS(STR(?s), "https://data.semantic-desk.top/garden/GardenEvent/cypress-")) }`);

const visitDe = (path: string) =>
  cy.visit(`/${GARDEN_ID}/${path}`, {
    onBeforeLoad: (win) => win.localStorage.setItem('i18nextLng', 'de'),
  });

describe('Garden events', () => {
  before(cleanup);
  after(cleanup);

  it('shows upcoming events and one recent one on the start page', () => {
    insertEvent('recent', 'cypress-Zuletzt', day(-5));
    insertEvent('old', 'cypress-Zu alt', day(-30));
    insertEvent('n1', 'cypress-Treffen 1', day(2), `; <${NS}startsAt> "18:00:00"`);
    insertEvent('n2', 'cypress-Treffen 2', day(4));
    insertEvent('n3', 'cypress-Treffen 3', day(6));
    insertEvent('n4', 'cypress-Treffen 4', day(8));
    insertEvent('n5', 'cypress-Treffen 5', day(10));

    visitDe('home');
    cy.get('[data-testid="events-preview"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-testid="events-preview-row"]').should('have.length.at.most', 4);
    cy.get('[data-testid="events-preview-row"][data-past="true"]').should('contain.text', 'cypress-Zuletzt');
    cy.get('[data-testid="events-preview"]').should('not.contain.text', 'cypress-Zu alt');
    cy.get('[data-testid="events-preview"]').should('not.contain.text', 'cypress-Treffen 5');
    cy.get('[data-testid="events-preview"]').should('contain.text', '18:00');
    cy.screenshot('events-home-panel');
  });

  it('puts the panel above the weather on a phone and beside it on a desktop', () => {
    cy.viewport(390, 800);
    visitDe('home');
    cy.get('[data-testid="events-preview"]', { timeout: 15000 }).then(($events) => {
      cy.get('[data-testid="weather-compact"]', { timeout: 15000 }).then(($weather) => {
        expect($events[0].getBoundingClientRect().bottom).to.be.lte($weather[0].getBoundingClientRect().top + 1);
      });
    });
    cy.screenshot('events-home-phone');

    cy.viewport(1280, 800);
    visitDe('home');
    cy.get('[data-testid="events-preview"]', { timeout: 15000 }).then(($events) => {
      cy.get('[data-testid="weather-compact"]').then(($weather) => {
        expect($events[0].getBoundingClientRect().right).to.be.lte($weather[0].getBoundingClientRect().left + 1);
      });
    });
    cy.screenshot('events-home-desktop');
  });

  it('opens the events page from the panel and lists the events', () => {
    visitDe('home');
    cy.get('[data-testid="events-preview-all"]', { timeout: 15000 }).click();
    cy.location('pathname').should('eq', `/${GARDEN_ID}/events`);
    cy.get('[data-testid="events-page"]').should('be.visible');
    cy.contains('cypress-Treffen 1', { timeout: 15000 }).should('be.visible');
    cy.screenshot('events-page');
  });
});
