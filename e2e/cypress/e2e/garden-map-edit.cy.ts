/**
 * Garden map — editing shapes, with history.
 *
 * Needs the Wurzelwerk garden (scripts/local-dev.sh up). The spec works on a test shape
 * outside the garden (about 70 m south-east of its centre) and on shapes it draws next
 * to it; an `after` hook removes everything it created and restores the setup mode.
 *
 * The map opens on the garden's location at zoom 17 (fresh browser, no map session),
 * so screen positions follow from Web Mercator.
 */

const GARDEN_ID = 'Wurzelwerk';
const GARDEN = 'https://data.semantic-desk.top/garden/Garden/Wurzelwerk';
const G = 'https://ontology.semantic-desk.top/garden#';
const TEST_SHAPE = `${G}GeoFeature/cypress-shape-history`;
const SPARQL = Cypress.env('SPARQL_URL') || 'http://localhost:7880';
const STARTED = new Date().toISOString();
const ZOOM = 17;

const pad = (n: number) => String(n).padStart(2, '0');
const now = new Date();
const TODAY = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

type Binding = Record<string, { value: string }>;

const update = (body: string) =>
  cy.request({ method: 'POST', url: `${SPARQL}/update`, form: true, body: { update: `PREFIX g: <${G}>\n${body}` } });

const select = (query: string) =>
  cy
    .request({
      method: 'POST',
      url: `${SPARQL}/query`,
      form: true,
      headers: { Accept: 'application/sparql-results+json' },
      body: { query: `PREFIX g: <${G}>\n${query}` },
    })
    .then((response) => response.body.results.bindings as Binding[]);

const value = (query: string, name: string) =>
  select(query).then((rows) => rows[0]?.[name]?.value);

