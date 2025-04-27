import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  styled,
  FormGroup
} from '@mui/material';
import { withJsonFormsControlProps } from '@jsonforms/react';
import {
  ControlProps,
  RankedTester,
  rankWith,
  scopeEndsWith,
  and,
  isControl,
  Tester
} from '@jsonforms/core';
import { useTranslation } from 'react-i18next';

// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: '1rem',
  padding: '.5rem 1rem',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  textAlign: 'right',
  justifyContent: 'flex-end'
}));

const StyledFormGroup = styled(FormGroup)({
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const StyledNumberInput = styled(TextField)({
  width: '60px',
  marginRight: '10px',
  '& input': {
    textAlign: 'center',
  }
});

// Custom renderer for the notification methods (email, push)
export const NotificationMethodRenderer = (props: ControlProps) => {
  const { data, handleChange, path, label } = props;
  const { t } = useTranslation('letItRain');
  
  return (
    <FormControlLabel
      labelPlacement='start'
      label={t(label)}
      control={
        <Checkbox
          checked={data || false}
          onChange={(event) => handleChange(path, event.target.checked)}
        />
      }
    />
  );
};

// Custom renderer for the notification reminder settings
export const ReminderRenderer = (props: ControlProps) => {
  const { data, handleChange, path, label } = props;
  const { t } = useTranslation('letItRain');
  const isEnabled = data?.enabled || false;
  const days = data?.days || 1;
  
  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(path + '/enabled', event.target.checked);
  };
  
  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      handleChange(path + '/days', value);
    }
  };
  
  return (
    <StyledFormGroup row>
      {isEnabled && (
        <StyledNumberInput
          type="number"
          value={days}
          onChange={handleDaysChange}
          inputProps={{ min: 1, max: 30 }}
        />
      )}
      <FormControlLabel
        labelPlacement='start'
        label={isEnabled 
          ? t(days === 1 ? 'notifications.beforeEachTaskDays' : 'notifications.beforeEachTaskDays_plural', { count: days }) 
          : t(label)}
        control={
          <Checkbox
            checked={isEnabled}
            onChange={handleEnabledChange}
          />
        }
      />
    </StyledFormGroup>
  );
};

// Custom renderer for the save to profile setting
export const SaveToProfileRenderer = (props: ControlProps) => {
  const { data, handleChange, path, label } = props;
  const { t } = useTranslation('letItRain');
  
  return (
    <FormControlLabel
      label={t(label)}
      control={
        <Checkbox
          checked={data || false}
          onChange={(event) => handleChange(path, event.target.checked)}
        />
      }
    />
  );
};

// Testers for the custom renderers
// Helper function for the OR condition
function or(...testers: Tester[]): Tester {
  return (schema, schemaPath, rootSchema) => {
    return testers.some(tester => tester(schema, schemaPath, rootSchema));
  };
}

export const notificationMethodTester: RankedTester = rankWith(
  10,
  and(
    isControl,
    or(
      scopeEndsWith('email'),
      scopeEndsWith('push')
    )
  )
);

export const reminderTester: RankedTester = rankWith(
  10,
  and(
    isControl,
    or(
      scopeEndsWith('beforeEachTask'),
      scopeEndsWith('beforeEachWeek')
    )
  )
);

export const saveToProfileTester: RankedTester = rankWith(
  10,
  and(
    isControl,
    scopeEndsWith('saveToProfile')
  )
);

// Export the wrapped renderers
export const notificationMethodControlRenderer = withJsonFormsControlProps(NotificationMethodRenderer);
export const reminderControlRenderer = withJsonFormsControlProps(ReminderRenderer);
export const saveToProfileControlRenderer = withJsonFormsControlProps(SaveToProfileRenderer);