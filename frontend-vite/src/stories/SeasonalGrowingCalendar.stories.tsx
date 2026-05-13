import type { Meta, StoryObj } from '@storybook/react';
import { SeasonalGrowingCalendar } from '../components/garden/SeasonalGrowingCalendar';
import { PlantSpecies, PlantVariety } from '../schema/patch-schema';

const GARDEN_IRI = 'https://ontology.semantic-desk.top/garden#';

// Example plant species and varieties
const examplePlants: (PlantSpecies | PlantVariety)[] = [
  // Tomato species
  {
    '@id': 'https://example.org/plants/tomato',
    '@type': `${GARDEN_IRI}PlantSpecies`,
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    description: 'Common garden tomato',
    icon: '🍅',
    growingSeason: {
      // Under glass: February-March (day 31-89)
      sowingUnderGlassStart: 31,
      sowingUnderGlassEnd: 89,
      // Outdoors: April-May (day 90-150)
      sowingOutdoorsStart: 90,
      sowingOutdoorsEnd: 150,
      // Harvest: July-October (day 181-303)
      harvestStartDay: 181,
      harvestEndDay: 303,
    },
    requirements: {
      sun: 'full_sun',
      water: 'medium',
    },
    physicalCharacteristics: {
      spacing: 50,
      height: 150,
    },
    timing: {
      germinationDays: 7,
      daysToHarvest: 80,
    },
  },
  // Cherry tomato variety
  {
    '@id': 'https://example.org/plants/tomato-cherry',
    '@type': `${GARDEN_IRI}PlantVariety`,
    name: 'Cherry Tom',
    species: {
      '@type': `${GARDEN_IRI}PlantSpecies`,
      name: 'Tomato',
      scientificName: 'Solanum lycopersicum',
      icon: '🍅',
    },
    description: 'Small sweet cherry tomatoes',
    characteristics: 'Small fruits, very sweet',
    sourceInfo: 'Local nursery',
    growingSeason: {
      // Under glass: March (day 59-89)
      sowingUnderGlassStart: 59,
      sowingUnderGlassEnd: 89,
      // Outdoors: May (day 120-150)
      sowingOutdoorsStart: 120,
      sowingOutdoorsEnd: 150,
      // Harvest: June-September (day 151-272)
      harvestStartDay: 151,
      harvestEndDay: 272,
    },
    timing: {
      germinationDays: 6,
      daysToHarvest: 60,
    },
  },
  // Lettuce
  {
    '@id': 'https://example.org/plants/lettuce',
    '@type': `${GARDEN_IRI}PlantSpecies`,
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    family: 'Asteraceae',
    description: 'Fresh salad greens',
    icon: '🥬',
    growingSeason: {
      // Under glass: January-March (day 0-89)
      sowingUnderGlassStart: 0,
      sowingUnderGlassEnd: 89,
      // Outdoors: March-August (day 59-242)
      sowingOutdoorsStart: 59,
      sowingOutdoorsEnd: 242,
      // Harvest: April-October (day 90-303)
      harvestStartDay: 90,
      harvestEndDay: 303,
    },
    requirements: {
      sun: 'partial_shade',
      water: 'medium',
    },
    physicalCharacteristics: {
      spacing: 25,
      height: 30,
    },
    timing: {
      germinationDays: 5,
      daysToHarvest: 45,
    },
  },
  // Carrot
  {
    '@id': 'https://example.org/plants/carrot',
    '@type': `${GARDEN_IRI}PlantSpecies`,
    name: 'Carrot',
    scientificName: 'Daucus carota',
    family: 'Apiaceae',
    description: 'Root vegetable',
    icon: '🥕',
    growingSeason: {
      // Outdoors: March-July (day 59-211)
      sowingOutdoorsStart: 59,
      sowingOutdoorsEnd: 211,
      // Harvest: June-November (day 151-333)
      harvestStartDay: 151,
      harvestEndDay: 333,
    },
    requirements: {
      sun: 'full_sun',
      water: 'low',
    },
    physicalCharacteristics: {
      spacing: 5,
      height: 20,
    },
    timing: {
      germinationDays: 14,
      daysToHarvest: 75,
    },
  },
  // Pumpkin
  {
    '@id': 'https://example.org/plants/pumpkin',
    '@type': `${GARDEN_IRI}PlantSpecies`,
    name: 'Pumpkin',
    scientificName: 'Cucurbita pepo',
    family: 'Cucurbitaceae',
    description: 'Large orange squash',
    icon: '🎃',
    growingSeason: {
      // Under glass: April (day 90-119)
      sowingUnderGlassStart: 90,
      sowingUnderGlassEnd: 119,
      // Outdoors: May-June (day 120-180)
      sowingOutdoorsStart: 120,
      sowingOutdoorsEnd: 180,
      // Harvest: September-November (day 243-333)
      harvestStartDay: 243,
      harvestEndDay: 333,
    },
    requirements: {
      sun: 'full_sun',
      water: 'high',
    },
    physicalCharacteristics: {
      spacing: 100,
      height: 40,
    },
    timing: {
      germinationDays: 7,
      daysToHarvest: 120,
    },
  },
  // Basil - demonstrating multi-year period
  {
    '@id': 'https://example.org/plants/basil',
    '@type': `${GARDEN_IRI}PlantSpecies`,
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    family: 'Lamiaceae',
    description: 'Fragrant herb',
    icon: '🌿',
    growingSeason: {
      // Under glass: February-April (day 31-119)
      sowingUnderGlassStart: 31,
      sowingUnderGlassEnd: 119,
      // Outdoors: May-June (day 120-180)
      sowingOutdoorsStart: 120,
      sowingOutdoorsEnd: 180,
      // Harvest: June-first frost, wraps to next year (day 151-395, wraps around)
      harvestStartDay: 151,
      harvestEndDay: 395, // Extends into next year
    },
    requirements: {
      sun: 'full_sun',
      water: 'medium',
    },
    physicalCharacteristics: {
      spacing: 20,
      height: 50,
    },
    timing: {
      germinationDays: 8,
      daysToHarvest: 30,
    },
  },
];

