# Feature Flags - Pergola

## Overview

This document describes the feature flag system used to temporarily disable features that are not yet ready for production use.

## Disabled Features (as of May 2026)

The following features are temporarily disabled and will be available in **July 2026**:

1. **Plant Management** (`/plants`) - Plant species management and catalog
2. **Season Planner** (`/season-planner`) - Seasonal planning and scheduling
3. **Notifications & Calendar** (`/notifications`) - Garden notifications and calendar integration

## How It Works

### Frontend-Vite (New Frontend)

Feature flags are configured in `frontend-vite/src/config/featureFlags.ts`:

```typescript
export const featureFlags: Record<string, FeatureFlag> = {
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
};
```

When a feature is disabled:
- Navigation menu items show a "July 2026" chip indicator
- Clicking on disabled features shows a "Coming Soon" screen
- The original component code is preserved in `*Original.tsx` files

### Frontend (Old Frontend)

Feature flags are hardcoded in individual page components. See `frontend/src/pages/CalendarAndNotifications.tsx` for an example.

## Enabling Features

To enable a feature when it's ready:

### For frontend-vite:

1. Edit `frontend-vite/src/config/featureFlags.ts`
2. Set `enabled: true` for the feature
3. The feature will automatically become accessible

Example:
```typescript
plants: {
  enabled: true,  // Changed from false
  releaseDate: 'July 2026',
},
```

### For frontend:

1. Edit the respective page component
2. Set the `*_ENABLED` flag to `true`
3. Uncomment the original implementation

## File Structure

```
frontend-vite/src/
├── config/
│   └── featureFlags.ts           # Feature flag configuration
├── components/
│   └── ui/
│       └── ComingSoon.tsx        # Reusable "Coming Soon" component
└── pages/
    ├── PlantManagementOriginal.tsx  # Original implementation
    ├── PlantManagementWrapper.tsx   # Feature flag wrapper
    ├── SeasonPlannerOriginal.tsx    # Original implementation
    ├── SeasonPlannerWrapper.tsx     # Feature flag wrapper
    ├── NotificationsOriginal.tsx    # Original implementation
    ├── NotificationsWrapper.tsx     # Feature flag wrapper
    └── index.ts                     # Exports wrapper versions
```

## User Experience

When users navigate to a disabled feature:
1. They see a friendly "Coming Soon" message
2. The message displays the feature name and target release date
3. A visual indicator explains the feature is in development

## Technical Notes

- Wrapper components use lazy loading for original components to avoid bundling unused code
- Navigation items for disabled features are visually marked but still clickable
- All original functionality is preserved and can be re-enabled by flipping the flag

## Future Improvements

Consider implementing:
- Remote feature flags (via API)
- A/B testing support
- Gradual rollouts
- User-specific feature access
