/**
 * Type definitions for the application configuration
 */

/**
 * API configuration
 */
export interface ApiConfig {
  /** Base URL for API requests */
  url: string;
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  /** Whether OIDC login is configured (authority and client id set) */
  enabled: boolean;
  /** OIDC authority URL */
  oidcAuthority: string;
  /** Client ID for the application */
  clientId: string;
  /** Redirect URI after authentication */
  redirectUri: string;
  /** OAuth scope */
  scope: string;
}

/**
 * Complete application configuration
 */
export interface AppConfig {
  /** API configuration */
  api: ApiConfig;
  /** Authentication configuration */
  auth: AuthConfig;
  /** Knowledge-base proxy URL (empty = fetch the APIs directly) */
  kbProxyUrl: string;
}

/**
 * Environment variables provided by Vite
 * This interface extends the ImportMetaEnv interface from Vite
 */
export interface EnvVariables {
  /** API URL */
  VITE_API_URL?: string;
  /** OIDC Authority URL */
  VITE_OIDC_AUTHORITY?: string;
  /** Client ID */
  VITE_CLIENT_ID?: string;
  /** Redirect URI */
  VITE_REDIRECT_URI?: string;
  /** OAuth scope */
  VITE_OAUTH_SCOPE?: string;
  /** Optional proxy for knowledge-base requests */
  VITE_KB_PROXY_URL?: string;
}

// Extend the ImportMeta interface
declare global {
  interface ImportMeta {
    readonly env: EnvVariables;
  }
}