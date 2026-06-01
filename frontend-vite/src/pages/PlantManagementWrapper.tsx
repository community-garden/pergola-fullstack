import { ComingSoon } from '@components/ui/ComingSoon';
import { isFeatureEnabled, getFeatureReleaseDate } from '@config/featureFlags';
import { PlantManagement as PlantManagementOriginal } from './PlantManagementOriginal';

export const PlantManagement = () => {
  const enabled = isFeatureEnabled('plants');
  const releaseDate = getFeatureReleaseDate('plants');

  if (!enabled) {
    return (
      <ComingSoon 
        featureName="Plant Management" 
        releaseDate={releaseDate} 
      />
    );
  }

  return <PlantManagementOriginal />;
};
