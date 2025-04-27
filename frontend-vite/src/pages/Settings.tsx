import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppDispatch } from '@store/index';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const Settings = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
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
      
      <ContentPaper>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" paragraph>
          Pergola - Garden Management App
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Version 1.0.0
        </Typography>
      </ContentPaper>
    </Box>
  );
};

export default Settings