import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Box } from '@mui/material';
import { NewFeatureToast } from '../components/garden/NewFeatureToast';

const meta = {
  title: 'Garden/NewFeatureToast',
  component: NewFeatureToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box
        sx={{
          bgcolor: 'primary.main',
          p: 2,
          borderRadius: 1,
          minWidth: 300,
        }}
      >
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof NewFeatureToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSpecifyFeature: action('onSpecifyFeature'),
    onDismiss: action('onDismiss'),
  },
};

export const Interactive: Story = {
  args: {
    onSpecifyFeature: () => {
      alert('User wants to specify the feature!');
    },
    onDismiss: () => {
      alert('User dismissed the notification');
    },
  },
};

