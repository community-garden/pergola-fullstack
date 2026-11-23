import { useDraggable } from '@dnd-kit/core';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import {
  Autocomplete,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { PlantInfo, PlantingInfo } from '../../api/season';
import { PlantIcon } from '../plants/PlantIcon';

/** A planting of the bed as the sidebar lists it. */
export interface BedPlanItem {
  planting: PlantingInfo;
  name: string;
  icon?: string;
  image?: string;
  diameterCm: number;
  /** no spacing known: the diameter is a default */
  estimated: boolean;
  /** cm between rows, if the plant has one */
  rowSpacingCm?: number;
  /** plants in the bed (single ones and those of rows and areas) */
  placed: number;
  /** planned number of plants (quantity in unit "plants") */
  quantity?: number;
}

/** How a chosen plant is put into the bed: one by one, as a row or as an area. */
export type PlaceMode = 'single' | 'line' | 'area';

interface BedPlannerSidebarProps {
  bedName: string;
  /** main image of the bed, next to its name */
  bedImage?: string;
  season: number;
  items: BedPlanItem[];
  plants: PlantInfo[];
  armedIri?: string;
  mode: PlaceMode;
  onModeChange: (mode: PlaceMode) => void;
  /** dragging from the list (desktop, single plants); on touch screens one taps instead */
  draggable: boolean;
  onArm: (plantingIri: string) => void;
  onHover: (plantingIri: string | undefined) => void;
  onOtherPlant: (plantIri: string) => void;
  /** edit mode (default on); off: the list only shows and selects, nothing can be placed or added */
  editMode?: boolean;
}

/** "2027-04-01" → "01.04." */
const dayMonth = (iso?: string) => (iso ? `${iso.slice(8, 10)}.${iso.slice(5, 7)}.` : '');

const PlantingRow = ({
  item,
  armed,
  draggable,
  onArm,
  onHover,
}: {
  item: BedPlanItem;
  armed: boolean;
  draggable: boolean;
  onArm: (iri: string) => void;
  onHover: (iri: string | undefined) => void;
}) => {
  const { t } = useTranslation('garden');
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.planting.iri,
    data: { plantingIri: item.planting.iri },
    disabled: !draggable,
  });
  const count =
    item.quantity !== undefined
      ? t('bedPlanner.placedOf', { count: item.placed, quantity: item.quantity })
      : t('bedPlanner.placed', { count: item.placed });
  const spacing = item.estimated ? t('bedPlanner.spacingUnknown') : t('bedPlanner.spacing', { cm: item.diameterCm });
  return (
    <ListItemButton
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      selected={armed}
      data-testid="bed-plan-item"
      data-planting={item.planting.iri}
      onClick={() => onArm(item.planting.iri)}
      onMouseEnter={() => onHover(item.planting.iri)}
      onMouseLeave={() => onHover(undefined)}
      sx={{ opacity: isDragging ? 0.4 : 1, touchAction: draggable ? 'none' : undefined, gap: 1 }}
    >
      <ListItemIcon sx={{ minWidth: 0 }}>
        <PlantIcon icon={item.icon} image={item.image} size={40} />
      </ListItemIcon>
      <ListItemText
        primary={item.name}
        secondary={
          <>
            {dayMonth(item.planting.startDate)}–{dayMonth(item.planting.endDate)} · {spacing}
            <br />
            <Box component="span" data-testid="bed-plan-item-count" sx={{ fontWeight: 500 }}>
              {count}
            </Box>
          </>
        }
        slotProps={{ primary: { noWrap: true } }}
      />
    </ListItemButton>
  );
};

/** List of the bed's plantings, plus a picker for any other plant. */
export const BedPlannerSidebar = ({
  bedName,
  bedImage,
  season,
  items,
  plants,
  armedIri,
  mode,
  onModeChange,
  draggable,
  onArm,
  onHover,
  onOtherPlant,
  editMode = true,
}: BedPlannerSidebarProps) => {
  const { t } = useTranslation('garden');
  const options = [...plants].sort(
    (a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name, 'de') : a.kind === 'species' ? -1 : 1),
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} data-testid="bed-planner-sidebar">
      <Box sx={{ px: 2, pt: 2, pb: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}>
        {bedImage && <PlantIcon image={bedImage} size={56} shape="rounded" />}
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" color="text.secondary">
            {t('bedPlanner.title')} {season}
          </Typography>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            {bedName}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Typography variant="subtitle2" sx={{ px: 2, pt: 1.5 }}>
        {t('bedPlanner.planned')}
      </Typography>
      {editMode && (
        <>
      <ToggleButtonGroup
        exclusive
        fullWidth
        size="small"
        value={mode}
        onChange={(_, value: PlaceMode | null) => value && onModeChange(value)}
        aria-label={t('bedPlanner.placeAs')}
        data-testid="bed-plan-mode"
        sx={{
          mx: 2,
          mt: 1,
          mb: 0.5,
          width: 'auto',
          '& .MuiToggleButton-root': { gap: 0.5, textTransform: 'none', py: 0.25, px: 0.5 },
        }}
      >
        <ToggleButton value="single" data-testid="bed-plan-mode-single">
          <FiberManualRecordOutlinedIcon fontSize="small" />
          {t('bedPlanner.modeSingle')}
        </ToggleButton>
        <ToggleButton value="line" data-testid="bed-plan-mode-line">
          <LinearScaleIcon fontSize="small" />
          {t('bedPlanner.modeLine')}
        </ToggleButton>
        <ToggleButton value="area" data-testid="bed-plan-mode-area">
          <PentagonOutlinedIcon fontSize="small" />
          {t('bedPlanner.modeArea')}
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="caption" color="text.secondary" sx={{ px: 2 }}>
        {t(
          mode === 'line'
            ? 'bedPlanner.hintLine'
            : mode === 'area'
              ? 'bedPlanner.hintArea'
              : draggable
                ? 'bedPlanner.hint'
                : 'bedPlanner.hintTap',
        )}
      </Typography>
        </>
      )}
      <List dense sx={{ flex: 1, overflow: 'auto' }}>
        {items.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1 }}>
            {t('bedPlanner.noPlantings')}
          </Typography>
        )}
        {items.map((item) => (
          <PlantingRow
            key={item.planting.iri}
            item={item}
            armed={item.planting.iri === armedIri}
            draggable={draggable}
            onArm={onArm}
            onHover={onHover}
          />
        ))}
      </List>
      {editMode && (
        <>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Autocomplete
          options={options}
          groupBy={(p) => t(p.kind === 'species' ? 'plantManagement.tabs.species' : 'plantManagement.tabs.varieties')}
          getOptionLabel={(p) => p.name}
          value={null}
          blurOnSelect
          onChange={(_, plant) => plant && onOtherPlant(plant.iri)}
          renderOption={({ key, ...props }, p) => (
            <Box component="li" key={key} {...props} sx={{ gap: 1 }}>
              <PlantIcon icon={p.icon} image={p.imageUrl} size={24} />
              {p.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label={t('bedPlanner.otherPlant')}
              helperText={t('bedPlanner.otherPlantHint')}
              slotProps={{ htmlInput: { ...params.inputProps, 'data-testid': 'bed-plan-other-plant' } }}
            />
          )}
        />
      </Box>
        </>
      )}
    </Box>
  );
};
