import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { LetItRainWizard } from '../components/letItRain';
import { WizardData } from '@components/letItRain/LetItRainWizard';
import { useLocalUser } from '@hooks/useLocalUser';

const DATA_BASE = 'https://data.semantic-desk.top/garden/';

const WateringWizard = () => {
  const navigate = useNavigate();
  const { gardenId } = useParams<{ gardenId?: string; stepNumber?: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('letItRain');
  const { personId } = useLocalUser();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async ({ frequency, availableDates, nickname }: WizardData) => {
    if (!gardenId) return;

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
          personId,
          nickname: nickname || personId.slice(0, 8),
          maximumTasksPerMonth,
          availableDates: availableDateStrings,
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

  return (
    <LetItRainWizard
      onComplete={handleFinish}
      gardenId={gardenId}
      submitting={submitting}
    />
  );
};

export default WateringWizard;
