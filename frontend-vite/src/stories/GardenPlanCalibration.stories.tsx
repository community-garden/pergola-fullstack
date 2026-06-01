import type { Meta, StoryObj } from '@storybook/react';
import { ThemeContextProvider } from '../theme/index';
import { MediaConfigProvider } from '../components/graviola/renderers/image-upload/MediaConfigContext';
import { GardenPlanCalibration } from '../components/garden-plan/GardenPlanCalibration';
import type { CalibrationState } from '../components/garden-plan/types';

// Historical map of Berlin from the end of the 18th century.
// Source: Wikimedia Commons — public domain.
// https://commons.wikimedia.org/wiki/File:Berlin_End_of_the_18th_Century.jpg
const BERLIN_18TH_CENTURY_MAP =
  'https://upload.wikimedia.org/wikipedia/commons/a/a2/Berlin_End_of_the_18th_Century.jpg';

// Real OpenStreetMap-based style — no API key needed, gives a proper base map.
const OSM_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

// Placeholder for stories that exercise the upload button path
const SAMPLE_PLAN_URL = 'https://dev01.pergola.kuenste.live/api/media/sample-plan-placeholder';

// Approximate geographic bounds of the 18th-century Berlin map.
// Useful reference for manual corner placement in the interactive story:
//   TL: 52.543 N / 13.357 E   TR: 52.543 N / 13.431 E
//   BR: 52.492 N / 13.431 E   BL: 52.492 N / 13.357 E
const BERLIN_CORNERS = {
  topLeft:     { lng: 13.357, lat: 52.543 },
  topRight:    { lng: 13.431, lat: 52.543 },
  bottomRight: { lng: 13.431, lat: 52.492 },
  bottomLeft:  { lng: 13.357, lat: 52.492 },
};

const BERLIN_CENTER: [number, number] = [13.404, 52.52];

// ── Decorators ────────────────────────────────────────────────────────────────

const withProviders = (Story: React.ComponentType) => (
  <ThemeContextProvider>
    <MediaConfigProvider mediaApiBase="https://dev01.pergola.kuenste.live/api/media">
      <Story />
    </MediaConfigProvider>
  </ThemeContextProvider>
);

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Map/GardenPlanCalibration',
  component: GardenPlanCalibration,
  parameters: { layout: 'fullscreen' },
  decorators: [withProviders],
  args: {
    center: BERLIN_CENTER,
    zoom: 12,
    mapStyle: OSM_STYLE,
  },
} satisfies Meta<typeof GardenPlanCalibration>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Interactive story ─────────────────────────────────────────────────────────

/**
 * Real map, real historical image.  No upload required — the image is
 * pre-loaded from Wikimedia Commons.  Click four corners on the map to pin
 * the historical Berlin plan to the modern OSM base map.
 *
 * Suggested corner coordinates (paste into browser console if needed):
 *   TL  52.543 N / 13.357 E
 *   TR  52.543 N / 13.431 E
 *   BR  52.492 N / 13.431 E
 *   BL  52.492 N / 13.357 E
 */
export const InteractivePlacement: Story = {
  name: '★ Interactive — place all 4 corners yourself',
  args: {
    initialState: {
      stage: 'placing_corners',
      imageUrl: BERLIN_18TH_CENTURY_MAP,
      corners: { topLeft: null, topRight: null, bottomRight: null, bottomLeft: null },
    } satisfies CalibrationState,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click four times on the map to place TL → TR → BR → BL corners. ' +
          'After the fourth click the historical plan overlays the live map. ' +
          'Drag any marker to adjust. Use the opacity slider to compare.',
      },
    },
  },
};

// ── Stage snapshots ───────────────────────────────────────────────────────────

export const Idle: Story = {
  name: 'Idle — awaiting upload',
};

export const Uploading: Story = {
  name: 'Uploading — spinner active',
  args: {
    initialState: { stage: 'uploading' } satisfies CalibrationState,
  },
};

export const PlacingCorners0: Story = {
  name: 'PlacingCorners — 0 of 4 placed',
  args: {
    initialState: {
      stage: 'placing_corners',
      imageUrl: SAMPLE_PLAN_URL,
      corners: { topLeft: null, topRight: null, bottomRight: null, bottomLeft: null },
    } satisfies CalibrationState,
  },
};

export const PlacingCorners1: Story = {
  name: 'PlacingCorners — 1 of 4 placed',
  args: {
    initialState: {
      stage: 'placing_corners',
      imageUrl: SAMPLE_PLAN_URL,
      corners: {
        topLeft: BERLIN_CORNERS.topLeft,
        topRight: null,
        bottomRight: null,
        bottomLeft: null,
      },
    } satisfies CalibrationState,
  },
};

export const PlacingCorners2: Story = {
  name: 'PlacingCorners — 2 of 4 placed',
  args: {
    initialState: {
      stage: 'placing_corners',
      imageUrl: SAMPLE_PLAN_URL,
      corners: {
        topLeft: BERLIN_CORNERS.topLeft,
        topRight: BERLIN_CORNERS.topRight,
        bottomRight: null,
        bottomLeft: null,
      },
    } satisfies CalibrationState,
  },
};

export const PlacingCorners3: Story = {
  name: 'PlacingCorners — 3 of 4 placed',
  args: {
    initialState: {
      stage: 'placing_corners',
      imageUrl: SAMPLE_PLAN_URL,
      corners: {
        topLeft: BERLIN_CORNERS.topLeft,
        topRight: BERLIN_CORNERS.topRight,
        bottomRight: BERLIN_CORNERS.bottomRight,
        bottomLeft: null,
      },
    } satisfies CalibrationState,
  },
};

export const Adjusting: Story = {
  name: 'Adjusting — all corners placed, opacity slider',
  args: {
    initialState: {
      stage: 'adjusting',
      imageUrl: BERLIN_18TH_CENTURY_MAP,
      corners: BERLIN_CORNERS,
      opacity: 0.7,
    } satisfies CalibrationState,
  },
};

export const Confirmed: Story = {
  name: 'Confirmed — overlay locked in',
  args: {
    initialState: {
      stage: 'confirmed',
      imageUrl: BERLIN_18TH_CENTURY_MAP,
      corners: BERLIN_CORNERS,
    } satisfies CalibrationState,
  },
};
