import { Stepper, Step, StepLabel, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface HorizontalStepperProps {
  steps: string[];
  activeStep: number;
}

const StyledStepper = styled(Stepper)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  }
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontSize: '0.875rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    }
  },
  '& .MuiStepLabel-label.Mui-active': {
    fontWeight: 600,
    color: theme.palette.primary.main
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: theme.palette.text.secondary
  }
}));

export function HorizontalStepper({ steps, activeStep }: HorizontalStepperProps) {
  const { t } = useTranslation();

  return (
    <StyledStepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StyledStepLabel>{t(label)}</StyledStepLabel>
        </Step>
      ))}
    </StyledStepper>
  );
}

export default HorizontalStepper;