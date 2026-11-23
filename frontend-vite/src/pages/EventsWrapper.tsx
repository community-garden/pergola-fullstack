import { ComingSoon } from '@components/ui/ComingSoon';
import { isFeatureEnabled, getFeatureReleaseDate } from '@config/featureFlags';
import { Events as EventsOriginal } from './EventsOriginal';

export const Events = () => {
  if (!isFeatureEnabled('events')) {
    return <ComingSoon featureName="Events" releaseDate={getFeatureReleaseDate('events')} />;
  }

  return <EventsOriginal />;
};
