/**
 * Authentication module exports
 */

// Export the AuthProvider component
export { AuthProvider } from './AuthProvider';

// Export the useAuth hook from react-oidc-context
export { useAuth } from 'react-oidc-context';

// Export types from oidc-client-ts for convenience
export type { User } from 'oidc-client-ts';