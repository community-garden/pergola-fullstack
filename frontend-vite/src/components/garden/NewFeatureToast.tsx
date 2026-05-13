import { forwardRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SnackbarContent, CustomContentProps, closeSnackbar } from 'notistack';

declare module 'notistack' {
  interface VariantOverrides {
    newFeature: true;
  }
  interface OptionsObject {
    onSpecifyFeature?: () => void;
  }
}

export type NewFeatureToastProps = CustomContentProps;

export const NewFeatureToast = forwardRef<HTMLDivElement, NewFeatureToastProps>(
  ({ id, onSpecifyFeature }, ref) => {
    const { t } = useTranslation('garden');

    const handleSpecify = () => {
      closeSnackbar(id);
      onSpecifyFeature?.();
    };

    const handleDismiss = () => {
      closeSnackbar(id);
    };

    return (
      <SnackbarContent ref={ref} role="alert">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, color: 'white', backgroundColor: 'primary.main' }}>
          <Typography variant="body1" sx={{ color: 'inherit' }}>
            {t('features.newFeatureQuestion')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDismiss}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              {t('features.no')}
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleSpecify}
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            >
              {t('features.yes')}
            </Button>
          </Box>
        </Box>
      </SnackbarContent>
    );
  }
);

NewFeatureToast.displayName = 'NewFeatureToast';

