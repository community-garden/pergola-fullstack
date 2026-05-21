import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { addDays, subDays, format } from 'date-fns';
import { WateringPlanDetailModal } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import type { PlanAssignment } from '../hooks/useWateringPlan';

const BASE = 'https://data.semantic-desk.top/garden/Person/';

const PERSON_IRIS = {
  max: `${BASE}person-max`,
  eva: `${BASE}person-eva`,
  petra: `${BASE}person-petra`,
  franz: `${BASE}person-franz`,
};

const PERSON_NAMES: Record<string, string> = {
  [PERSON_IRIS.max]: 'GärtnerMax',
  [PERSON_IRIS.eva]: 'PflanzenfeeEva',
  [PERSON_IRIS.petra]: 'PetraGärtnerin',
  [PERSON_IRIS.franz]: 'FranzKompost',
};

function makeAssignments(): PlanAssignment[] {
  const today = new Date();
  const entries: PlanAssignment[] = [];
  const persons = Object.values(PERSON_IRIS);

  for (let offset = -25; offset <= 5; offset += 3) {
    const date = format(addDays(today, offset), 'yyyy-MM-dd');
    const assigned = persons.slice(0, (Math.abs(offset) % 3) + 1);
    assigned.forEach((personIri) => entries.push({ date, personIri }));
  }
  return entries;
}

const MOCK_ASSIGNMENTS = makeAssignments();

const meta = {
  title: 'Watering/WateringPlanDetailModal',
  component: WateringPlanDetailModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
  ],
} satisfies Meta<typeof WateringPlanDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function OpenableWrapper(props: Omit<React.ComponentProps<typeof WateringPlanDetailModal>, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Open Modal</Button>
      <WateringPlanDetailModal {...props} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export const WithAssignments: Story = {
  render: (args) => <OpenableWrapper {...args} />,
  args: {
    assignments: MOCK_ASSIGNMENTS,
    personNames: PERSON_NAMES,
    open: true,
    onClose: () => {},
  },
};

export const Empty: Story = {
  render: (args) => <OpenableWrapper {...args} />,
  args: {
    assignments: [],
    personNames: {},
    open: true,
    onClose: () => {},
  },
};

export const SingleGardenerPerDay: Story = {
  render: (args) => <OpenableWrapper {...args} />,
  args: {
    assignments: [
      { date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), personIri: PERSON_IRIS.max },
      { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), personIri: PERSON_IRIS.eva },
      { date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), personIri: PERSON_IRIS.petra },
    ],
    personNames: PERSON_NAMES,
    open: true,
    onClose: () => {},
  },
};
