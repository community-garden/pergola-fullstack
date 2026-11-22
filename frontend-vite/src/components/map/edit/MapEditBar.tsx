import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Popover,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryIcon from '@mui/icons-material/History';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import type { ShapeTool } from './useShapeEditor';

const TOOLS: { tool: ShapeTool; key: string; icon: React.ReactNode }[] = [
  { tool: 'select', key: 'select', icon: <NearMeOutlinedIcon fontSize="small" /> },
  { tool: 'polygon', key: 'polygon', icon: <PentagonOutlinedIcon fontSize="small" /> },
  { tool: 'angled-rectangle', key: 'rectangle', icon: <RectangleOutlinedIcon fontSize="small" /> },
  { tool: 'point', key: 'point', icon: <PlaceOutlinedIcon fontSize="small" /> },
];

const formatDay = (day: string, locale: string) =>
  new Date(`${day}T12:00:00`).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });

export interface MapEditBarProps {
  tool: ShapeTool;
  onToolChange: (tool: ShapeTool) => void;
  /** name(s) of what sits on the selected shape; '' for a shape without assignment */
  selectedName: string | null;
  onDescribe: () => void;
  canUndo: boolean;
  onUndo: () => void;
  /** the selected shape was drawn in this session and is deleted rather than ended */
  removeDeletes: boolean;
  onRemove: () => void;
  setupMode: boolean;
  onSetupModeChange: (setupMode: boolean) => void;
  changeDay: string;
  today: string;
  onChangeDayChange: (day: string) => void;
  onDone: () => void;
  busy?: boolean;
}

/**
 * The bar at the bottom edge while the garden map is edited: tools, hint, undo, taking a
 * shape off the map, how changes are kept (setup mode / change day) and "Done".
 * Slim on phones: icons only, the map stays free.
 */
export const MapEditBar = ({
  tool,
  onToolChange,
  selectedName,
  onDescribe,
  canUndo,
  onUndo,
  removeDeletes,
  onRemove,
  setupMode,
  onSetupModeChange,
  changeDay,
  today,
  onChangeDayChange,
  onDone,
  busy,
}: MapEditBarProps) => {
  const { t, i18n } = useTranslation('garden');
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const [historyAnchor, setHistoryAnchor] = useState<HTMLElement | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const selected = selectedName !== null;
  const displayName = selectedName || t('mapEdit.unnamed');
  const hint = selected ? t('mapEdit.hints.selected') : t(`mapEdit.hints.${TOOLS.find((x) => x.tool === tool)?.key}`);
  const historyLabel = setupMode
    ? t('mapEdit.setupChip')
    : t('mapEdit.historyChip', { date: formatDay(changeDay, i18n.language) });

  return (
    <>
      <Paper
        data-testid="map-edit-bar"
        elevation={6}
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: compact ? 6 : 16,
          transform: 'translateX(-50%)',
          width: compact ? 'calc(100% - 12px)' : 'auto',
          maxWidth: 860,
          px: compact ? 0.75 : 1.5,
          py: 0.75,
          zIndex: 5,
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={compact ? 0.5 : 1} alignItems="center">
          <ToggleButtonGroup
            size="small"
            exclusive
            value={tool}
            onChange={(_e, value: ShapeTool | null) => value && onToolChange(value)}
          >
            {TOOLS.map(({ tool: value, key, icon }) => (
              <ToggleButton
                key={value}
                value={value}
                data-testid={`map-edit-tool-${key}`}
                aria-label={t(`mapEdit.tools.${key}`)}
                sx={{ px: compact ? 0.75 : 1, gap: 0.5, textTransform: 'none' }}
              >
                {icon}
                {!compact && t(`mapEdit.tools.${key}`)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider orientation="vertical" flexItem />

          <Tooltip title={t('mapEdit.undo')}>
            <span>
              <IconButton size="small" onClick={onUndo} disabled={!canUndo} data-testid="map-edit-undo">
                <UndoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('mapEdit.remove')}>
            <span>
              <IconButton
                size="small"
                onClick={() => setConfirmRemove(true)}
                disabled={!selected}
                data-testid="map-edit-remove"
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Chip
            size="small"
            icon={<HistoryIcon fontSize="small" />}
            label={compact ? undefined : historyLabel}
            onClick={(e) => setHistoryAnchor(e.currentTarget)}
            variant={setupMode ? 'outlined' : 'filled'}
            data-testid="map-edit-history"
            sx={compact ? { '& .MuiChip-label': { display: 'none' }, '& .MuiChip-icon': { mx: 0.5 } } : undefined}
            aria-label={historyLabel}
          />

          <Box sx={{ flex: 1 }} />

          <Button
            size="small"
            variant="contained"
            onClick={onDone}
            disabled={busy}
            startIcon={<CheckIcon />}
            data-testid="map-edit-done"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {t('mapEdit.done')}
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, minHeight: 24 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            data-testid="map-edit-hint"
            sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {selected && (
              <Box component="strong" sx={{ color: 'text.primary', mr: 0.5 }} data-testid="map-edit-selected">
                {displayName}
              </Box>
            )}
            {selected ? `· ${hint}` : hint}
          </Typography>
          {selected && !selectedName && (
            <Button size="small" onClick={onDescribe} data-testid="map-edit-describe" sx={{ py: 0 }}>
              {t('mapEdit.describe')}
            </Button>
          )}
        </Stack>
      </Paper>

      <Popover
        open={Boolean(historyAnchor)}
        anchorEl={historyAnchor}
        onClose={() => setHistoryAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, maxWidth: 340 }}>
          <Typography variant="subtitle2" gutterBottom>
            {t('mapEdit.historyTitle')}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={setupMode}
                onChange={(e) => onSetupModeChange(e.target.checked)}
                data-testid="map-edit-setup-switch"
              />
            }
            label={t('mapEdit.setupSwitch')}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mb: setupMode ? 0 : 1.5 }}>
            {setupMode ? t('mapEdit.setupOn') : t('mapEdit.setupOff')}
          </Typography>
          {!setupMode && (
            <TextField
              type="date"
              size="small"
              label={t('mapEdit.changeDate')}
              value={changeDay}
              onChange={(e) => e.target.value && onChangeDayChange(e.target.value > today ? today : e.target.value)}
              slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: today, 'data-testid': 'map-edit-change-day' } }}
              fullWidth
            />
          )}
        </Box>
      </Popover>

      <Dialog open={confirmRemove} onClose={() => setConfirmRemove(false)} maxWidth="xs">
        <DialogTitle>{t('mapEdit.removeTitle', { name: displayName })}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {removeDeletes
              ? t('mapEdit.removeTextNew')
              : t('mapEdit.removeText', { date: formatDay(changeDay, i18n.language) })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRemove(false)}>{t('mapEdit.cancel')}</Button>
          <Button
            color="error"
            variant="contained"
            data-testid="map-edit-remove-confirm"
            onClick={() => {
              setConfirmRemove(false);
              onRemove();
            }}
          >
            {t('mapEdit.removeConfirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
