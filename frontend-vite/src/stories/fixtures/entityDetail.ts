/**
 * Entities for the detail view stories, shaped like Graviola loads them
 * (JSON-LD, nested objects inline, relations as objects with `@id`).
 *
 * Plant data follows the Wurzelwerk plant list; persons are made up. Images
 * live under public/media (not versioned) — without them the card simply
 * shows no image.
 */
const G = 'https://ontology.semantic-desk.top/garden#';
const D = 'https://data.semantic-desk.top/garden/';

export type EntityFixture = {
  entityIRI: string;
  typeIRI: string;
  typeName: string;
  data: Record<string, unknown>;
};

const fixture = (typeName: string, entityIRI: string, data: Record<string, unknown>): EntityFixture => ({
  entityIRI,
  typeIRI: `${G}${typeName}`,
  typeName,
  data: { '@id': entityIRI, '@type': `${G}${typeName}`, ...data },
});

const person = (slug: string, name: string, description?: string) => ({
  '@id': `${D}Person/${slug}`,
  '@type': `${G}Person`,
  name,
  ...(description && { description }),
});

export const knoblauch = fixture('PlantSpecies', `${D}PlantSpecies/knoblauch`, {
  name: 'Knoblauch',
  scientificName: 'Allium sativum',
  family: 'Lauchgewächse (Amaryllisgewächse)',
  description: 'Zehen stecken; Herbst- oder Frühjahrssteckung',
  icon: '🧄',
  imageUrl: '/media/plants/knoblauch/frucht.webp',
  images: ['/media/plants/knoblauch/beet.webp'],
  plantingInfo: 'Zehen mit Spitze nach oben, ca. 5 cm tief',
  spacingInfo: 'ca. 10–15 cm in der Reihe · 25 cm Reihenabstand',
  siteInfo: 'sonnig, durchlässig, eher nährstoffarm',
  careInfo: 'wenig Wasser/Dünger, Boden unkrautfrei halten',
  harvestInfo: 'Juli–August, wenn die Blätter abtrocknen · Lagerung: luftig aufgehängt nachtrocknen',
  hint: 'Nicht nach Zwiebelgewächsen: Anbaupause mehrere Jahre.',
  growingSeason: { plantingStart: 10, plantingEnd: 11, harvestStart: 7, harvestEnd: 8 },
  physicalCharacteristics: { spacing: 10 },
  gardeningInfo: {
    companions: ['Erdbeeren', 'Gurken', 'Karotten', 'Rote Bete', 'Tomaten'],
    antagonists: ['Bohnen', 'Erbsen', 'Kohlgewächse'],
  },
});

const kletterbohneRef = {
  '@id': `${D}PlantSpecies/kletterbohne`,
  '@type': `${G}PlantSpecies`,
  name: 'Kletterbohne',
  scientificName: 'Phaseolus vulgaris var. vulgaris',
  imageUrl: '/media/plants/kletterbohne/frucht.webp',
};

export const kletterbohne = fixture('PlantSpecies', kletterbohneRef['@id'], {
  ...kletterbohneRef,
  family: 'Hülsenfrüchte (Schmetterlingsblütler)',
  description: 'Stangenbohne, windet 2–3 m hoch, Hülse nur gekocht',
  icon: '🫛',
  nutrientDemand: 'light',
  images: ['/media/plants/kletterbohne/beet.webp'],
  sowingInfo: 'Mitte Mai–Mitte Juni direkt, 3–4 cm tief, ab 10–12 °C',
  plantingInfo: 'Vorkultur im Topf ab Ende April möglich, nach Frost',
  spacingInfo: '4–6 Bohnen je Stange/Tippi-Stab',
  siteInfo: 'sonnig, warm, windgeschützt, humoser Boden',
  careInfo: 'Schwachzehrer · gleichmäßig feucht, kaum Dünger · Triebe im Uhrzeigersinn anleiten · mulchen',
  harvestInfo: 'Juli–Okt., regelmäßig pflücken fördert Nachwuchs',
  hint: 'Hülsen nie roh essen (giftig). Nach den Eisheiligen säen.',
  growingSeason: { sowingStart: 5, sowingEnd: 6, harvestStart: 7, harvestEnd: 10 },
});

export const blaueHilde = fixture('PlantVariety', `${D}PlantVariety/kletterbohne-blaue-hilde`, {
  name: 'Blaue Hilde',
  characteristics: 'blauviolette Hülsen · fadenlos · mittelfrüh',
  icon: '🫛',
  species: kletterbohneRef,
});

const alex = person('alex-beispiel', 'Alex Beispiel', 'kümmert sich ums Gießen am Wochenende');
const kim = person('kim-muster', 'Kim Muster');

const igelBeetRef = {
  '@id': `${G}Patch/8vfrdlxuyq9`,
  '@type': `${G}Patch`,
  name: 'Igel-Beet',
};

export const igelBeet = fixture('Patch', igelBeetRef['@id'], {
  ...igelBeetRef,
  description: 'Gemeinschaftsbeet „Indie Inge Igel“',
  patchType: 'bed',
  responsiblePersons: [alex, kim],
  geoFeature: {
    '@id': `${G}GeoFeature/fdxjdjlz8i7`,
    '@type': `${G}GeoFeature`,
    geo: 'POLYGON ((13.731424521 51.083282497, 13.73146509 51.083276705, 13.731447488 51.083322409, 13.731422174 51.083318829, 13.731424521 51.083282497))',
  },
});

export const karottenPflanzung = fixture('Planting', `${D}Planting/2027-karotte`, {
  name: 'Karotten',
  role: 'main',
  status: 'wish',
  startDate: '2027-03-01',
  endDate: '2027-10-31',
  notes: 'Wunsch: Karotten (mehrere Sorten)',
  patch: igelBeetRef,
  plantSpecies: {
    '@id': `${D}PlantSpecies/karotte`,
    '@type': `${G}PlantSpecies`,
    name: 'Karotten',
    scientificName: 'Daucus carota subsp. sativus',
    imageUrl: '/media/plants/karotte/frucht.webp',
  },
  requestedBy: kim,
});

export const alexPerson = fixture('Person', alex['@id'], alex);

/** All examples, for the overview story. */
export const entityFixtures = {
  'Pflanzenart · Knoblauch': knoblauch,
  'Pflanzenart · Kletterbohne': kletterbohne,
  'Sorte · Blaue Hilde': blaueHilde,
  'Beet · Igel-Beet': igelBeet,
  'Pflanzung · Karotten': karottenPflanzung,
  'Person · Alex Beispiel': alexPerson,
} satisfies Record<string, EntityFixture>;
