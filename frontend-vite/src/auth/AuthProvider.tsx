import { ReactNode } from 'react';
import { AuthProvider as OidcProvider } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';
import config from '@config/index';

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  /** Child components */
  children: ReactNode;
}

/**
 * Authentication provider component
 * 
 * Wraps the application with an OIDC authentication provider
 * using configuration from the global config module.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // OIDC configuration from the global config
  const oidcConfig = {
    authority: config.auth.oidcAuthority,
    client_id: config.auth.clientId,
    redirect_uri: config.auth.redirectUri,
    response_type: 'code',
    scope: config.auth.scope,
    loadUserInfo: true,
    userStore: typeof window !== "undefined" && new WebStorageStateStore({ store: window.localStorage }),
    onSigninCallback: () => {
      // Remove the query parameters from the URL after login
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    },
  };

  return (
    <OidcProvider {...oidcConfig}>
      {children}
    </OidcProvider>
  );
}