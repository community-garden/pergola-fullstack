/**
 * Authentication module exports
 */

// Export the AuthProvider component
export { AuthProvider } from './AuthProvider';

import config from '@config/index';
import { useAuth as useOidcAuth } from 'react-oidc-context';
import type { User } from 'oidc-client-ts';

type AuthState = Pick<ReturnType<typeof useOidcAuth>, 'isAuthenticated' | 'isLoading'> & {
  user?: User | null;
  signinRedirect: (args?: Record<string, unknown>) => Promise<void>;
  signoutRedirect: (args?: Record<string, unknown>) => Promise<void>;
};

const loginDisabled: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  signinRedirect: async () => {},
  signoutRedirect: async () => {},
};

/**
 * Auth state; without a configured OIDC authority (`config.auth.enabled`
 * false) the app has no AuthProvider and this is always "not signed in".
 * The flag is constant at runtime, so the hook order stays stable.
 */
export function useAuth(): AuthState {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return config.auth.enabled ? useOidcAuth() : loginDisabled;
}

// Export types from oidc-client-ts for convenience
export type { User } from 'oidc-client-ts';