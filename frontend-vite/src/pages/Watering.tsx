import {
  Box,
  Typography,
  Paper,
  Button,
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
import { useCallback, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { WateringCalendar, WateringPlanDetailModal, WateringPersonChip, CalculatePlanModal } from '../components/letItRain';
import { Link, useParams } from 'react-router-dom';
import {
  useWateringPlan,
  useAvailabilityCount,
  usePlanTargetMonth,
  gardenIriFromId,
  planIdFromGardenAndMonth,
  currentMonthYYYYMM,
  addMonthsYYYYMM,
} from '../hooks/useWateringPlan';
import { useLocalUser } from '../hooks/useLocalUser';
import { useDateFnsLocale, useCurrentGardenInfo } from '../hooks';
import { removeAvailabilityDate, removePlanAssignment } from '../api/watering';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
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
  const [calculateModalOpen, setCalculateModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [showAvailability, setShowAvailability] = useState(false);

  const { personId } = useLocalUser();
  const myPersonIri = `${DATA_BASE}Person/${personId}`;

  const {
    planTargetMonth,
    refetch: refetchPlanTarget,
  } = usePlanTargetMonth(gardenId);

  // displayMonth: the most recently calculated plan month.
  // Normally equals currentMonthYYYYMM(), but advances to planTargetMonth-1 when a future
  // month's plan has already been calculated (e.g. late-July with August pre-calculated).
  const prevOfTarget = addMonthsYYYYMM(planTargetMonth, -1);
  const displayMonth = prevOfTarget > currentMonthYYYYMM() ? prevOfTarget : currentMonthYYYYMM();

  const {
    assignments,
    personNames,
    availabilityByDate: displayAvailabilityByDate,
    myAvailableDates: displayMyAvailableDates,
    calculatedAt: displayPlanCalculatedAt,
    refetch: refetchCurrentPlan,
  } = useWateringPlan(gardenId, displayMonth, myPersonIri);

  // Load next-month availability so the user can see their upcoming entries in the calendar.
  // Skip when planTargetMonth equals displayMonth (no plan yet, same data) to avoid duplicate calls.
  const {
    availabilityByDate: nextAvailabilityByDate,
    myAvailableDates: nextMyAvailableDates,
  } = useWateringPlan(
    planTargetMonth !== displayMonth ? gardenId : undefined,
    planTargetMonth,
    myPersonIri
  );

  const availabilityByDate = useMemo(
    () => planTargetMonth !== displayMonth
      ? { ...displayAvailabilityByDate, ...nextAvailabilityByDate }
      : displayAvailabilityByDate,
    [displayMonth, planTargetMonth, displayAvailabilityByDate, nextAvailabilityByDate]
  );

  const myAvailableDates = useMemo(
    () => planTargetMonth !== displayMonth
      ? [...new Set([...displayMyAvailableDates, ...nextMyAvailableDates])]
      : displayMyAvailableDates,
    [displayMonth, planTargetMonth, displayMyAvailableDates, nextMyAvailableDates]
  );

  // Count submissions for the NEXT target month (not the displayed month)
  const availabilityCount = useAvailabilityCount(gardenId, planTargetMonth);

  const { garden } = useCurrentGardenInfo();
  const gardenName = garden?.name ?? (gardenId ? gardenId[0].toUpperCase() + gardenId.slice(1) : 'Garden');
  const gardenLocation = garden?.location;

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const assignmentsOnSelectedDate = assignments.filter((a) => a.date === selectedDateStr);
  const assignedPersonIris = useMemo(
    () => new Set(assignmentsOnSelectedDate.map((a) => a.personIri)),
    [assignmentsOnSelectedDate]
  );
  const fallbackOnSelectedDate = (availabilityByDate[selectedDateStr] ?? []).filter(
    (p) => !assignedPersonIris.has(p.personIri)
  );

  const planTargetMonthLabel = format(new Date(planTargetMonth + '-01'), 'MMMM yyyy', { locale });
  // planId targets the displayed month (the plan we can remove assignments from)
  const planId = gardenId ? planIdFromGardenAndMonth(gardenId, displayMonth) : '';

  const refetch = useCallback(() => {
    refetchCurrentPlan();
    refetchPlanTarget();
  }, [refetchCurrentPlan, refetchPlanTarget]);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
    setShowAvailability(false);
  }, []);

  const handleRemoveAssignment = useCallback(
    async (date: string, personIri: string) => {
      if (!gardenId || !planId) return;
      try {
        await removePlanAssignment(planId, date, personIri);
        enqueueSnackbar(t('watering:chip.removeAssignmentSuccess'), { variant: 'success' });
        refetch();
      } catch {
        enqueueSnackbar(t('watering:chip.removeAssignmentError'), { variant: 'error' });
      }
    },
    [gardenId, planId, enqueueSnackbar, t, refetch]
  );

  const handleRemoveAvailability = useCallback(
    async (date: string, personIri: string) => {
      if (!gardenId) return;
      try {
        await removeAvailabilityDate(gardenIriFromId(gardenId), personIri, date.substring(0, 7), date);
        enqueueSnackbar(t('watering:chip.removeAvailabilitySuccess'), { variant: 'success' });
        refetch();
      } catch {
        enqueueSnackbar(t('watering:chip.removeAvailabilityError'), { variant: 'error' });
      }
    },
    [gardenId, enqueueSnackbar, t, refetch]
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuCalculate = () => {
    handleMenuClose();
    setCalculateModalOpen(true);
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

      {/* Calculate Plan Modal */}
      {gardenId && (
        <CalculatePlanModal
          open={calculateModalOpen}
          onClose={() => setCalculateModalOpen(false)}
          gardenId={gardenId}
          defaultMonth={planTargetMonth}
          onSuccess={refetch}
        />
      )}

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

        {/* Set availabilities + View plan — side by side, wrap on narrow */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 1 }}>
          <Link to={`/${gardenId || ''}/watering/wizard`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 'bold', px: 4 }}>
              {t('watering:page.infoArea.setAvailabilities')}
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            startIcon={<TableRowsIcon />}
            onClick={() => setDetailOpen(true)}
            data-cy="plan-detail-button"
          >
            {t('watering:plan.detailButton')}
          </Button>
        </Box>

        {availabilityCount !== null && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
            {t('watering:page.infoArea.availabilityCount', {
              count: availabilityCount,
              month: planTargetMonthLabel,
            })}
          </Typography>
        )}

        {displayPlanCalculatedAt && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {t('watering:planManagement.calculatedAt', {
              date: format(new Date(displayPlanCalculatedAt), 'd MMM yyyy, HH:mm', { locale }),
            })}
            {' · '}
            {t('watering:planManagement.assignmentCount', { count: assignments.length })}
          </Typography>
        )}
      </ContentPaper>

      {/* Secondary menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuCalculate} data-cy="calculate-plan-button">
          {t('watering:planManagement.modal.title')}
        </MenuItem>
      </Menu>

      {/* Plan Detail Modal */}
      <WateringPlanDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        assignments={assignments}
        personNames={personNames}
        gardenName={gardenName}
        gardenId={gardenId}
        gardenLocation={gardenLocation}
      />

      {/* Watering Calendar */}
      <ContentPaper>
        <WateringCalendar
          variant="horizontal"
          preselectedDate={selectedDate}
          onDateChange={handleDateChange}
          allowVariantToggle={false}
          assignments={assignments}
          personIri={myPersonIri}
          availableDates={myAvailableDates}
          availabilityByDate={availabilityByDate}
        />

        {/* Selected-date chips — below the calendar */}
        <Box sx={{ mt: 1 }} data-cy="selected-date-chips">
          {/* Assigned gardeners — always shown */}
          {assignmentsOnSelectedDate.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {assignmentsOnSelectedDate.map((a) => (
                <WateringPersonChip
                  key={a.personIri}
                  name={personNames[a.personIri] ?? a.personIri.split('/').pop() ?? a.personIri}
                  personIri={a.personIri}
                  assignments={assignments}
                  gardenName={gardenName}
                  gardenId={gardenId ?? 'garden'}
                  gardenLocation={gardenLocation}
                  variant="assigned"
                  removable
                  onRemove={() => handleRemoveAssignment(selectedDateStr, a.personIri)}
                />
              ))}
            </Box>
          )}

          {/* Available-but-not-assigned — shown only when no assignments, or when expanded */}
          {fallbackOnSelectedDate.length > 0 && (
            <>
              {(assignmentsOnSelectedDate.length === 0 || showAvailability) ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: assignmentsOnSelectedDate.length > 0 ? 0.5 : 0 }}>
                  {fallbackOnSelectedDate.map(({ personIri, name }) => (
                    <WateringPersonChip
                      key={personIri}
                      name={name}
                      personIri={personIri}
                      assignments={assignments}
                      gardenName={gardenName}
                      gardenId={gardenId ?? 'garden'}
                      gardenLocation={gardenLocation}
                      variant="available"
                      removable
                      onRemove={() => handleRemoveAvailability(selectedDateStr, personIri)}
                    />
                  ))}
                  {assignmentsOnSelectedDate.length > 0 && (
                    <Button
                      size="small"
                      sx={{ fontSize: '0.7rem', py: 0, minHeight: 0, color: 'text.secondary' }}
                      onClick={() => setShowAvailability(false)}
                    >
                      {t('watering:calendar.hideAvailable')}
                    </Button>
                  )}
                </Box>
              ) : (
                <Box sx={{ mt: 0.5 }}>
                  <Button
                    size="small"
                    sx={{ fontSize: '0.75rem', py: 0.25, color: 'text.secondary' }}
                    onClick={() => setShowAvailability(true)}
                  >
                    {t('watering:calendar.showAvailable', { count: fallbackOnSelectedDate.length })}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </ContentPaper>
    </Box>
  );
};

export default Watering;
