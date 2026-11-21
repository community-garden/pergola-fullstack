import { useState } from 'react';
import {
  Box,
  Chip,
  Divider,
  Fab,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useTranslation } from 'react-i18next';
import type { MapIconMode, MapLabelMode } from './buildMapLabels';

interface MapLabelModeFabProps {
  mode: MapLabelMode;
  seasons: number[];
  onChange: (mode: MapLabelMode) => void;
  /** plant symbols in season labels: main images or emoji */
  iconMode: MapIconMode;
  onIconModeChange: (mode: MapIconMode) => void;
  /** Shows a "zoom in" chip next to the button. */
  showZoomHint?: boolean;
  onZoomHintClick?: () => void;
}

/**
 * Floating button with a menu to switch the map labels (off, bed names,
 * plantings of a season) and the plant symbols (images or emoji).
 */
export const MapLabelModeFab = ({
  mode,
  seasons,
  onChange,
  iconMode,
  onIconModeChange,
  showZoomHint,
  onZoomHintClick,
}: MapLabelModeFabProps) => {
  const { t } = useTranslation('garden');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const select = (next: MapLabelMode) => {
    onChange(next);
    setAnchor(null);
  };

  const item = (key: string, label: string, selected: boolean, onClick: () => void) => (
    <MenuItem key={key} selected={selected} onClick={onClick} dense>
      <ListItemIcon>{selected && <CheckIcon fontSize="small" />}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 12,
        bottom: 72, // above the attribution (and the dev-only query devtools button)
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {showZoomHint && (
        <Chip
          icon={<ZoomInIcon />}
          label={t('mapLabels.zoomHint')}
          onClick={onZoomHintClick}
          sx={{ bgcolor: 'background.paper', boxShadow: 2 }}
        />
      )}
      <Tooltip title={t('mapLabels.title')} placement="left">
        <Fab
          size="medium"
          color={mode.kind === 'off' ? 'default' : 'primary'}
          aria-label={t('mapLabels.button')}
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <LabelOutlinedIcon />
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          list: { dense: true, sx: { minWidth: 220 } },
          // the theme's glass paper is too transparent over satellite imagery
          paper: { sx: { bgcolor: 'rgba(255, 255, 255, 0.9)' } },
        }}
      >
        <ListSubheader sx={{ bgcolor: 'transparent' }}>{t('mapLabels.title')}</ListSubheader>
        {item('off', t('mapLabels.off'), mode.kind === 'off', () => select({ kind: 'off' }))}
        {item('names', t('mapLabels.names'), mode.kind === 'names', () => select({ kind: 'names' }))}
        <Divider />
        <ListSubheader sx={{ bgcolor: 'transparent' }}>{t('mapLabels.seasonHeader')}</ListSubheader>
        {seasons.map((season) =>
          item(
            String(season),
            t('mapLabels.season', { year: season }),
            mode.kind === 'season' && mode.season === season,
            () => select({ kind: 'season', season }),
          ),
        )}
        <Divider />
        <ListSubheader sx={{ bgcolor: 'transparent' }}>{t('mapLabels.iconsHeader')}</ListSubheader>
        {(['images', 'emoji'] as const).map((next) =>
          item(`icons-${next}`, t(`mapLabels.icons.${next}`), iconMode === next, () => {
            onIconModeChange(next);
            setAnchor(null);
          }),
        )}
      </Menu>
    </Box>
  );
};
