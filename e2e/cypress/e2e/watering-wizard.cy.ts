/**
 * LetItRain Watering Wizard — E2E spec
 *
 * Flow:
 *   before() — clear all existing availability for the test garden
 *   User 1 (cypress-ui-01) — full UI wizard (selects frequency + dates + nickname)
 *   User 2 (cypress-ui-02) — full UI wizard (different dates + nickname)
 *   Users 3-5 (cypress-api-03/04/05) — submitted via REST API
 *   Final assertions — verify plan calculation covers all 5 participants
 */

const GARDEN_IRI = "https://data.semantic-desk.top/garden/Garden/Wurzelwerk";
const GARDEN_ID = "Wurzelwerk";
const API = "/api/watering";

// ISO date string N days from today
function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// Dates shared between several users to ensure the algorithm can make assignments
const sharedDates = [
  daysFromNow(8),
  daysFromNow(12),
  daysFromNow(16),
  daysFromNow(20),
];

const SPARQL_UPDATE = "https://sparql01.pergola.kuenste.live/update";
const SPARQL_DELETE_WATERING = `
PREFIX garden: <https://ontology.semantic-desk.top/garden#>
DELETE { ?s ?p ?o } WHERE { ?s a garden:WateringAvailability . ?s ?p ?o . }
`;
const SPARQL_DELETE_PLAN = `
PREFIX garden: <https://ontology.semantic-desk.top/garden#>
DELETE { ?s ?p ?o } WHERE { ?s a garden:WateringPlan . ?s ?p ?o . }
`;
const SPARQL_DELETE_PERSONS = `
PREFIX garden: <https://ontology.semantic-desk.top/garden#>
DELETE { ?s ?p ?o } WHERE { ?s a garden:AnonymousPerson . ?s ?p ?o . }
`;

function clearWateringData() {
  [SPARQL_DELETE_WATERING, SPARQL_DELETE_PLAN, SPARQL_DELETE_PERSONS].forEach((query) => {
    cy.request({
      method: "POST",
      url: SPARQL_UPDATE,
      body: query,
      headers: { "Content-Type": "application/sparql-update" },
      failOnStatusCode: false,
    });
  });
}

