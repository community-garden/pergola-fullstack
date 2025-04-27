import {
  Box,
  Typography,
  Paper,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { WateringCalendar } from '../components/letItRain';
import { Link, useParams } from 'react-router-dom';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const InfoButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginLeft: theme.spacing(1),
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1, 3),
  marginTop: theme.spacing(2),
}));

const Watering = () => {
  const { t } = useTranslation(['watering', 'common']);
  const { gardenId } = useParams<{ gardenId: string }>();
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOpenHelpDialog = () => {
    setHelpDialogOpen(true);
  };

  const handleCloseHelpDialog = () => {
    setHelpDialogOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Help Dialog */}
      <Dialog open={helpDialogOpen} onClose={handleCloseHelpDialog} maxWidth="md">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{t('watering:page.helpDialog.title')}</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseHelpDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>{t('watering:page.helpDialog.stepsTitle')}</Typography>
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            {t('watering:page.helpDialog.step1.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('watering:page.helpDialog.step1.description')}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t('watering:page.helpDialog.step2.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('watering:page.helpDialog.step2.description')}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t('watering:page.helpDialog.step3.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('watering:page.helpDialog.step3.description')}
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('watering:page.helpDialog.conclusion')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHelpDialog} color="primary">
            {t('watering:page.helpDialog.closeButton')}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Info Area */}
      <ContentPaper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">
              {t('watering:page.infoArea.title')}
            </Typography>
            <InfoButton onClick={handleOpenHelpDialog}>
              <InfoIcon />
            </InfoButton>
          </Box>
          <Link to={`/${gardenId || ''}/watering/wizard`} style={{ textDecoration: 'none' }}>
            <RegisterButton variant="contained" color="primary" size="large">
              {t('watering:page.infoArea.registerButton')}
            </RegisterButton>
          </Link>
        </Box>
        <Typography variant="body1">
          {t('watering:page.infoArea.description')}
        </Typography>
      </ContentPaper>
      
      
      {/* Watering Calendar */}
        <Box sx={{ mb: 2 }}>
          <WateringCalendar
            variant="horizontal"
            preselectedDate={selectedDate}
            onDateChange={handleDateChange}
            allowVariantToggle={false}
          />
        </Box>
      
    </Box>
  );
};

export default Watering;