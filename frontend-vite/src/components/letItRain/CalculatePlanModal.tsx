import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { addMonthsYYYYMM, currentMonthYYYYMM, gardenIriFromId, planIdFromGardenAndMonth } from '../../hooks/useWateringPlan';
import { deletePlan } from '../../api/watering';
import { useDateFnsLocale } from '../../hooks';

const PERSONS_PER_DAY_KEY = 'pergola:personsPerDay';

interface MonthData {
  availabilityCount: number;
  planCalculatedAt: string | null;
  assignmentCount: number;
}

interface CalculatePlanModalProps {
  open: boolean;
  onClose: () => void;
  gardenId: string;
  defaultMonth: string;
  onSuccess: () => void;
}

export function CalculatePlanModal({ open, onClose, gardenId, defaultMonth, onSuccess }: CalculatePlanModalProps) {
  const { t } = useTranslation('watering');
  const locale = useDateFnsLocale();
  const { enqueueSnackbar } = useSnackbar();

  const candidateMonths = [
    currentMonthYYYYMM(),
    addMonthsYYYYMM(currentMonthYYYYMM(), 1),
    addMonthsYYYYMM(currentMonthYYYYMM(), 2),
  ];

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [personsPerDay, setPersonsPerDay] = useState<number>(() => {
    const stored = localStorage.getItem(PERSONS_PER_DAY_KEY);
    return stored ? Math.max(1, Math.min(10, parseInt(stored, 10))) : 2;
  });
  const [monthData, setMonthData] = useState<Record<string, MonthData>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open || !gardenId) return;

    setSelectedMonth(defaultMonth);
    setLoading(true);

    const gardenIri = gardenIriFromId(gardenId);

    Promise.all(
      candidateMonths.map(async (month) => {
        const [planRes, availRes] = await Promise.all([
          fetch(`/api/watering/plan?gardenIri=${encodeURIComponent(gardenIri)}&month=${month}`),
          fetch(`/api/watering/availability?gardenIri=${encodeURIComponent(gardenIri)}&month=${month}`),
        ]);
        const plan = planRes.ok ? await planRes.json() : null;
        const avail: unknown[] = availRes.ok ? await availRes.json() : [];
        return [
          month,
          {
            availabilityCount: Array.isArray(avail) ? avail.length : 0,
            planCalculatedAt: plan?.calculatedAt ?? null,
            assignmentCount: Array.isArray(plan?.assignments) ? plan.assignments.length : 0,
          },
        ] as [string, MonthData];
      })
    )
      .then((entries) => setMonthData(Object.fromEntries(entries)))
      .catch(() => {})
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, gardenId]);

  const current = monthData[selectedMonth];
  const hasPlan = !!current?.planCalculatedAt;
  const canCalculate = hasPlan || (current?.availabilityCount ?? 0) >= 2;

  const monthLabel = (m: string) =>
    format(new Date(m + '-01'), 'MMM yyyy', { locale });

  const handleCalculate = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/watering/plan/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gardenIri: gardenIriFromId(gardenId),
          targetMonth: selectedMonth,
          targetPersonsPerTask: personsPerDay,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      localStorage.setItem(PERSONS_PER_DAY_KEY, String(personsPerDay));
      enqueueSnackbar(t('planManagement.calculated'), { variant: 'success' });
      onSuccess();
      onClose();
    } catch {
      enqueueSnackbar(t('planManagement.calculateError'), { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async () => {
    setSubmitting(true);
    try {
      await deletePlan(planIdFromGardenAndMonth(gardenId, selectedMonth));
      enqueueSnackbar(t('planManagement.modal.removeSuccess'), { variant: 'success' });
      onSuccess();
      onClose();
    } catch {
      enqueueSnackbar(t('planManagement.modal.removeError'), { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('planManagement.modal.title')}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 0.5 }}>
            {/* Month selector */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                {t('planManagement.modal.monthLabel')}
              </Typography>
              <ToggleButtonGroup
                exclusive
                fullWidth
                value={selectedMonth}
                onChange={(_e, v) => { if (v) setSelectedMonth(v); }}
                size="small"
              >
                {candidateMonths.map((m) => {
                  const d = monthData[m];
                  const checked = !!d?.planCalculatedAt;
                  return (
                    <ToggleButton key={m} value={m} sx={{ flexDirection: 'column', py: 0.75, lineHeight: 1.2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'none' }}>
                        {monthLabel(m)}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', textTransform: 'none', opacity: 0.8 }}>
                        {d == null ? '…' : checked
                          ? `✓ ${d.assignmentCount}`
                          : `${d.availabilityCount} ${t('planManagement.modal.availabilityCount', { count: '' }).trim()}`}
                      </Typography>
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>

              {/* Status line */}
              {current && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  {hasPlan
                    ? t('planManagement.modal.planCalculated', {
                        date: format(new Date(current.planCalculatedAt!), 'd MMM yyyy', { locale }),
                        count: current.assignmentCount,
                      })
                    : t('planManagement.modal.availabilityCountFull', { count: current.availabilityCount, month: monthLabel(selectedMonth) })}
                </Typography>
              )}
            </Box>

            {/* Persons per day stepper */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                {t('planManagement.modal.personsPerDayLabel')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setPersonsPerDay((v) => Math.max(1, v - 1))}
                  disabled={personsPerDay <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 24, textAlign: 'center' }}>
                  {personsPerDay}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setPersonsPerDay((v) => Math.min(10, v + 1))}
                  disabled={personsPerDay >= 10}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" color="text.secondary">
                  {t('planManagement.modal.personsPerDayHelper')}
                </Typography>
              </Box>
            </Box>

            {/* Contextual alerts */}
            {hasPlan && current && (
              <Alert severity="warning" sx={{ py: 0.5 }}>
                {t('planManagement.modal.planExistsWarning', {
                  month: monthLabel(selectedMonth),
                  date: format(new Date(current.planCalculatedAt!), 'd MMM yyyy', { locale }),
                  count: current.assignmentCount,
                })}
              </Alert>
            )}
            {!hasPlan && current && current.availabilityCount < 2 && (
              <Alert severity="info" sx={{ py: 0.5 }}>
                {t('planManagement.modal.notEnoughAvailability')}
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={submitting}>
          {t('planManagement.recalculateConfirm.cancelButton')}
        </Button>
        <Box sx={{ flex: 1 }} />
        {hasPlan && (
          <Button
            variant="outlined"
            color="error"
            disabled={submitting}
            onClick={handleRemove}
            startIcon={submitting ? <CircularProgress size={14} color="inherit" /> : undefined}
          >
            {t('planManagement.modal.removeButton')}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={submitting || loading || !canCalculate}
          onClick={handleCalculate}
          startIcon={submitting ? <CircularProgress size={14} color="inherit" /> : undefined}
        >
          {hasPlan
            ? t('planManagement.modal.recalculateButton')
            : t('planManagement.modal.calculateButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
