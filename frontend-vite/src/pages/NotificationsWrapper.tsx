import { ComingSoon } from '@components/ui/ComingSoon';
import { isFeatureEnabled, getFeatureReleaseDate } from '@config/featureFlags';

const Notifications = () => {
  const enabled = isFeatureEnabled('notifications');
  const releaseDate = getFeatureReleaseDate('notifications');

  if (!enabled) {
    return (
      <ComingSoon 
        featureName="Notifications & Calendar" 
        releaseDate={releaseDate} 
      />
    );
  }

  // Import the original component only when needed
  const { default: NotificationsOriginal } = require('./NotificationsOriginal');
  return <NotificationsOriginal />;
};

export default Notifications;
