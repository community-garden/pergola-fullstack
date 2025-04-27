import type { Meta, StoryObj } from '@storybook/react';
import { LetItRainWizard } from '../components/letItRain';
import { ThemeContextProvider } from '../theme/index';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Meta information for the component
const meta = {
  title: 'Watering/LetItRainWizard',
  component: LetItRainWizard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/garden/123/watering/wizard/0']}>
            <Routes>
              <Route 
                path="/garden/:gardenId/watering/wizard/:stepNumber" 
                element={<Story />} 
              />
              <Route 
                path="/garden/:gardenId/watering/thanks" 
                element={<div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Thank you!</h2>
                  <p>Your watering preferences have been saved.</p>
                </div>} 
              />
              <Route 
                path="/garden/:gardenId/watering" 
                element={<div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Watering Page</h2>
                  <p>You've been redirected to the watering page.</p>
                </div>} 
              />
            </Routes>
          </MemoryRouter>
        </I18nextProvider>
      </ThemeContextProvider>
    ),
  ],
} satisfies Meta<typeof LetItRainWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    gardenId: '123',
    onComplete: (data) => console.log('Wizard completed with data:', data),
  },
};

// Story starting at step 1
export const Step1: Story = {
  args: {
    gardenId: '123',
    onComplete: (data) => console.log('Wizard completed with data:', data),
  },
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/garden/123/watering/wizard/1']}>
            <Routes>
              <Route 
                path="/garden/:gardenId/watering/wizard/:stepNumber" 
                element={<Story />} 
              />
              <Route 
                path="/garden/:gardenId/watering/thanks" 
                element={<div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Thank you!</h2>
                  <p>Your watering preferences have been saved.</p>
                </div>} 
              />
              <Route 
                path="/garden/:gardenId/watering" 
                element={<div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Watering Page</h2>
                  <p>You've been redirected to the watering page.</p>
                </div>} 
              />
            </Routes>
          </MemoryRouter>
        </I18nextProvider>
      </ThemeContextProvider>
    ),
  ],
};

// Story starting at step 2
export const Step2: Story = {
  args: {
    gardenId: '123',
    onComplete: (data) => console.log('Wizard completed with data:', data),
  },
  decorators: [
    (Story) => (
      <ThemeContextProvider>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter initialEntries={['/garden/123/watering/wizard/2']}>
            <Routes>
              <Route 
                path="/garden/:gardenId/watering/wizard/:stepNumber" 
                element={<Story />} 
              />
              <Route 
                path="/garden/:gardenId/watering/thanks" 
                element={<div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Thank you!</h2>
                  <p>Your watering preferences have been saved.</p>
                </div>} 
              />
              <Route 
                path="/garden/:gardenId/watering" 
                element={<div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Watering Page</h2>
                  <p>You've been redirected to the watering page.</p>
                </div>} 
              />
            </Routes>
          </MemoryRouter>
        </I18nextProvider>
      </ThemeContextProvider>
    ),
  ],
};

// Mobile view story
export const MobileView: Story = {
  args: {
    gardenId: '123',
    onComplete: (data) => console.log('Wizard completed with data:', data),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};