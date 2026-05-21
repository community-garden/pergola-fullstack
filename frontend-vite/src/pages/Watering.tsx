import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { WateringCalendar, WateringPlanDetailModal } from '../components/letItRain';
import { Link, useParams } from 'react-router-dom';
import { useWateringPlan, nextMonthYYYYMM } from '../hooks/useWateringPlan';
import { useLocalUser } from '../hooks/useLocalUser';

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

const DATA_BASE = 'https://data.semantic-desk.top/garden/';

const Watering = () => {
  const { t } = useTranslation(['watering', 'common']);
  const { gardenId } = useParams<{ gardenId: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calculating, setCalculating] = useState(false);

  const nextMonth = nextMonthYYYYMM();
  const { personId } = useLocalUser();
  const { assignments, personNames, calculatedAt, refetch } = useWateringPlan(gardenId, nextMonth);

  const myPersonIri = `${DATA_BASE}Person/${personId}`;

  const handleCalculatePlan = async () => {
    if (!gardenId) return;
    const gardenIri = `${DATA_BASE}Garden/${gardenId}`;
    setCalculating(true);
    try {
      const res = await fetch('/api/watering/plan/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gardenIri, targetMonth: nextMonth }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      enqueueSnackbar(t('watering:planManagement.calculated'), { variant: 'success' });
      refetch();
    } catch {
      enqueueSnackbar(t('watering:planManagement.calculateError'), { variant: 'error' });
    } finally {
      setCalculating(false);
    }
  };

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
      
      
      {/* Plan Management */}
      <ContentPaper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6">{t('watering:planManagement.title')}</Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={calculating}
            startIcon={calculating ? <CircularProgress size={16} color="inherit" /> : undefined}
            onClick={handleCalculatePlan}
            data-cy="calculate-plan-button"
          >
            {calculatedAt
              ? t('watering:planManagement.recalculateFor', { month: format(new Date(nextMonth + '-01'), 'MMMM yyyy') })
              : t('watering:planManagement.calculateFor', { month: format(new Date(nextMonth + '-01'), 'MMMM yyyy') })}
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {calculatedAt
            ? t('watering:planManagement.calculatedAt', { date: format(new Date(calculatedAt), 'd MMM yyyy, HH:mm') })
            : t('watering:planManagement.noCurrentPlan', { month: format(new Date(nextMonth + '-01'), 'MMMM yyyy') })}
        </Typography>
        {calculatedAt && (
          <Typography variant="body2" color="text.secondary">
            {t('watering:planManagement.assignmentCount', { count: assignments.length })}
          </Typography>
        )}
      </ContentPaper>

      {/* Plan Detail Modal */}
      <WateringPlanDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        assignments={assignments}
        personNames={personNames}
      />

      {/* Watering Calendar */}
      <ContentPaper sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<TableRowsIcon />}
            onClick={() => setDetailOpen(true)}
            data-cy="plan-detail-button"
          >
            {t('watering:plan.detailButton')}
          </Button>
        </Box>
        <WateringCalendar
          variant="horizontal"
          preselectedDate={selectedDate}
          onDateChange={handleDateChange}
          allowVariantToggle={false}
          assignments={assignments}
          personIri={myPersonIri}
        />
      </ContentPaper>

    </Box>
  );
};

export default Watering;