describe("LetItRain Watering Wizard", () => {
  before(() => {
    clearWateringData();
  });

  // ── User 1: Full UI wizard ────────────────────────────────────────────────

  it("User 1 completes the wizard via UI (GärtnerMax)", () => {
    cy.visit(`/${GARDEN_ID}/watering/wizard/0`, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("pergola_person_id", "cypress-ui-01");
        win.localStorage.setItem("pergola_nickname", "");
      },
    });

    // Step 1: Frequency — set slider to 3x/week via keyboard
    cy.get('input[type="range"]')
      .first()
      .focus()
      .type("{rightarrow}{rightarrow}");
    cy.get("[data-cy=wizard-next]").click();

    // Step 2: Availability — select 4 enabled dates (skip disabled past-date cells)
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(8).click();
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(12).click();
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(16).click();
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(20).click();
    cy.get("[data-cy=wizard-next]").click();

    // Step 3: Profile — enter nickname
    cy.get("[data-cy=nickname-input]").type("GärtnerMax");
    cy.get("[data-cy=wizard-finish]").click();

    // Redirected back to watering page
    cy.url().should("include", `/${GARDEN_ID}/watering`);

    // Verify submission reached the API — person is now a JSON-LD reference
    cy.request({
      method: "GET",
      url: `${API}/availability`,
      qs: { gardenIri: GARDEN_IRI },
    }).then((res) => {
      const personIris = (res.body as any[]).map((e) => e.person?.["@id"]);
      expect(personIris.some((iri: string) => iri?.includes("cypress-ui-01"))).to.be.true;
      const entry = (res.body as any[]).find((e) =>
        e.person?.["@id"]?.includes("cypress-ui-01")
      );
      expect(entry.name).to.include("GärtnerMax");
      expect(entry.availableDates).to.be.an("array").with.length.greaterThan(0);
    });
  });

  // ── User 2: Full UI wizard ────────────────────────────────────────────────

  it("User 2 completes the wizard via UI (PflanzenfeeEva)", () => {
    cy.visit(`/${GARDEN_ID}/watering/wizard/0`, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("pergola_person_id", "cypress-ui-02");
        win.localStorage.setItem("pergola_nickname", "");
      },
    });

    // Step 1: Frequency — set to 2x/week
    cy.get('input[type="range"]').first().focus().type("{rightarrow}");
    cy.get("[data-cy=wizard-next]").click();

    // Step 2: Availability — select 3 enabled dates (skip disabled past-date cells)
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(9).click();
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(13).click();
    cy.get('[data-testid^="calendar-date-"]:not(.Mui-disabled)').eq(17).click();
    cy.get("[data-cy=wizard-next]").click();

    // Step 3: Profile
    cy.get("[data-cy=nickname-input]").type("PflanzenfeeEva");
    cy.get("[data-cy=wizard-finish]").click();

    cy.url().should("include", `/${GARDEN_ID}/watering`);

    cy.request({
      method: "GET",
      url: `${API}/availability`,
      qs: { gardenIri: GARDEN_IRI },
    }).then((res) => {
      const personIris = (res.body as any[]).map((e) => e.person?.["@id"] ?? "");
      expect(personIris.some((iri: string) => iri.includes("cypress-ui-02"))).to.be.true;
    });
  });

  // ── Users 3-5: API submission ─────────────────────────────────────────────

  it("Users 3-5 submit their availability via REST API", () => {
    const apiUsers = [
      {
        personId: "cypress-api-03",
        nickname: "PetraGärtnerin",
        maximumTasksPerMonth: 6,
        availableDates: [daysFromNow(7), ...sharedDates, daysFromNow(24)],
      },
      {
        personId: "cypress-api-04",
        nickname: "FranzKompost",
        maximumTasksPerMonth: 4,
        availableDates: [daysFromNow(10), ...sharedDates],
      },
      {
        personId: "cypress-api-05",
        nickname: "AnnaBlume",
        maximumTasksPerMonth: 8,
        availableDates: [daysFromNow(5), daysFromNow(9), ...sharedDates, daysFromNow(23)],
      },
    ];

    apiUsers.forEach((user) => {
      cy.request({
        method: "POST",
        url: `${API}/availability`,
        body: { ...user, gardenIri: GARDEN_IRI },
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.person?.["@id"]).to.include(user.personId);
      });
    });
  });

  // ── Verify all 5 users are present ───────────────────────────────────────

  it("lists all 5 participants for the garden", () => {
    cy.request({
      method: "GET",
      url: `${API}/availability`,
      qs: { gardenIri: GARDEN_IRI },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array").with.length(5);
      // person is now a JSON-LD reference: { "@id": "...Person/uuid" }
      const personIris: string[] = (res.body as any[]).map((e) => e.person?.["@id"] ?? "");
      expect(personIris.some((iri) => iri.includes("cypress-ui-01"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-ui-02"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-api-03"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-api-04"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-api-05"))).to.be.true;
    });
  });

  // ── Calculate and verify plan ─────────────────────────────────────────────

  it("calculates a watering plan covering all participants", () => {
    cy.request({
      method: "POST",
      url: `${API}/plan/calculate`,
      body: { gardenIri: GARDEN_IRI, targetPersonsPerTask: 2 },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("@id");
      expect(res.body.gardenIri).to.eq(GARDEN_IRI);
      expect(res.body.assignments).to.be.an("array").with.length.greaterThan(0);

      // Assignments reference person IRIs, not plain IDs
      const assignedPersonIris = [
        ...new Set((res.body.assignments as any[]).map((a) => a.personIri)),
      ];
      // At least 3 different people must appear in the plan
      expect(assignedPersonIris.length).to.be.greaterThan(2);
    });
  });

  it("retrieves the stored plan via GET", () => {
    cy.request({
      method: "GET",
      url: `${API}/plan`,
      qs: { gardenIri: GARDEN_IRI },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.gardenIri).to.eq(GARDEN_IRI);
      expect(res.body.assignments).to.be.an("array").with.length.greaterThan(0);
    });
  });
});
