import type { Meta, StoryObj } from "@storybook/react";
import { GbifDetailView } from "./GbifDetailView";
import type { Result as GbifResult } from "../../knowledge-bases/types/gbif-search";

const meta = {
  title: "Knowledge Bases/GBIF Detail View",
  component: GbifDetailView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GbifDetailView>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example data from gbif-search.jsonl - Alternaria tomato (fungi)
const alternariaData: GbifResult = {
  key: 103665830,
  datasetKey: "fab88965-e69d-4491-a04d-e3198b626e52",
  parentKey: 103662126,
  parent: "Alternaria",
  kingdom: "Fungi",
  phylum: "Ascomycota",
  order: "Pleosporales",
  family: "Pleosporaceae",
  genus: "Alternaria",
  species: "Alternaria tomato",
  kingdomKey: 103504667,
  phylumKey: 103504669,
  classKey: 103642808,
  orderKey: 103655153,
  familyKey: 103662105,
  genusKey: 103662126,
  speciesKey: 103665830,
  scientificName: "Alternaria tomato",
  canonicalName: "Alternaria tomato",
  nameType: "SCIENTIFIC",
  taxonomicStatus: "ACCEPTED",
  rank: "SPECIES",
  origin: "SOURCE",
  numDescendants: 0,
  numOccurrences: 0,
  taxonID: "1187947",
  habitats: [],
  nomenclaturalStatus: [],
  threatStatuses: [],
  descriptions: [],
  vernacularNames: [],
  synonym: false,
  higherClassificationMap: {
    "103504667": "Fungi",
    "103504669": "Ascomycota",
    "103642808": "Dothideomycetes",
    "103655153": "Pleosporales",
    "103662105": "Pleosporaceae",
    "103662126": "Alternaria",
  },
  class: "Dothideomycetes",
};

// Broccoli data with more details
const broccoliData: GbifResult = {
  key: 3531057,
  nameKey: 17231225,
  datasetKey: "d7dddbf4-2cf0-4f39-9b2a-bb099caae36c",
  constituentKey: "7ddf754f-d193-4cc9-b351-99906754a03b",
  nubKey: 3531057,
  parentKey: 7388975,
  parent: "Alternaria",
  kingdom: "Fungi",
  phylum: "Ascomycota",
  order: "Pleosporales",
  family: "Pleosporaceae",
  genus: "Alternaria",
  species: "Alternaria broccoli-italicae",
  kingdomKey: 5,
  phylumKey: 95,
  classKey: 183,
  orderKey: 1047,
  familyKey: 8315,
  genusKey: 7388975,
  speciesKey: 3531057,
  scientificName: "Alternaria broccoli-italicae E.G.Simmons",
  canonicalName: "Alternaria broccoli-italicae",
  authorship: "E.G.Simmons",
  publishedIn: "(2007). CBS Diversity Ser. (Utrecht) 6: 446.",
  nameType: "SCIENTIFIC",
  taxonomicStatus: "ACCEPTED",
  rank: "SPECIES",
  origin: "SOURCE",
  numDescendants: 0,
  numOccurrences: 0,
  taxonID: "gbif:3531057",
  extinct: false,
  habitats: ["TERRESTRIAL"],
  nomenclaturalStatus: [],
  threatStatuses: [],
  descriptions: [],
  vernacularNames: [],
  synonym: false,
  higherClassificationMap: {
    "5": "Fungi",
    "95": "Ascomycota",
    "183": "Dothideomycetes",
    "1047": "Pleosporales",
    "8315": "Pleosporaceae",
    "7388975": "Alternaria",
  },
  class: "Dothideomycetes",
};

// Sunflower sea star with vernacular names
const sunflowerSeaStarData: GbifResult = {
  key: 165412895,
  datasetKey: "cbb6498e-8927-405a-916b-576d00a6289b",
  nubKey: 2274565,
  parentKey: 306576546,
  parent: "Pycnopodia",
  kingdom: "Animalia",
  phylum: "Echinodermata",
  order: "Forcipulatida",
  family: "Asteriidae",
  genus: "Pycnopodia",
  species: "Pycnopodia helianthoides",
  kingdomKey: 165236969,
  phylumKey: 306574833,
  classKey: 306576074,
  orderKey: 306576412,
  familyKey: 306576440,
  genusKey: 306576546,
  speciesKey: 165412895,
  scientificName: "Pycnopodia helianthoides Brandt, 1835",
  canonicalName: "Pycnopodia helianthoides",
  authorship: "Brandt, 1835",
  nameType: "SCIENTIFIC",
  taxonomicStatus: "ACCEPTED",
  rank: "SPECIES",
  origin: "SOURCE",
  numDescendants: 0,
  numOccurrences: 0,
  taxonID: "10553857",
  habitats: [],
  nomenclaturalStatus: [],
  threatStatuses: [],
  descriptions: [
    {
      description:
        "Pycnopodia helianthoides, commonly known as the sunflower sea star, is a large sea star found in the northeast Pacific. The only species of its genus, it is among the largest sea stars in the world, with a maximum arm span of 1 m. Adult sunflower sea stars usually have 16 to 24 limbs; their color can vary widely. They are predatory, feeding mostly on sea urchins, clams, snails, and other small invertebrates.",
    },
  ],
  vernacularNames: [],
  synonym: false,
  higherClassificationMap: {
    "165236969": "Animalia",
    "306574833": "Echinodermata",
    "306576074": "Asteroidea",
    "306576412": "Forcipulatida",
    "306576440": "Asteriidae",
    "306576546": "Pycnopodia",
  },
  class: "Asteroidea",
};

// Helianthemum with vernacular names
const rockRoseData: GbifResult = {
  key: 165679277,
  datasetKey: "cbb6498e-8927-405a-916b-576d00a6289b",
  parentKey: 165679271,
  parent: "Helianthemum",
  genus: "Helianthemum",
  species: "Helianthemum nummularium",
  genusKey: 165679271,
  speciesKey: 165679277,
  scientificName: "Helianthemum nummularium (L.) Mill.",
  canonicalName: "Helianthemum nummularium",
  authorship: "(L.) Mill.",
  nameType: "SCIENTIFIC",
  taxonomicStatus: "ACCEPTED",
  rank: "SPECIES",
  origin: "SOURCE",
  numDescendants: 0,
  numOccurrences: 0,
  taxonID: "4722217",
  habitats: [],
  nomenclaturalStatus: [],
  threatStatuses: [],
  descriptions: [
    {
      description:
        "Helianthemum nummularium (known as common rock-rose) is a species of rock-rose (Cistaceae), native to most of Europe. It is an evergreen trailing plant with loose terminal clusters of bright yellow, saucer-shaped flowers. In the flower centre is a tight cluster of orange stamens, which are sensitive to the touch, and spread outwards to reveal the tall stigma in the middle. The plant is common on chalk downs, and occasional in other grasslands, always on dry, base-rich soil.",
    },
  ],
  vernacularNames: [],
  synonym: false,
  higherClassificationMap: {
    "165679271": "Helianthemum",
  },
};

export const FungiSpecies: Story = {
  args: {
    data: alternariaData,
  },
};

export const WithAuthorAndPublication: Story = {
  args: {
    data: broccoliData,
  },
};

export const WithDescription: Story = {
  args: {
    data: sunflowerSeaStarData,
  },
};

export const PlantSpecies: Story = {
  args: {
    data: rockRoseData,
  },
};

// Comparison view
export const Comparison: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <GbifDetailView data={broccoliData} />
      <GbifDetailView data={sunflowerSeaStarData} />
    </div>
  ),
};

