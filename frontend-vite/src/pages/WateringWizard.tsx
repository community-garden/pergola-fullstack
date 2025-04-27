import { useNavigate, useParams } from 'react-router-dom';
import { LetItRainWizard } from '../components/letItRain';
import { WizardData } from '@components/letItRain/LetItRainWizard';


const WateringWizard = () => {
  const navigate = useNavigate();
  const { gardenId } = useParams<{ gardenId?: string, stepNumber?: string }>();
  

  const handleFinish = ({ frequency, availableDates, notificationSettings }: WizardData) => {
    // In a real implementation, this would save the data to the backend
    console.log('Saving data:', {
      frequency,
      availableDates,
      notificationSettings
    });
    
    // Navigate back to the watering page
    navigate(`/${gardenId || ''}/watering`);
  };

  return (
   <LetItRainWizard
    onComplete={handleFinish}
    gardenId={gardenId}
   />
  );
};

export default WateringWizard;
