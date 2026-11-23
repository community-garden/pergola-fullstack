import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { DetailViewConfig } from '@graviola/edb-detail-renderer-core';
import { useAdbContext } from '@graviola/edb-state-hooks';
import { SemanticDetailViewNoOps } from '@graviola/semantic-views';
import { useTranslation } from 'react-i18next';

export type EntityDetailDialogProps = {
  entityIRI: string;
  /** Unknown while the type of the entity is still being resolved. */
  typeIRI?: string;
  typeName?: string;
  /** The entity as JSON-LD; a skeleton is shown while it is undefined. */
  data?: Record<string, unknown>;
  onClose: () => void;
  /** Shows the "Edit" button. */
  onEdit?: () => void;
  /**
   * Overrides for this dialog only (layout variant, extra renderers, UI
   * schemata, …). The app-wide settings come from `useDetailViewConfig`.
   */
  config?: Partial<DetailViewConfig>;
};

/**
 * Detail view of any entity: a slim header with the kind of entity, then
 * Graviola's detail renderer (structured dispatch: hero card with the image on
 * top, then the properties).
 *
 * Unlike Graviola's `EntityDetailModal` there is no large side image; the
 * image is only shown in the card on top. Pure presentation — the data comes
 * in as props (see `PergolaEntityDetailModal` for loading).
 */
export const EntityDetailDialog = ({
  entityIRI,
  typeIRI,
  typeName,
  data,
  onClose,
  onEdit,
  config,
}: EntityDetailDialogProps) => {
  const { t } = useTranslation('garden');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // SemanticDetailView takes the other app-wide detail settings from the view config,
  // but not its `extraRenderers` (e.g. the bed layout with its actions): pass them on.
  const { viewConfig } = useAdbContext();
  const mergedConfig = useMemo<Partial<DetailViewConfig>>(
    () => ({
      ...config,
      extraRenderers: [
        ...((config?.extraRenderers ?? []) as NonNullable<DetailViewConfig['extraRenderers']>),
        ...((viewConfig?.detail?.extraRenderers ?? []) as unknown as NonNullable<DetailViewConfig['extraRenderers']>),
      ],
    }),
    [config, viewConfig],
  );
  const typeLabel = typeName ? t(`entityDetail.types.${typeName}`, { defaultValue: typeName }) : '';

  return (
    <Dialog
      open
      onClose={onClose}
      scroll="paper"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      disableEnforceFocus
      slotProps={{ paper: { sx: fullScreen ? undefined : { borderRadius: 2 } } }}
      data-testid="entity-detail-dialog"
      data-entity-iri={entityIRI}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{ pl: 2, pr: 1, py: 0.5, borderBottom: 1, borderColor: 'divider', minHeight: 48 }}
      >
        <Typography variant="overline" color="text.secondary" sx={{ flex: 1, lineHeight: 1.5 }} noWrap>
          {typeLabel}
        </Typography>
        <IconButton onClick={onClose} aria-label={t('entityDetail.close')} data-testid="entity-detail-close">
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        {data && typeIRI ? (
          <SemanticDetailViewNoOps
            data={data}
            entityIRI={entityIRI}
            typeIRI={typeIRI}
            typeName={typeName}
            config={mergedConfig}
          />
        ) : (
          <EntityDetailSkeleton />
        )}
      </DialogContent>
      <DialogActions sx={{ px: 2 }}>
        {onEdit && (
          <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit} data-testid="entity-detail-edit">
            {t('entityDetail.edit')}
          </Button>
        )}
        <Button variant="contained" onClick={onClose}>
          {t('entityDetail.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/** Same shape as the loaded view: card with image and title, then a few rows. */
const EntityDetailSkeleton = () => (
  <Box data-testid="entity-detail-loading">
    <Card sx={{ mb: 2 }}>
      <Skeleton variant="rectangular" height={180} />
      <CardContent>
        <Skeleton variant="text" width="45%" height={36} />
        <Skeleton variant="text" width="30%" />
      </CardContent>
    </Card>
    {[0, 1, 2, 3].map((i) => (
      <Stack key={i} direction="row" spacing={2} sx={{ py: 0.75 }}>
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="60%" />
      </Stack>
    ))}
  </Box>
);
