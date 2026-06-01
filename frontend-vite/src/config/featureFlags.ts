/**
 * Feature Flags Configuration
 * 
 * Control which features are enabled/disabled in the application.
 * Disabled features show a "Coming Soon" screen with the target release date.
 */

export interface FeatureFlag {
  enabled: boolean;
  releaseDate: string;
}

export const featureFlags: Record<string, FeatureFlag> = {
  // Features temporarily disabled - coming in July 2026
  plants: {
    enabled: false,
    releaseDate: 'July 2026',
  },
  seasonPlanner: {
    enabled: false,
    releaseDate: 'July 2026',
  },
  notifications: {
    enabled: false,
    releaseDate: 'July 2026',
  },
  
  // Always enabled features
  home: {
    enabled: true,
    releaseDate: '',
  },
  map: {
    enabled: true,
    releaseDate: '',
  },
  watering: {
    enabled: true,
    releaseDate: '',
  },
  settings: {
    enabled: true,
    releaseDate: '',
  },
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (featureName: string): boolean => {
  return featureFlags[featureName]?.enabled ?? false;
};

/**
 * Get the release date for a disabled feature
 */
export const getFeatureReleaseDate = (featureName: string): string => {
  return featureFlags[featureName]?.releaseDate ?? '';
};
