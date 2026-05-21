import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { ThemeContextProvider } from '../theme/index';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { plantSchema, plantConfiguration } from '../schema/plant-schema';
import { bringDefinitionToTop } from '@graviola/json-schema-utils';
import { customRenderers } from '../components/graviola/renderers';
import { Box, Typography, Paper } from '@mui/material';
import { withStoryProvider } from '../../.storybook/StoryProvider';

const queryClient = new QueryClient();

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// Sample PlantSpecies data
const samplePlantSpeciesData = {
  "@id": "urn:plant:tomato-species",
  "@type": `${GARDEN_IRI}PlantSpecies`,
  name: "Tomato",
  scientificName: "Solanum lycopersicum",
  family: "Solanaceae",
  description: "A popular garden vegetable, botanically a fruit, grown for its edible fruits",
  canGrowFromSeed: true,
  icon: "🍅",
  requirements: {
    sun: "full_sun",
    water: "medium",
    soil: "Well-drained, slightly acidic",
    pH: "6.0-6.8",
  },
  physicalCharacteristics: {
    spacing: 60,
    height: 150,
    spread: 45,
  },
  timing: {
    germinationDays: 7,
    daysToHarvest: 80,
  },
  climateData: {
    hardinessZoneMin: 2,
    hardinessZoneMax: 11,
    minTemperature: 10,
    maxTemperature: 35,
    frostTolerant: false,
  },
  taxonomy: {
    kingdom: "Plantae",
    order: "Solanales",
    family: "Solanaceae",
    genus: "Solanum",
    species: "lycopersicum",
    rank: "Species",
  },
  externalIdentifiers: {
    gbifKey: 2930137,
    openFarmSlug: "tomato",
  },
};

// Sample PlantVariety data
const samplePlantVarietyData = {
  "@id": "urn:plant:cherry-tomato",
  "@type": `${GARDEN_IRI}PlantVariety`,
  name: "Cherry Tomato",
  description: "Small, sweet tomatoes perfect for snacking",
  characteristics: "Small round fruits, very sweet, prolific producer",
  sourceInfo: "Heritage variety, widely available",
  requirements: {
    sun: "full_sun",
    water: "medium",
  },
  physicalCharacteristics: {
    spacing: 45,
    height: 120,
  },
  timing: {
    germinationDays: 7,
    daysToHarvest: 65,
  },
};

// Component for rendering a form
const PlantFormRenderer = ({ 
  typeName, 
  initialData 
}: { 
  typeName: 'PlantSpecies' | 'PlantVariety';
  initialData: any;
}) => {
  const [data, setData] = useState(initialData);
  const schema = bringDefinitionToTop(plantSchema as any, typeName);
  const uischema = plantConfiguration.uischemata[typeName];

  const allRenderers = [
    ...materialRenderers,
    ...customRenderers,
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Paper sx={{ p: 2, flex: 1, overflow: 'auto', maxHeight: '70vh' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {typeName === 'PlantSpecies' ? 'Plant Species Form' : 'Plant Variety Form'}
        </Typography>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={allRenderers}
          cells={materialCells}
          onChange={({ data: newData }) => setData(newData)}
        />
      </Paper>
      <Paper sx={{ p: 2, maxHeight: '30vh', overflow: 'auto' }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Current Data:
        </Typography>
        <pre style={{ 
          fontSize: '11px', 
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Paper>
    </Box>
  );
};

// Wrapper with all providers
const FormStoryWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeContextProvider>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Box sx={{ width: '900px', height: '90vh', p: 2 }}>
          {children}
        </Box>
      </QueryClientProvider>
    </I18nextProvider>
  </ThemeContextProvider>
);

// Meta configuration
const meta = {
  title: 'Garden/PlantForms',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    withStoryProvider(),
    (Story) => (
      <FormStoryWrapper>
        <Story />
      </FormStoryWrapper>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for PlantSpecies
export const PlantSpeciesEmpty: Story = {
  render: () => (
    <PlantFormRenderer
      typeName="PlantSpecies"
      initialData={{
        "@type": `${GARDEN_IRI}PlantSpecies`,
        name: "",
      }}
    />
  ),
};

export const PlantSpeciesWithData: Story = {
  render: () => (
    <PlantFormRenderer
      typeName="PlantSpecies"
      initialData={samplePlantSpeciesData}
    />
  ),
};

export const PlantSpeciesMinimal: Story = {
  render: () => (
    <PlantFormRenderer
      typeName="PlantSpecies"
      initialData={{
        "@id": "urn:plant:basil",
        "@type": `${GARDEN_IRI}PlantSpecies`,
        name: "Basil",
        scientificName: "Ocimum basilicum",
        family: "Lamiaceae",
        icon: "🌿",
      }}
    />
  ),
};

// Stories for PlantVariety
export const PlantVarietyEmpty: Story = {
  render: () => (
    <PlantFormRenderer
      typeName="PlantVariety"
      initialData={{
        "@type": `${GARDEN_IRI}PlantVariety`,
        name: "",
      }}
    />
  ),
};

export const PlantVarietyWithData: Story = {
  render: () => (
    <PlantFormRenderer
      typeName="PlantVariety"
      initialData={samplePlantVarietyData}
    />
  ),
};

export const PlantVarietyRomaTomato: Story = {
  render: () => (
    <PlantFormRenderer
      typeName="PlantVariety"
      initialData={{
        "@id": "urn:plant:roma-tomato",
        "@type": `${GARDEN_IRI}PlantVariety`,
        name: "Roma Tomato",
        description: "Plum-shaped tomato ideal for sauces",
        characteristics: "Determinate growth, meaty fruits with few seeds, excellent for canning",
        sourceInfo: "Heritage Italian variety",
        physicalCharacteristics: {
          spacing: 60,
          height: 90,
        },
        timing: {
          germinationDays: 8,
          daysToHarvest: 75,
        },
        requirements: {
          sun: "full_sun",
          water: "medium",
        },
      }}
    />
  ),
};

// Comparison story showing both forms side by side
export const PlantSpeciesVsVariety: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
      <Box sx={{ flex: 1 }}>
        <PlantFormRenderer
          typeName="PlantSpecies"
          initialData={{
            "@id": "urn:plant:cucumber",
            "@type": `${GARDEN_IRI}PlantSpecies`,
            name: "Cucumber",
            scientificName: "Cucumis sativus",
            family: "Cucurbitaceae",
            icon: "🥒",
            canGrowFromSeed: true,
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <PlantFormRenderer
          typeName="PlantVariety"
          initialData={{
            "@id": "urn:plant:lemon-cucumber",
            "@type": `${GARDEN_IRI}PlantVariety`,
            name: "Lemon Cucumber",
            description: "Round, yellow heirloom cucumber",
            characteristics: "Mild flavor, no bitterness, round shape",
          }}
        />
      </Box>
    </Box>
  ),
};

