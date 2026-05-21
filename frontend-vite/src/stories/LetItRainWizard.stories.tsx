import type { Meta, StoryObj } from '@storybook/react';
import { LetItRainWizard } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import { withRouter } from '../../.storybook/StoryProvider';

const WIZARD_PATH = '/garden/:gardenId/watering/wizard/:stepNumber';

const meta = {
  title: 'Watering/LetItRainWizard',
  component: LetItRainWizard,
  parameters: {
    layout: 'fullscreen',
    router: {
      initialEntry: '/garden/123/watering/wizard/0',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
    withRouter({ path: WIZARD_PATH }),
  ],
  args: {
    gardenId: '123',
    onComplete: (data: any) => console.log('Wizard completed with data:', data),
  },
} satisfies Meta<typeof LetItRainWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Step1: Story = {
  parameters: {
    router: { initialEntry: '/garden/123/watering/wizard/1' },
  },
};

export const Step2: Story = {
  parameters: {
    router: { initialEntry: '/garden/123/watering/wizard/2' },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    router: { initialEntry: '/garden/123/watering/wizard/0' },
  },
};
