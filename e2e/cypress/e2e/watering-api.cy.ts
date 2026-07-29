const GARDEN_IRI = "https://data.semantic-desk.top/garden/Garden/Wurzelwerk";
const API = "/api/watering";
const SPARQL_UPDATE = "https://sparql-dev01.pergola.kuenste.live/update";

describe("Watering Availability API", () => {
  let submittedIds: string[] = [];

  before(() => {
    submittedIds = [];
    // Clear all watering data before running so specs are always isolated
    ["WateringAvailability", "WateringPlan", "AnonymousPerson"].forEach((type) => {
      cy.request({
        method: "POST",
        url: SPARQL_UPDATE,
        body: `PREFIX garden: <https://ontology.semantic-desk.top/garden#> DELETE { ?s ?p ?o } WHERE { ?s a garden:${type} . ?s ?p ?o . }`,
        headers: { "Content-Type": "application/sparql-update" },
        failOnStatusCode: false,
      });
    });
  });

  after(() => {
    // Cleanup: remove test entries so the spec is re-runnable
    submittedIds.forEach((id) => {
      cy.request("DELETE", `${API}/availability/${id}`);
    });
  });

  it("accepts availability submissions and stores them", () => {
    cy.fixture("watering-availability").then((entries: any[]) => {
      entries.forEach((entry) => {
        cy.request({
          method: "POST",
          url: `${API}/availability`,
          body: { ...entry, gardenIri: GARDEN_IRI },
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.have.property("@id");
          // person is now a JSON-LD reference; its @id IRI contains the personId
          expect(res.body.person?.["@id"]).to.include(entry.personId);
          expect(res.body.maximumTasksPerMonth).to.eq(entry.maximumTasksPerMonth);

          // Extract id segment for cleanup
          const id = (res.body["@id"] as string).split("/").pop()!;
          submittedIds.push(id);
        });
      });
    });
  });

  it("lists stored availability entries for the garden", () => {
    cy.request({
      method: "GET",
      url: `${API}/availability`,
      qs: { gardenIri: GARDEN_IRI },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
      const personIris: string[] = res.body.map((e: any) => e.person?.["@id"] ?? "");
      expect(personIris.some((iri) => iri.includes("test-person-a"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("test-person-b"))).to.be.true;
      expect(personIris.some((iri) => iri.includes("test-person-c"))).to.be.true;
    });
  });

  it("calculates a watering plan and returns assignments", () => {
    cy.request({
      method: "POST",
      url: `${API}/plan/calculate`,
      body: { gardenIri: GARDEN_IRI, targetPersonsPerTask: 2, targetMonth: "2026-06" },
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("@id");
      expect(res.body.gardenIri).to.eq(GARDEN_IRI);
      expect(res.body.targetMonth).to.eq("2026-06");
      expect(res.body.assignments).to.be.an("array").with.length.greaterThan(0);
    });
  });

  it("returns the stored plan via GET", () => {
    cy.request({
      method: "GET",
      url: `${API}/plan`,
      qs: { gardenIri: GARDEN_IRI, month: "2026-06" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.gardenIri).to.eq(GARDEN_IRI);
      expect(res.body.targetMonth).to.eq("2026-06");
      expect(res.body.assignments).to.be.an("array").with.length.greaterThan(0);
    });
  });

  it("removes a single assignment from a plan", () => {
    cy.request({
      method: "GET",
      url: `${API}/plan`,
      qs: { gardenIri: GARDEN_IRI, month: "2026-06" },
    }).then((getRes) => {
      const assignment = getRes.body.assignments[0];
      const beforeCount = getRes.body.assignments.length;

      cy.request({
        method: "DELETE",
        url: `${API}/plan/Wurzelwerk-2026-06/assignments`,
        body: {
          date: assignment.date,
          personIri: assignment.personIri,
        },
        headers: { "Content-Type": "application/json" },
      }).then((deleteRes) => {
        expect(deleteRes.status).to.eq(200);
        expect(deleteRes.body.assignments).to.have.length(beforeCount - 1);
        expect(
          deleteRes.body.assignments.some(
            (a: { date: string; personIri: string }) =>
              a.date === assignment.date && a.personIri === assignment.personIri
          )
        ).to.be.false;
      });
    });
  });

  it("removes a single date from availability", () => {
    cy.request({
      method: "GET",
      url: `${API}/availability`,
      qs: { gardenIri: GARDEN_IRI, month: "2026-06" },
    }).then((getRes) => {
      const entry = getRes.body[0];
      const personIri = entry.person["@id"];
      const dateToRemove = entry.availableDates[0];

      cy.request({
        method: "DELETE",
        url: `${API}/availability/date`,
        body: {
          gardenIri: GARDEN_IRI,
          personIri,
          targetMonth: "2026-06",
          date: dateToRemove,
        },
        headers: { "Content-Type": "application/json" },
      }).then((deleteRes) => {
        expect(deleteRes.status).to.eq(200);
        if (deleteRes.body.availableDates) {
          expect(deleteRes.body.availableDates).to.not.include(dateToRemove);
        } else {
          expect(deleteRes.body).to.have.property("deleted");
        }
      });
    });
  });
});
