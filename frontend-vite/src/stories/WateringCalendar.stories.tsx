import type { Meta, StoryObj } from '@storybook/react';
import { WateringCalendar } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import { addDays, subDays } from 'date-fns';

// Meta information for the component
const meta = {
  title: 'Watering/WateringCalendar',
  component: WateringCalendar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <div style={{ 
          padding: '20px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <Story />
        </div>
      </ThemeContextProvider>
    ),
  ],
  argTypes: {
    preselectedDate: { control: 'date' },
    variant: { 
      control: 'radio',
      options: ['horizontal', 'table'],
      description: 'The display variant of the calendar'
    },
    dayCount: { 
      control: { type: 'range', min: 7, max: 90, step: 7 },
      description: 'Number of days to display in horizontal view (before and after selected date)'
    },
    monthCount: { 
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Number of months to display in table view'
    },
    allowVariantToggle: { 
      control: 'boolean',
      description: 'Whether to show the variant toggle buttons'
    },
  },
} satisfies Meta<typeof WateringCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Horizontal view story
export const HorizontalView: Story = {
  args: {
    preselectedDate: new Date(),
    variant: 'horizontal',
    dayCount: 45,
    monthCount: 3,
    allowVariantToggle: true,
    onDateChange: (date) => console.log('Date selected:', date),
  },
};

// Table view story
export const TableView: Story = {
  args: {
    ...HorizontalView.args,
    variant: 'table',
  },
};

// With past date selected
export const PastDateSelected: Story = {
  args: {
    ...HorizontalView.args,
    preselectedDate: subDays(new Date(), 10),
  },
};

// With future date selected
export const FutureDateSelected: Story = {
  args: {
    ...HorizontalView.args,
    preselectedDate: addDays(new Date(), 10),
  },
};

// Horizontal view with fewer days
export const HorizontalCompact: Story = {
  args: {
    ...HorizontalView.args,
    dayCount: 14,
  },
};

// Table view with more months
export const TableExtended: Story = {
  args: {
    ...TableView.args,
    monthCount: 6,
  },
};

// Without variant toggle
export const FixedVariant: Story = {
  args: {
    ...HorizontalView.args,
    allowVariantToggle: false,
  },
};