const MEDIA_API = "/api/media";
const SPARQL_UPDATE = "https://sparql01.pergola.kuenste.live/update";

function clearMediaData() {
  cy.request({
    method: "POST",
    url: SPARQL_UPDATE,
    body: `PREFIX garden: <https://ontology.semantic-desk.top/garden#> DELETE { ?s ?p ?o } WHERE { ?s a garden:MediaAttachment . ?s ?p ?o . }`,
    headers: { "Content-Type": "application/sparql-update" },
    failOnStatusCode: false,
  });
}

describe("Media Upload API", () => {
  let uploadedIri: string | null = null;
  let uploadedEncodedIRI: string | null = null;

  before(() => {
    clearMediaData();
  });

  after(() => {
    if (uploadedEncodedIRI) {
      cy.request({
        method: "DELETE",
        url: `${MEDIA_API}/${uploadedEncodedIRI}`,
        failOnStatusCode: false,
      });
    }
  });

  it("rejects uploads with unsupported MIME type (415)", () => {
    cy.request({
      method: "POST",
      url: MEDIA_API,
      body: "text content",
      headers: { "Content-Type": "text/plain" },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(415);
    });
  });

  it("accepts a JPEG upload and returns a MediaAttachment entity", () => {
    // Use native fetch via cy.window() to properly send binary multipart
    cy.fixture("test-image.jpg", "base64").then((base64) => {
      const byteArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const fd = new FormData();
      fd.append("file", blob, "test-image.jpg");

      cy.window().then((win) => {
        const apiUrl = `${Cypress.config("baseUrl")}${MEDIA_API}`;
        return win.fetch(apiUrl, {
          method: "POST",
          body: fd,
        }).then((res) => {
          expect(res.status).to.eq(201);
          return res.json();
        }).then((data) => {
          expect(data).to.have.property("@id");
          expect(data).to.have.property("encodedIRI");
          expect(data).to.have.property("mimeType", "image/jpeg");
          expect(data).to.have.property("storedPath");
          expect(data.storedPath).to.match(/^uploads\/.+\.jpg$/);

          uploadedIri = data["@id"];
          uploadedEncodedIRI = data.encodedIRI;
        });
      });
    });
  });

  it("serves a thumbnail for the uploaded image", () => {
    if (!uploadedEncodedIRI) {
      cy.log("No uploadedEncodedIRI — skipping thumbnail test");
      return;
    }

    cy.request({
      method: "GET",
      url: `${MEDIA_API}/${uploadedEncodedIRI}/thumb/medium`,
      encoding: "binary",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.headers["content-type"]).to.match(/^image\//);
    });
  });

  it("returns 400 for an unknown thumbnail size", () => {
    if (!uploadedEncodedIRI) {
      cy.log("No uploadedEncodedIRI — skipping");
      return;
    }
    cy.request({
      method: "GET",
      url: `${MEDIA_API}/${uploadedEncodedIRI}/thumb/gigantic`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it("returns 404 for a thumbnail of an unknown IRI", () => {
    const fakeEncoded = btoa("https://data.semantic-desk.top/garden/Media/does-not-exist")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    cy.request({
      method: "GET",
      url: `${MEDIA_API}/${fakeEncoded}/thumb/medium`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it("deletes the uploaded attachment", () => {
    if (!uploadedEncodedIRI) {
      cy.log("No uploadedEncodedIRI — skipping");
      return;
    }
    cy.request({
      method: "DELETE",
      url: `${MEDIA_API}/${uploadedEncodedIRI}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(204);
      // Reset so after() doesn't try to delete again
      uploadedEncodedIRI = null;
    });
  });

  it("returns 404 when deleting an already-deleted attachment", () => {
    const fakeEncoded = btoa("https://data.semantic-desk.top/garden/Media/already-gone")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    cy.request({
      method: "DELETE",
      url: `${MEDIA_API}/${fakeEncoded}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});

describe("ImageUploadRenderer — Storybook UI", () => {
  const STORYBOOK = "https://storybook01.pergola.kuenste.live";

  it("renders the StandaloneUploadField story without errors", () => {
    cy.visit(`${STORYBOOK}/iframe.html?id=imageuploadrenderer--standalone-upload-field`);
    cy.get("body", { timeout: 15000 }).should("be.visible");
    cy.get("button", { timeout: 10000 }).should("exist");
  });

  it("renders the GardenPhotoForm story with image and icon fields", () => {
    cy.visit(`${STORYBOOK}/iframe.html?id=imageuploadrenderer--garden-photo-form`);
    cy.get("body", { timeout: 15000 }).should("be.visible");
    // Two upload fields (image + icon) each have an upload button
    cy.get("button", { timeout: 10000 }).should("have.length.gte", 2);
  });
});
