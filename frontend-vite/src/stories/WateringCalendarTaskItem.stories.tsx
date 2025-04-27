import type { Meta, StoryObj } from '@storybook/react';
import { WateringCalendarTaskItem } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import { addDays, subDays } from 'date-fns';

// Meta information for the component
const meta = {
  title: 'Watering/WateringCalendarTaskItem',
  component: WateringCalendarTaskItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <div style={{ 
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px'
        }}>
          <Story />
        </div>
      </ThemeContextProvider>
    ),
  ],
  argTypes: {
    date: { control: 'date' },
    recruiterCount: { 
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Number of recruiters assigned to this day'
    },
    optimalRecruiterCount: { 
      control: { type: 'range', min: 1, max: 5, step: 1 },
      description: 'Optimal number of recruiters needed for this day'
    },
    active: { 
      control: 'boolean',
      description: 'Whether this day is currently selected'
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether this day is disabled (e.g., in the past)'
    },
    inPlannedPeriod: { 
      control: 'boolean',
      description: 'Whether this day is in a planned watering period'
    },
    cornerActive: { 
      control: 'boolean',
      description: 'Whether to show the corner badge'
    },
    size: { 
      control: { type: 'range', min: 40, max: 100, step: 10 },
      description: 'Size of the calendar item in pixels'
    },
  },
} satisfies Meta<typeof WateringCalendarTaskItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with default values
export const Default: Story = {
  args: {
    date: new Date(),
    recruiterCount: 2,
    optimalRecruiterCount: 3,
    active: false,
    disabled: false,
    inPlannedPeriod: true,
    cornerActive: false,
    size: 60,
    onSelect: () => console.log('Day selected'),
  },
};

// Active day story
export const ActiveDay: Story = {
  args: {
    ...Default.args,
    active: true,
  },
};

// Past day (disabled) story
export const PastDay: Story = {
  args: {
    ...Default.args,
    date: subDays(new Date(), 3),
    disabled: true,
  },
};

// Future day story
export const FutureDay: Story = {
  args: {
    ...Default.args,
    date: addDays(new Date(), 3),
  },
};

// Day with corner badge active
export const WithCornerBadge: Story = {
  args: {
    ...Default.args,
    cornerActive: true,
  },
};

// Day with different sizes
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 40,
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 80,
  },
};

// Day with different recruiter counts
export const NoRecruiters: Story = {
  args: {
    ...Default.args,
    recruiterCount: 0,
  },
};

export const FullyStaffed: Story = {
  args: {
    ...Default.args,
    recruiterCount: 3,
  },
};

export const Overstaffed: Story = {
  args: {
    ...Default.args,
    recruiterCount: 4,
  },
};