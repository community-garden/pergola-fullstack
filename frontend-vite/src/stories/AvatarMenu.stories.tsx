import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { UiState } from '@store/slices/uiSlice';
import React from 'react';

// Import the component directly to avoid the actual hook being used
import { AvatarMenu as ActualAvatarMenu } from '@components/ui/AvatarMenu';

// Create a mock version of the component that doesn't use the real auth hook
const MockedAvatarMenu = ({
  isAuthenticated = false,
  isAdmin = false
}: {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}) => {
  // Create a mock store
  const store = configureStore({
    reducer: {
      ui: uiReducer,
    },
    preloadedState: {
      ui: {
        themeMode: 'light',
        gardenId: null,
      } as UiState,
    },
  });

  // Create a wrapper component that provides the mocked auth context
  const MockedComponent = () => {
    // Mock the useAuth hook result
    const mockAuthHook = {
      isAuthenticated,
      user: isAuthenticated ? {
        profile: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          roles: isAdmin ? ['admin'] : ['user'],
        }
      } : null,
      signinRedirect: () => console.log('Sign in redirect'),
      signoutRedirect: () => console.log('Sign out redirect'),
    };

    // Replace the actual useAuth hook with our mock
    // This is a bit of a hack, but it works for Storybook
    const originalModule = require('@auth/index');
    const useAuthMock = () => mockAuthHook;

    // Create a component that uses our mocked hook
    const MockedAvatarMenu = (props: any) => {
      // Replace the module temporarily
      const originalUseAuth = originalModule.useAuth;
      originalModule.useAuth = useAuthMock;
      
      // Render with the mock
      try {
        return <ActualAvatarMenu {...props} />;
      } finally {
        // Restore the original to avoid affecting other stories
        originalModule.useAuth = originalUseAuth;
      }
    };

    return <MockedAvatarMenu />;
  };

  return (
    <Provider store={store}>
      <MockedComponent />
    </Provider>
  );
};

const meta = {
  title: 'Components/AvatarMenu',
  component: MockedAvatarMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MockedAvatarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Not logged in story
export const NotLoggedIn: Story = {
  args: {
    isAuthenticated: false,
  },
};

// Logged in as regular user story
export const LoggedInUser: Story = {
  args: {
    isAuthenticated: true,
    isAdmin: false,
  },
};

// Logged in as admin story
export const LoggedInAdmin: Story = {
  args: {
    isAuthenticated: true,
    isAdmin: true,
  },
};
