import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NewFeatureWizard } from '../components/garden/NewFeatureWizard';

const meta = {
  title: 'Garden/NewFeatureWizard',
  component: NewFeatureWizard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewFeatureWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFeatureSelect: action('onFeatureSelect'),
  },
};

export const WithCallback: Story = {
  args: {
    onFeatureSelect: (feature) => {
      console.log('Selected feature:', feature);
      alert(`Sie haben "${feature}" ausgewählt`);
    },
  },
};

