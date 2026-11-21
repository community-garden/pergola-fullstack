import { ComingSoon } from '@components/ui/ComingSoon';
import { isFeatureEnabled, getFeatureReleaseDate } from '@config/featureFlags';
import { SeasonPlanner as SeasonPlannerOriginal } from './SeasonPlannerOriginal';

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

  return <SeasonPlannerOriginal />;
};
