import { useMemo } from 'react';
import { Box, Typography, Chip, Button, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Patch } from '../../../schema/patch-schema';
import { plantingLabel, useSeasonData } from '../../../hooks/useSeasonData';
import { usePlantingMutations } from '../../../hooks/usePlantingMutations';
import { useCreateOrEditModal } from '../../../hooks/useCreateOrEditModal';
import { GARDEN_NS } from '../../../api/season';
import { useCurrentGarden } from '../../../hooks/useCurrentGarden';
import { lastSegment } from '../../../utils/iri';
import { PlantIcon } from '../../plants/PlantIcon';
import {
  ROLE_COLORS,
  defaultSeason,
  overlapsSeason,
} from '../../season-planner/seasonTimeline';

export interface PatchFeatureCardProps {
  patch: Patch;
  /** called before the card navigates away, e.g. to close the dialog it sits in */
  onNavigate?: () => void;
}

const formatDate = (iso?: string) => (iso ? iso.split('-').reverse().join('.') : '?');

export const PatchFeatureCard: React.FC<PatchFeatureCardProps> = ({ patch, onNavigate }) => {
  const { t } = useTranslation('garden');
  const season = defaultSeason();
  const { data } = useSeasonData();
  const { createPlanting, editPlanting, invalidate } = usePlantingMutations();
  const createOrEditModal = useCreateOrEditModal();
  const navigate = useNavigate();
  const { gardenId } = useCurrentGarden();
  const patchIri = patch['@id'];
  const patchInfo = patchIri ? data.patchesByIri.get(patchIri) : undefined;

  const plantings = useMemo(
    () =>
      data.plantings
        .filter((p) => p.patchIri === patchIri && overlapsSeason(p, season))
        .sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? '')),
    [data.plantings, patchIri, season],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {patch.name}
        </Typography>
        {patch.description && (
          <Typography variant="body2" color="text.secondary">
            {patch.description}
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
        {patch.patchType && <Chip label={t(`patch.types.${patch.patchType}`)} size="small" />}
        {patch.area && <Chip label={`${patch.area} m²`} size="small" variant="outlined" />}
        {patchIri && (
          <Button
            size="small"
            startIcon={<EditIcon fontSize="small" />}
            onClick={() =>
              void createOrEditModal(patchIri, `${GARDEN_NS}Patch`)
                .catch(() => undefined)
                .then(() => invalidate())
            }
          >
            {t('patch.edit')}
          </Button>
        )}
        {patchIri && gardenId && (
          <Button
            size="small"
            startIcon={<GridOnIcon fontSize="small" />}
            data-testid="open-bed-plan"
            onClick={() => {
              onNavigate?.();
              navigate(`/${gardenId}/beds/${encodeURIComponent(lastSegment(patchIri))}/plan?season=${season}`);
            }}
          >
            {t('bedPlanner.openPlan')}
          </Button>
        )}
      </Stack>

      {patchInfo && patchInfo.responsiblePersons.length > 0 && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('planting.responsible')}
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
            {patchInfo.responsiblePersons.map((person) => (
              <Chip key={person.iri} label={person.name} size="small" color="primary" variant="outlined" />
            ))}
          </Stack>
        </Box>
      )}

      <Box>
        <Typography variant="caption" color="text.secondary">
          {t('planting.plantingsInSeason', { year: season })}
        </Typography>
        {plantings.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {t('planting.none')}
          </Typography>
        ) : (
          <List dense disablePadding>
            {plantings.map((planting) => {
              const { icon, image, name } = plantingLabel(planting, data);
              const role = planting.role ?? 'main';
              return (
                <ListItemButton
                  key={planting.iri}
                  onClick={() => void editPlanting(planting.iri)}
                  sx={{ borderLeft: `4px solid ${ROLE_COLORS[role] ?? ROLE_COLORS.main}`, mb: 0.5, gap: 1.5 }}
                >
                  <PlantIcon icon={icon} image={image} size={36} />
                  <ListItemText
                    primary={`${name}${planting.quantity ? ` · ${planting.quantity} ${planting.quantityUnit ? t(`planting.units.${planting.quantityUnit}`) : ''}` : ''}`}
                    secondary={`${formatDate(planting.startDate)} – ${formatDate(planting.endDate)} · ${t(`planting.roles.${role}`)}${planting.status ? ` · ${t(`planting.statuses.${planting.status}`)}` : ''}`}
                  />
                </ListItemButton>
              );
            })}
          </List>
        )}
        {patchIri && (
          <Button
            size="small"
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
            onClick={() =>
              void createPlanting({
                patch: { '@id': patchIri, name: patch.name },
                startDate: `${season}-04-01`,
                endDate: `${season}-09-30`,
              })
            }
          >
            {t('planting.add')}
          </Button>
        )}
      </Box>
    </Box>
  );
};
