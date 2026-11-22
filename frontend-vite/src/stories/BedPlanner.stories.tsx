import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { action } from 'storybook/actions';
import { ThemeContextProvider } from '../theme/index';
import { BedPlanner } from '../components/bed-planner/BedPlanner';
import { useBedPlanState } from '../components/bed-planner/useBedPlanState';
import type { BedPlanData } from '../components/bed-planner/types';
import { IGEL_PLACEMENTS, IGEL_STRIPS, igelData, kaeferData } from './fixtures/bedPlanner';

/**
 * Bed planner prototype: everything stays in memory (useBedPlanState);
 * every change is logged in the Actions panel.
 */
const log = action('bed plan');

const StatefulBedPlanner = ({ initial }: { initial: BedPlanData }) => {
  const { data, api } = useBedPlanState(initial, (name, payload) => log(name, payload));
  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <BedPlanner {...data} api={api} />
    </Box>
  );
};

const meta = {
  title: 'BedPlanner/BedPlanner',
  component: StatefulBedPlanner,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
  ],
} satisfies Meta<typeof StatefulBedPlanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Igel-Beet 2027 as planned in the workshop, nothing placed yet. */
export const Empty: Story = {
  args: { initial: igelData() },
};

/** Rows of carrots and garlic, a pumpkin — and two carrots closer than their spacing (red). */
export const Placed: Story = {
  args: { initial: igelData(IGEL_PLACEMENTS) },
};

/**
 * The workshop sketch with rows and areas: carrots in two areas, maize in two
 * rows, pumpkins, radishes as pre-crop and a row of garlic. Drag a label to
 * move its row; click a row to change its spacing. The pumpkins are red: they
 * grow under the maize, closer than their spacing.
 */
export const RowsAndAreas: Story = {
  args: { initial: igelData(IGEL_STRIPS) },
};

/** Käfer-Beet: six corners; the north-east of its bounding box is not bed. Kamille has no known spacing. */
export const IrregularBed: Story = {
  args: { initial: kaeferData() },
};

/** Phone: the list is a drawer behind the "Pflanzen" button; choose a plant, then tap into the bed. */
export const Mobile: Story = {
  args: { initial: igelData(IGEL_PLACEMENTS) },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};
