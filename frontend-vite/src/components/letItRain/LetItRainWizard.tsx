import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  IconButton, 
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { format, addDays, subDays } from 'date-fns';

import { HorizontalStepper, Calendar } from '../ui';
import { LetItRainFrequency, NotificationSettings } from './';

// Styled components
const WizardContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    height: '100vh',
    borderRadius: 0,
    padding: theme.spacing(2),
  }
}));

const WizardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  position: 'relative',
}));

const HeaderTitle = styled(Typography)(() => ({
  flex: 1,
  textAlign: 'center',
  fontWeight: 600,
}));

const WizardContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '450px',
  maxHeight: '600px',
  overflow: 'auto',
  padding: theme.spacing(2, 0),
}));

const WizardActions = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  '& .MuiButton-root': {
    padding: theme.spacing(1.5, 3),
    borderRadius: 0,
  }
}));

const FullWidthButton = styled(Button)(() => ({
  width: '100%',
}));

// Interface for the component props
interface LetItRainWizardProps {
  onComplete?: (data: WizardData) => void;
  gardenId?: string;
}

// Interface for the wizard data
interface WizardData {
  frequency: number;
  availableDates: Date[];
  notificationSettings: any;
}

// Step definition interface
interface StepDesc {
  key: string;
  title: string;
  headline: string;
  component: React.ReactNode;
}

export function LetItRainWizard({ onComplete, gardenId }: LetItRainWizardProps) {
  const { t } = useTranslation('letItRain');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { stepNumber } = useParams<{ stepNumber: string }>();
  
  // State for wizard data
  const [frequency, setFrequency] = useState<number>(1);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<any>({});
  
  // Generate calendar dates (2 weeks starting from last Monday)
  const generateCalendarDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const lastMonday = subDays(today, daysToLastMonday);
    
    // Generate 14 days starting from last Monday
    const dates: Date[] = [];
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(lastMonday, i));
    }
    
    return dates;
  };
  
  const calendarDates = generateCalendarDates();
  
  // Define the steps
  const steps: StepDesc[] = [
    {
      key: 'frequency',
      title: t('wizard.steps.frequency'),
      headline: t('wizard.headlines.frequency'),
      component: (
        <LetItRainFrequency
          frequency={frequency}
          onChange={(value) => setFrequency(value)}
        />
      )
    },
    {
      key: 'availability',
      title: t('wizard.steps.availability'),
      headline: t('wizard.headlines.availability'),
      component: (
        <Calendar
          dates={calendarDates}
          selectedDates={availableDates}
          onChange={(dates) => setAvailableDates(dates)}
        />
      )
    },
    {
      key: 'notification',
      title: t('wizard.steps.notification'),
      headline: t('wizard.headlines.notification'),
      component: (
        <NotificationSettings
          onChange={(data) => setNotificationSettings(data)}
        />
      )
    }
  ];
  
  // Get current step index
  const getCurrentStepIndex = () => {
    if (!stepNumber) return 0;
    const index = parseInt(stepNumber, 10);
    return isNaN(index) || index < 0 || index >= steps.length ? 0 : index;
  };
  
  const currentStepIndex = getCurrentStepIndex();
  const currentStep = steps[currentStepIndex];
  
  // Handle navigation
  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(`/garden/${gardenId}/watering/wizard/${currentStepIndex - 1}`);
    } else {
      navigate(`/garden/${gardenId}/watering`);
    }
  };
  
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      navigate(`/garden/${gardenId}/watering/wizard/${currentStepIndex + 1}`);
    }
  };
  
  const handleFinish = () => {
    const wizardData: WizardData = {
      frequency,
      availableDates,
      notificationSettings
    };
    
    if (onComplete) {
      onComplete(wizardData);
    }
    
    // Navigate to thank you page or back to watering
    navigate(`/garden/${gardenId}/watering/thanks`);
  };
  
  // Redirect to the correct step if the URL doesn't match
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const urlStepNumber = pathParts[pathParts.length - 1];
    
    if (urlStepNumber !== stepNumber && !isNaN(parseInt(stepNumber || '0', 10))) {
      navigate(`/garden/${gardenId}/watering/wizard/${currentStepIndex}`);
    }
  }, [location.pathname, stepNumber, currentStepIndex, navigate, gardenId]);
  
  return (
    <WizardContainer elevation={isMobile ? 0 : 3}>
      <WizardHeader>
        <IconButton 
          edge="start" 
          color="inherit" 
          onClick={handleBack}
          aria-label={t('wizard.buttons.back')}
        >
          <ArrowBackIcon />
        </IconButton>
        <HeaderTitle variant="h5">
          {currentStep.headline}
        </HeaderTitle>
      </WizardHeader>
      
      <WizardContent>
        <HorizontalStepper 
          steps={steps.map(step => step.title)}
          activeStep={currentStepIndex}
        />
        
        {currentStep.component}
      </WizardContent>
      
      <WizardActions>
        <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
          {currentStepIndex > 0 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              sx={{ flex: 1 }}
            >
              {t('wizard.buttons.back')}
            </Button>
          )}
          
          {currentStepIndex >= steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinish}
              sx={{ flex: currentStepIndex > 0 ? 2 : 1 }}
            >
              {t('wizard.buttons.finish')}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ flex: currentStepIndex > 0 ? 2 : 1 }}
            >
              {t('wizard.buttons.next')}
            </Button>
          )}
        </Box>
      </WizardActions>
    </WizardContainer>
  );
}

export default LetItRainWizard;