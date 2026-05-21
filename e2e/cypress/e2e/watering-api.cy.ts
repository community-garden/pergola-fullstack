const GARDEN_IRI = "https://data.semantic-desk.top/garden/Garden/Wurzelwerk";
const API = "/api/watering";

describe("Watering Availability API", () => {
  let submittedIds: string[] = [];

  before(() => {
    submittedIds = [];
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
          expect(res.body.personId).to.eq(entry.personId);
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
      const personIds = res.body.map((e: any) => e.personId);
      expect(personIds).to.include("test-person-a");
      expect(personIds).to.include("test-person-b");
      expect(personIds).to.include("test-person-c");
    });
  });

  it("calculates a watering plan and returns assignments", () => {
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
    });
  });

  it("returns the stored plan via GET", () => {
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
