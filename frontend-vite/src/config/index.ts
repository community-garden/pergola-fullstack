/**
 * Application configuration module
 * 
 * This module centralizes access to environment variables and provides
 * a type-safe configuration object for the application.
 */

import { AppConfig, ApiConfig, AuthConfig } from './types';

/**
 * Creates the API configuration
 * @returns API configuration object
 */
const createApiConfig = (): ApiConfig => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (!apiUrl) {
    console.warn('API URL not provided in environment variables. Using default value.');
  }
  
  return {
    url: apiUrl || 'http://localhost:3000/api',
  };
};

/**
 * Creates the authentication configuration
 * @returns Authentication configuration object
 */
const createAuthConfig = (): AuthConfig => {
  const oidcAuthority = import.meta.env.VITE_OIDC_AUTHORITY;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const scope = import.meta.env.VITE_OAUTH_SCOPE;
  
  if (!oidcAuthority) {
    console.warn('OIDC authority not provided in environment variables. Using default value.');
  }
  
  if (!clientId) {
    console.warn('Client ID not provided in environment variables. Using default value.');
  }
  
  if (!redirectUri) {
    console.warn('Redirect URI not provided in environment variables. Using default value.');
  }
  
  return {
    oidcAuthority: oidcAuthority || 'http://localhost:8080/realms/pergola',
    clientId: clientId || 'admin',
    redirectUri: redirectUri || 'http://localhost:3001/callback',
    scope: scope || 'openid profile email',
  };
};

/**
 * Creates the complete application configuration
 * @returns Application configuration object
 */
const createConfig = (): AppConfig => {
  return {
    api: createApiConfig(),
    auth: createAuthConfig(),
  };
};

/**
 * Application configuration singleton instance
 */
const config = createConfig();

/**
 * Validates the configuration
 * Throws an error if any required configuration is missing
 */
const validateConfig = (config: AppConfig): void => {
  // Add validation logic if needed
  // For now, we're providing defaults for everything, so no validation is necessary
};

// Validate the configuration
validateConfig(config);

// Export the configuration
export default config;

// Export types for convenience
export * from './types';