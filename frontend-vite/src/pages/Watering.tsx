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
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { WateringCalendar, WateringPlanDetailModal } from '../components/letItRain';
import { Link, useParams } from 'react-router-dom';
import { useWateringPlan, nextMonthYYYYMM } from '../hooks/useWateringPlan';
import { useLocalUser } from '../hooks/useLocalUser';
import { useDateFnsLocale } from '../hooks';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const DATA_BASE = 'https://data.semantic-desk.top/garden/';

const Watering = () => {
  const { t } = useTranslation(['watering', 'common']);
  const locale = useDateFnsLocale();
  const { gardenId } = useParams<{ gardenId: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calculating, setCalculating] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const nextMonth = nextMonthYYYYMM();
  const { personId } = useLocalUser();
  const myPersonIri = `${DATA_BASE}Person/${personId}`;
  const { assignments, personNames, myAvailableDates, calculatedAt, refetch } = useWateringPlan(
    gardenId,
    nextMonth,
    myPersonIri
  );

  const nextMonthLabel = format(new Date(nextMonth + '-01'), 'MMMM yyyy', { locale });

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuCalculate = () => {
    handleMenuClose();
    if (calculatedAt) {
      setConfirmOpen(true);
    } else {
      handleCalculatePlan();
    }
  };

  const handleConfirmRecalculate = () => {
    setConfirmOpen(false);
    handleCalculatePlan();
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Help Dialog */}
      <Dialog open={helpDialogOpen} onClose={() => setHelpDialogOpen(false)} maxWidth="md">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{t('watering:page.helpDialog.title')}</Typography>
            <IconButton edge="end" color="inherit" onClick={() => setHelpDialogOpen(false)} aria-label="close">
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
          <Button onClick={() => setHelpDialogOpen(false)} color="primary">
            {t('watering:page.helpDialog.closeButton')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Recalculate Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('watering:planManagement.recalculateConfirm.title')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {t('watering:planManagement.recalculateConfirm.message', {
              month: nextMonthLabel,
              date: calculatedAt
                ? format(new Date(calculatedAt), 'd MMM yyyy, HH:mm', { locale })
                : '',
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>
            {t('watering:planManagement.recalculateConfirm.cancelButton')}
          </Button>
          <Button
            onClick={handleConfirmRecalculate}
            variant="contained"
            color="primary"
            disabled={calculating}
            startIcon={calculating ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            {t('watering:planManagement.recalculateConfirm.confirmButton')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Card */}
      <ContentPaper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton
            size="small"
            onClick={() => setHelpDialogOpen(true)}
            sx={{ color: 'text.secondary' }}
            aria-label="info"
          >
            <InfoIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ color: 'text.secondary' }}
            aria-label="more options"
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: calculatedAt ? 2 : 0 }}>
          <Link to={`/${gardenId || ''}/watering/wizard`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 'bold', px: 4 }}>
              {t('watering:page.infoArea.setAvailabilities')}
            </Button>
          </Link>
        </Box>

        {calculatedAt && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {t('watering:planManagement.calculatedAt', {
              date: format(new Date(calculatedAt), 'd MMM yyyy, HH:mm', { locale }),
            })}
            {' · '}
            {t('watering:planManagement.assignmentCount', { count: assignments.length })}
          </Typography>
        )}
      </ContentPaper>

      {/* Secondary menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuCalculate} disabled={calculating}>
          {calculating && <CircularProgress size={14} sx={{ mr: 1 }} />}
          {calculatedAt
            ? t('watering:planManagement.menuItemRecalculate', { month: nextMonthLabel })
            : t('watering:planManagement.menuItem', { month: nextMonthLabel })}
        </MenuItem>
      </Menu>

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
          onDateChange={setSelectedDate}
          allowVariantToggle={false}
          assignments={assignments}
          personIri={myPersonIri}
          availableDates={myAvailableDates}
        />
      </ContentPaper>
    </Box>
  );
};

export default Watering;
