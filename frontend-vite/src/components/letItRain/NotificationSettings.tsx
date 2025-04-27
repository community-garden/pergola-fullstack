import { Box, Typography, styled } from '@mui/material';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  notificationSchema, 
  notificationUiSchema, 
  initialData 
} from './NotificationSettingsSchema';
import {
  notificationMethodControlRenderer,
  notificationMethodTester,
  reminderControlRenderer,
  reminderTester,
  saveToProfileControlRenderer,
  saveToProfileTester
} from './NotificationSettingsRenderers';

// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '& .MuiFormControl-root': {
    marginBottom: theme.spacing(2)
  }
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3)
}));

// Custom renderers for JSONForms
const renderers = [
  ...materialRenderers,
  { tester: notificationMethodTester, renderer: notificationMethodControlRenderer },
  { tester: reminderTester, renderer: reminderControlRenderer },
  { tester: saveToProfileTester, renderer: saveToProfileControlRenderer }
];

interface NotificationSettingsProps {
  onChange?: (data: any) => void;
  initialSettings?: any;
}

export function NotificationSettings({ onChange, initialSettings }: NotificationSettingsProps) {
  const { t, i18n } = useTranslation('letItRain');
  const [data, setData] = useState(initialSettings || initialData);

  const handleChange = (newData: any) => {
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };


  return (
    <StyledBox>
      <StyledHeading variant="h3">
        {t('notifications.question')}
      </StyledHeading>
      
      <JsonForms
        schema={notificationSchema}
        uischema={notificationUiSchema(t)}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data }) => handleChange(data)}
      />
    </StyledBox>
  );
}

export default NotificationSettings;