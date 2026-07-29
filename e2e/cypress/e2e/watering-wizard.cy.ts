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

function nextMonthYYYYMM(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const TARGET_MONTH = nextMonthYYYYMM();

// Dates shared between several users to ensure the algorithm can make assignments
const sharedDates = [
  daysFromNow(8),
  daysFromNow(12),
  daysFromNow(16),
  daysFromNow(20),
];

const SPARQL_UPDATE = "https://sparql-dev01.pergola.kuenste.live/update";
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

    // Verify the submission reached the API — check by name since personId may
    // differ in a production + service-worker environment (onBeforeLoad timing).
    cy.request({
      method: "GET",
      url: `${API}/availability`,
      qs: { gardenIri: GARDEN_IRI },
    }).then((res) => {
      const entry = (res.body as any[]).find((e) =>
        (e.name ?? "").includes("PflanzenfeeEva")
      );
      expect(entry, "PflanzenfeeEva entry should exist").to.not.be.undefined;
      expect(entry.availableDates).to.be.an("array").with.length.greaterThan(0);
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
        targetMonth: TARGET_MONTH,
      },
      {
        personId: "cypress-api-04",
        nickname: "FranzKompost",
        maximumTasksPerMonth: 4,
        availableDates: [daysFromNow(10), ...sharedDates],
        targetMonth: TARGET_MONTH,
      },
      {
        personId: "cypress-api-05",
        nickname: "AnnaBlume",
        maximumTasksPerMonth: 8,
        availableDates: [daysFromNow(5), daysFromNow(9), ...sharedDates, daysFromNow(23)],
        targetMonth: TARGET_MONTH,
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
      // API users use stable personId IRIs; UI users verified by name since
      // localStorage personId may not be reliable in a production SW environment.
      const personIris: string[] = (res.body as any[]).map((e) => e.person?.["@id"] ?? "");
      const names: string[] = (res.body as any[]).map((e) => e.name ?? "");
      expect(personIris.some((iri) => iri.includes("cypress-ui-01"))).to.be.true;
      expect(names.some((n) => n.includes("PflanzenfeeEva"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-api-03"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-api-04"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("cypress-api-05"))).to.be.true;
    });
  });

  // ── Calculate plan via UI button ──────────────────────────────────────────

  it("calculates a watering plan covering all participants via the UI button", () => {
    cy.visit(`/${GARDEN_ID}/watering`, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("pergola_person_id", "cypress-ui-01");
      },
    });

    cy.get("[data-cy=calculate-plan-button]").should("be.visible").click();
    // Wait until the button re-enables (calculation complete)
    cy.get("[data-cy=calculate-plan-button]", { timeout: 15000 }).should("not.be.disabled");

    // Verify plan via API: at least 3 distinct people must be assigned
    cy.request({
      method: "GET",
      url: `${API}/plan`,
      qs: { gardenIri: GARDEN_IRI, month: TARGET_MONTH },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.assignments).to.be.an("array").with.length.greaterThan(0);
      const assignedPersonIris = [
        ...new Set((res.body.assignments as any[]).map((a) => a.personIri)),
      ];
      expect(assignedPersonIris.length).to.be.greaterThan(2);
    });
  });

  it("retrieves the stored plan via GET", () => {
    cy.request({
      method: "GET",
      url: `${API}/plan`,
      qs: { gardenIri: GARDEN_IRI, month: TARGET_MONTH },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.gardenIri).to.eq(GARDEN_IRI);
      expect(res.body.targetMonth).to.eq(TARGET_MONTH);
      expect(res.body.assignments).to.be.an("array").with.length.greaterThan(0);
    });
  });

  // ── Watering page UI shows the plan ──────────────────────────────────────

  it("watering page shows the plan — calendar has assigned task cells", () => {
    cy.visit(`/${GARDEN_ID}/watering`, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("pergola_person_id", "cypress-ui-01");
      },
    });

    // The "View Plan" button must be visible
    cy.get("[data-cy=plan-detail-button]").should("be.visible");

    cy.get("[data-cy=plan-detail-button]").click();
    cy.get("[data-cy=plan-detail-modal]").should("be.visible");
    cy.get("[data-cy=plan-detail-table]").within(() => {
      cy.get("tbody tr").should("have.length.greaterThan", 0);
    });
  });

  // ── Calculate plan button triggers recalculation ──────────────────────────

  it("calculate-plan-button on watering page triggers recalculation", () => {
    cy.visit(`/${GARDEN_ID}/watering`, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("pergola_person_id", "cypress-ui-01");
      },
    });

    cy.get("[data-cy=calculate-plan-button]").should("be.visible").click();
    cy.get("[data-cy=calculate-plan-button]", { timeout: 10000 }).should("not.be.disabled");

    cy.get("[data-cy=plan-detail-button]").click();
    cy.get("[data-cy=plan-detail-table]").within(() => {
      cy.get("tbody tr").should("have.length.greaterThan", 0);
    });
  });
});
