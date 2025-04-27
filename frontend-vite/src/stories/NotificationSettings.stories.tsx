import type { Meta, StoryObj } from '@storybook/react';
import { NotificationSettings } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Meta information for the component
const meta = {
  title: 'Watering/NotificationSettings',
  component: NotificationSettings,
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
            height: '500px', 
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
} satisfies Meta<typeof NotificationSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {},
};

// Story with pre-filled data
export const WithEmailEnabled: Story = {
  args: {
    initialSettings: {
      notificationMethods: {
        email: true,
        push: false
      },
      reminders: {
        beforeEachTask: {
          enabled: true,
          days: 2
        },
        beforeEachWeek: {
          enabled: false,
          days: 1
        }
      },
      saveToProfile: false
    }
  },
};

// Story with push notifications enabled
export const WithPushEnabled: Story = {
  args: {
    initialSettings: {
      notificationMethods: {
        email: false,
        push: true
      },
      reminders: {
        beforeEachTask: {
          enabled: false,
          days: 1
        },
        beforeEachWeek: {
          enabled: true,
          days: 3
        }
      },
      saveToProfile: true
    }
  },
};

// Story with all options enabled
export const AllEnabled: Story = {
  args: {
    initialSettings: {
      notificationMethods: {
        email: true,
        push: true
      },
      reminders: {
        beforeEachTask: {
          enabled: true,
          days: 2
        },
        beforeEachWeek: {
          enabled: true,
          days: 3
        }
      },
      saveToProfile: true
    }
  },
};

// Story with interactive onChange handler
export const Interactive: Story = {
  args: {
    onChange: (data) => console.log('Notification settings changed:', data),
  },
};