const meta = {
  title: 'Garden/SeasonalGrowingCalendar',
  component: SeasonalGrowingCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SeasonalGrowingCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: examplePlants,
  },
};

export const CustomColors: Story = {
  args: {
    data: examplePlants,
    periodColors: {
      sowingOutdoors: '#66bb6a',
      sowingUnderGlass: '#42a5f5',
      harvest: '#ffa726',
    },
  },
};

export const AllPropertiesVisible: Story = {
  args: {
    data: examplePlants,
    defaultVisibleProperties: [
      'germinationDays',
      'daysToHarvest',
      'spacing',
      'height',
      'sun',
      'water',
    ],
  },
};

export const MinimalData: Story = {
  args: {
    data: [
      {
        '@id': 'https://example.org/plants/radish',
        '@type': `${GARDEN_IRI}PlantSpecies`,
        name: 'Radish',
        icon: '🔴',
        growingSeason: {
          sowingOutdoorsStart: 59,
          sowingOutdoorsEnd: 242,
          harvestStartDay: 90,
          harvestEndDay: 272,
        },
      },
      {
        '@id': 'https://example.org/plants/spinach',
        '@type': `${GARDEN_IRI}PlantSpecies`,
        name: 'Spinach',
        icon: '🥬',
        // Missing growing season data
      },
    ],
  },
};

export const WithCallback: Story = {
  args: {
    data: examplePlants,
    onDataChange: (updatedData) => {
      console.log('Data changed:', updatedData);
      console.log('Updated growing seasons:', 
        updatedData.map(p => ({ 
          name: p.name, 
          growingSeason: p.growingSeason 
        }))
      );
    },
  },
};

export const EditModeDemo: Story = {
  args: {
    data: examplePlants.slice(0, 3), // Just show a few plants
    onDataChange: (updatedData) => {
      console.log('Period adjusted:', updatedData);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'In edit mode, hover over the edges of period blocks to see drag handles. Drag them to adjust the start and end dates of growing periods.',
      },
    },
  },
};

