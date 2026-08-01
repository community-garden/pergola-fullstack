import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress } from '@mui/material';
import { LetItRainWizard } from '../components/letItRain';
import { WizardData } from '@components/letItRain/LetItRainWizard';
import { useLocalUser } from '@hooks/useLocalUser';
import { usePlanTargetMonth } from '../hooks/useWateringPlan';

const DATA_BASE = 'https://data.semantic-desk.top/garden/';

const WateringWizard = () => {
  const navigate = useNavigate();
  const { gardenId } = useParams<{ gardenId?: string; stepNumber?: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('letItRain');
  const { personId } = useLocalUser();
  const [submitting, setSubmitting] = useState(false);
  const { planTargetMonth: targetMonth, loading: monthLoading } = usePlanTargetMonth(gardenId);

  const [initialDates, setInitialDates] = useState<Date[]>([]);
  const [initialFrequency, setInitialFrequency] = useState<number>(1);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  useEffect(() => {
    if (!gardenId || monthLoading) return;
    const gardenIri = `${DATA_BASE}Garden/${gardenId}`;
    setAvailabilityLoading(true);
    fetch(
      `/api/watering/availability?gardenIri=${encodeURIComponent(gardenIri)}&month=${targetMonth}&personId=${personId}`
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((entry) => {
        if (entry) {
          const dates = (entry.availableDates ?? []).map((d: string) => {
            const [y, m, day] = d.split('-').map(Number);
            return new Date(y, m - 1, day);
          });
          setInitialDates(dates);
          setInitialFrequency(Math.max(1, Math.round((entry.maximumTasksPerMonth ?? 4) / 4.33)));
        }
      })
      .catch(() => {})
      .finally(() => setAvailabilityLoading(false));
  // personId omitted: month changes trigger re-fetch; "Not me" is handled by handleForget in the wizard
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenId, targetMonth, monthLoading]);

  const handleFinish = async ({ frequency, availableDates, nickname }: WizardData) => {
    if (!gardenId || monthLoading || availableDates.length === 0) return;

    // Read personId fresh from localStorage: forgetMe() in WizardProfile generates a new
    // UUID in its own useLocalUser instance (separate React state), so the personId prop
    // here may be stale. localStorage is always up to date immediately after forgetMe().
    const freshPersonId = localStorage.getItem('pergola_person_id') ?? personId;

    const gardenIri = `${DATA_BASE}Garden/${gardenId}`;
    const maximumTasksPerMonth = Math.max(1, Math.round(frequency * 4.33));
    const availableDateStrings = availableDates.map((d) => format(d, 'yyyy-MM-dd'));

    setSubmitting(true);
    try {
      const res = await fetch('/api/watering/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gardenIri,
          personId: freshPersonId,
          nickname: nickname || personId.slice(0, 8),
          maximumTasksPerMonth,
          availableDates: availableDateStrings,
          targetMonth,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      enqueueSnackbar(t('wizard.success'), { variant: 'success' });
      navigate(`/${gardenId}/watering`);
    } catch {
      enqueueSnackbar(t('wizard.error'), { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (monthLoading || availabilityLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LetItRainWizard
      onComplete={handleFinish}
      gardenId={gardenId}
      submitting={submitting}
      targetMonth={targetMonth}
      initialDates={initialDates}
      initialFrequency={initialFrequency}
    />
  );
};

export default WateringWizard;
