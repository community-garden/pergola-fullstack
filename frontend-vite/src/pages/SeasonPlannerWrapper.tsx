import { ComingSoon } from '@components/ui/ComingSoon';
import { isFeatureEnabled, getFeatureReleaseDate } from '@config/featureFlags';

export const SeasonPlanner = () => {
  const enabled = isFeatureEnabled('seasonPlanner');
  const releaseDate = getFeatureReleaseDate('seasonPlanner');

  if (!enabled) {
    return (
      <ComingSoon 
        featureName="Season Planner" 
        releaseDate={releaseDate} 
      />
    );
  }

  // Import the original component only when needed
  const { SeasonPlanner: SeasonPlannerOriginal } = require('./SeasonPlannerOriginal');
  return <SeasonPlannerOriginal />;
};
