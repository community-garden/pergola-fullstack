import type { Meta, StoryObj } from '@storybook/react';
import { LetItRainFrequency } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Meta information for the component
const meta = {
  title: 'Watering/LetItRainFrequency',
  component: LetItRainFrequency,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <I18nextProvider i18n={i18n}>
          <div style={{ 
            width: '500px', 
            height: '400px', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            padding: '20px'
          }}>
            <Story />
          </div>
        </I18nextProvider>
      </ThemeContextProvider>
    ),
  ],
} satisfies Meta<typeof LetItRainFrequency>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    frequency: 3,
  },
};

// Story with different frequency
export const HighFrequency: Story = {
  args: {
    frequency: 6,
  },
};

// Story with minimum frequency
export const MinimumFrequency: Story = {
  args: {
    frequency: 1,
  },
};

// Story with maximum frequency
export const MaximumFrequency: Story = {
  args: {
    frequency: 7,
  },
};

// Story with interactive controls
export const Interactive: Story = {
  args: {
    frequency: 4,
    onChange: (value) => console.log(`Frequency changed to: ${value}`),
  },
};