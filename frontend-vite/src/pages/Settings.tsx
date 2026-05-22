import { Box, Typography, Paper, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, styled, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { GenericForm } from '@graviola/semantic-json-form';
import { useCurrentGarden } from '@hooks/index';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { gardenIRI } = useCurrentGarden();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (event: any) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        {t('navigation:settings')}
      </Typography>
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          Garden Settings
        </Typography>
        {gardenIRI ? (
          <Container>
            <GenericForm
              entityIRI={gardenIRI}
              typeName="Garden"
              wrapWithinCard={false}
            />
          </Container>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No garden ID found in the current route.
          </Typography>
        )}
      </ContentPaper>
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          Application Settings
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={t('common:settings.language')} 
              secondary={t('common:settings.language') === 'Language' ? 
                'Select your preferred language' : 
                'Wählen Sie Ihre bevorzugte Sprache'}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="language-select-label">{t('common:settings.language')}</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label={t('common:settings.language')}
                onChange={handleLanguageChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </ContentPaper>
    </Box>
  );
};

export default Settings