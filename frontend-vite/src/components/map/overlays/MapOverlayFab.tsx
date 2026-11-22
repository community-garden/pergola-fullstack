import { useState } from 'react';
import { Box, Fab, ListItemText, ListSubheader, Menu, MenuItem, Switch, Tooltip } from '@mui/material';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { useTranslation } from 'react-i18next';
import type { ResolvedOverlay } from './overlays';

interface MapOverlayFabProps {
  overlays: ResolvedOverlay[];
  onToggle: (id: string, visible: boolean) => void;
}

/** Floating button with a menu to show or hide the garden's map overlays. */
export const MapOverlayFab = ({ overlays, onToggle }: MapOverlayFabProps) => {
  const { t } = useTranslation('garden');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  if (overlays.length === 0) return null;
  const anyVisible = overlays.some((o) => o.visible);

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 12,
        bottom: 128, // above the label button
        zIndex: 3,
      }}
    >
      <Tooltip title={t('mapOverlays.title')} placement="left">
        <Fab
          size="medium"
          color={anyVisible ? 'primary' : 'default'}
          aria-label={t('mapOverlays.button')}
          data-testid="map-overlay-button"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <LayersOutlinedIcon />
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          list: { dense: true, sx: { minWidth: 240 } },
          paper: { sx: { bgcolor: 'rgba(255, 255, 255, 0.9)' } },
        }}
      >
        <ListSubheader sx={{ bgcolor: 'transparent' }}>{t('mapOverlays.title')}</ListSubheader>
        {overlays.map((o) => (
          <MenuItem key={o.id} dense onClick={() => onToggle(o.id, !o.visible)} data-testid="map-overlay-item">
            <ListItemText>{o.name}</ListItemText>
            <Switch edge="end" size="small" checked={o.visible} tabIndex={-1} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
