import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { NewFeatureWizard } from './NewFeatureWizard';
import { NewFeatureForm } from './NewFeatureForm';
import { GardenFeatureType } from './feature-type-mapping';

interface NewFeatureWizardNiceModalProps {
  geoFeatureIRI?: string;
  preselectedFeatureType?: GardenFeatureType;
}

export const NewFeatureWizardNiceModal = NiceModal.create<NewFeatureWizardNiceModalProps>(({ geoFeatureIRI, preselectedFeatureType }) => {
  const modal = useModal();
  const { t } = useTranslation('garden');
  const queryClient = useQueryClient();
  const [step, setStep] = useState<'select' | 'form'>(preselectedFeatureType ? 'form' : 'select');
  const [selectedFeature, setSelectedFeature] = useState<GardenFeatureType | null>(preselectedFeatureType || null);

  const handleFeatureSelect = (feature: GardenFeatureType) => {
    console.log('Selected feature:', feature);
    setSelectedFeature(feature);
    setStep('form');
  };

  const handleBack = () => {
    setStep('select');
    setSelectedFeature(null);
  };

  const handleClose = () => {
    modal.remove();
  };

  const handleSave = async () => {
    // Invalidate queries to refresh data
    await queryClient.invalidateQueries();
    modal.remove();
  };

  return (
    <Dialog
      open={modal.visible}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionProps={{
        onExited: () => modal.remove(),
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {step === 'select' && (
          <NewFeatureWizard onFeatureSelect={handleFeatureSelect} />
        )}
        {step === 'form' && selectedFeature && geoFeatureIRI && (
          <NewFeatureForm
            geoFeatureIRI={geoFeatureIRI}
            featureType={selectedFeature}
            onCancel={handleBack}
            onSave={handleSave}
          />
        )}
      </DialogContent>

      {step === 'select' && (
        <DialogActions>
          <Button onClick={handleClose}>{t('features.cancel')}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
});