// --- positions: metres around the garden centre → lon/lat → pixels on the map ---
let center: [number, number] = [0, 0];
const offset = ([east, north]: [number, number]): [number, number] => [
  center[0] + east / (111320 * Math.cos((center[1] * Math.PI) / 180)),
  center[1] + north / 110574,
];
const world = ([lon, lat]: [number, number]): [number, number] => {
  const size = 512 * 2 ** ZOOM;
  const sin = Math.sin((lat * Math.PI) / 180);
  return [((lon + 180) / 360) * size, (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * size];
};
/** pixel position of a point (metres from the centre) on the canvas */
const pixel = (metres: [number, number], canvas: JQuery<HTMLElement>): [number, number] => {
  const [x, y] = world(offset(metres));
  const [cx, cy] = world(center);
  return [canvas.width()! / 2 + (x - cx), canvas.height()! / 2 + (y - cy)];
};

// the test shape: 30 × 30 m, its north-west corner 55 m east and 55 m south of the centre
const NW: [number, number] = [55, -55];
const SHAPE: [number, number][] = [NW, [85, -55], [85, -85], [55, -85], NW];
const wkt = (ring: [number, number][]) =>
  `POLYGON ((${ring.map((p) => offset(p).map((n) => n.toFixed(9)).join(' ')).join(', ')}))`;

const canvas = () => cy.get('.maplibregl-canvas');

/** drags with pointer events, the way TerraDraw listens on the canvas */
const drag = (from: [number, number], by: [number, number]) =>
  canvas().then(($canvas) => {
    const [x, y] = pixel(from, $canvas);
    const options = { pointerId: 1, isPrimary: true, button: 0, buttons: 1, pointerType: 'mouse', force: true };
    cy.wrap($canvas).trigger('pointerdown', x, y, options);
    for (let step = 1; step <= 6; step += 1) {
      cy.wrap($canvas).trigger('pointermove', x + (by[0] * step) / 6, y + (by[1] * step) / 6, options);
    }
    cy.wrap($canvas).trigger('pointerup', x + by[0], y + by[1], { ...options, buttons: 0 });
  });

const clickAt = (metres: [number, number]) =>
  canvas().then(($canvas) => {
    const [x, y] = pixel(metres, $canvas);
    cy.wrap($canvas).click(x, y, { force: true });
  });

const visitMap = () =>
  cy.visit(`/${GARDEN_ID}/map`, {
    onBeforeLoad: (win) => win.localStorage.setItem('i18nextLng', 'de'),
  });

const startEditing = () => {
  cy.get('[data-testid="map-edit-open"]', { timeout: 20000 }).should('not.be.disabled').click();
  cy.get('[data-testid="map-edit-bar"]').should('be.visible');
  cy.wait(1500); // TerraDraw loads the shapes
};

const testShapeGeo = () => value(`SELECT ?geo WHERE { <${TEST_SHAPE}> g:geo ?geo }`, 'geo');

let setupModeBefore: string | undefined;

const cleanup = () => {
  update(`DELETE { ?v ?p ?o } WHERE { <${TEST_SHAPE}> g:versions ?v . ?v ?p ?o }`);
  update(`DELETE WHERE { <${GARDEN}> g:geoFeatures <${TEST_SHAPE}> }`);
  update(`DELETE WHERE { <${TEST_SHAPE}> ?p ?o }`);
  // shapes drawn by the spec that nothing refers to
  update(`DELETE { <${GARDEN}> g:geoFeatures ?f . ?f ?p ?o }
    WHERE { ?f a g:GeoFeature ; g:creationTime ?t ; ?p ?o .
            FILTER(?t >= "${STARTED}") FILTER NOT EXISTS { ?x g:geoFeature ?f } }`);
};

describe('Garden map — editing shapes', () => {
  before(() => {
    value(`SELECT ?loc WHERE { <${GARDEN}> g:location ?loc }`, 'loc').then((loc) => {
      const [lon, lat] = /POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)/.exec(loc ?? '')!.slice(1).map(Number);
      center = [lon, lat];
    });
    value(`SELECT ?m WHERE { <${GARDEN}> g:setupMode ?m }`, 'm').then((mode) => {
      setupModeBefore = mode;
    });
    cleanup();
    update(`DELETE WHERE { <${GARDEN}> g:setupMode ?m }`);
    update(`INSERT DATA { <${GARDEN}> g:setupMode false }`);
    cy.then(() =>
      update(`INSERT DATA {
        <${TEST_SHAPE}> a g:GeoFeature ; g:geo "${wkt(SHAPE)}" ;
          g:creationTime "2026-01-01T10:00:00.000Z" ; g:modificationTime "2026-01-01T10:00:00.000Z" .
        <${GARDEN}> g:geoFeatures <${TEST_SHAPE}> .
      }`),
    );
  });

  after(() => {
    cleanup();
    update(`DELETE WHERE { <${GARDEN}> g:setupMode ?m }`);
    cy.then(() => {
      if (setupModeBefore !== undefined) update(`INSERT DATA { <${GARDEN}> g:setupMode ${setupModeBefore} }`);
    });
  });

  it('shows the map read-only and edits it with its own bar', () => {
    visitMap();
    canvas().should('be.visible');
    cy.get('[data-testid="map-edit-open"]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-testid="map-edit-bar"]').should('not.exist');
    cy.get('.maplibregl-terradraw-add-control').should('not.exist'); // no drawing tools in the view
    cy.wait(2000);
    cy.screenshot('01-view-mode');

    startEditing();
    cy.get('[data-testid="map-edit-history"]').should('contain.text', 'Veränderung ab');
    cy.get('[data-testid="map-edit-remove"]').should('be.disabled');
    cy.screenshot('02-edit-mode');
    cy.get('[data-testid="map-edit-done"]').click();
    cy.get('[data-testid="map-edit-bar"]').should('not.exist');
  });

  it('saves a corner at once, undoes it, and keeps the old outline after "Done"', () => {
    visitMap();
    canvas().should('be.visible');
    startEditing();

    clickAt([70, -70]); // inside the test shape
    cy.get('[data-testid="map-edit-selected"]').should('contain.text', 'Ohne Zuordnung');
    cy.screenshot('03-selected');

    testShapeGeo().then((original) => {
      drag(NW, [-40, -30]);
      cy.wait(1000);
      testShapeGeo().should('not.equal', original);
      cy.screenshot('04-corner-moved');

      cy.get('[data-testid="map-edit-undo"]').click();
      cy.wait(1000);
      testShapeGeo().should('equal', original);

      drag(NW, [-40, -30]);
      cy.wait(1000);
      cy.get('[data-testid="map-edit-done"]').click();
      cy.contains('Alte Form aufbewahrt', { timeout: 10000 }).should('be.visible');
      cy.screenshot('05-old-shape-kept');

      select(`SELECT ?from ?vgeo ?until WHERE {
        <${TEST_SHAPE}> g:validFrom ?from ; g:versions ?v . ?v g:geo ?vgeo ; g:validUntil ?until }`).then((rows) => {
        expect(rows).to.have.length(1);
        expect(rows[0].from.value).to.equal(TODAY);
        expect(rows[0].until.value).to.equal(TODAY);
        expect(rows[0].vgeo.value).to.equal(original);
      });
    });
    // no second feature appeared at the same place
    select(`SELECT ?f WHERE { ?f a g:GeoFeature ; g:creationTime ?t FILTER(?t >= "${STARTED}") }`).should(
      'have.length',
      0,
    );
  });

  it('takes shapes off the map: an older one gets an end date, a new one is deleted', () => {
    visitMap();
    canvas().should('be.visible');
    startEditing();

    clickAt([70, -70]);
    cy.get('[data-testid="map-edit-remove"]').click();
    cy.get('[role="dialog"]').should('contain.text', 'gilt die Form nicht mehr');
    cy.get('[data-testid="map-edit-remove-confirm"]').click();
    cy.wait(1000);
    value(`SELECT ?until WHERE { <${TEST_SHAPE}> g:validUntil ?until }`, 'until').should('equal', TODAY);
    // it stays in the garden (and in the history)
    select(`SELECT ?f WHERE { <${GARDEN}> g:geoFeatures ?f FILTER(?f = <${TEST_SHAPE}>) }`).should('have.length', 1);

    // draw a new area next to it, and take it off again
    cy.get('[data-testid="map-edit-tool-polygon"]').click();
    const corners: [number, number][] = [[100, -55], [130, -55], [130, -85], [100, -85]];
    corners.forEach((corner) => clickAt(corner));
    clickAt(corners[0]); // close
    cy.wait(1500);
    select(`SELECT ?f ?from WHERE { ?f a g:GeoFeature ; g:creationTime ?t ; g:validFrom ?from FILTER(?t >= "${STARTED}") }`).then(
      (rows) => {
        expect(rows).to.have.length(1);
        expect(rows[0].from.value).to.equal(TODAY);
      },
    );
    cy.get('[data-testid="map-edit-selected"]').should('contain.text', 'Ohne Zuordnung');
    cy.get('[data-testid="map-edit-describe"]').should('be.visible');
    cy.screenshot('06-new-shape');

    cy.get('[data-testid="map-edit-remove"]').click();
    cy.get('[role="dialog"]').should('contain.text', 'eben erst gezeichnet');
    cy.get('[data-testid="map-edit-remove-confirm"]').click();
    cy.wait(1000);
    select(`SELECT ?f WHERE { ?f a g:GeoFeature ; g:creationTime ?t FILTER(?t >= "${STARTED}") }`).should(
      'have.length',
      0,
    );
    cy.get('[data-testid="map-edit-done"]').click();
    cy.get('[data-testid="map-edit-bar"]').should('not.exist');
  });
});
