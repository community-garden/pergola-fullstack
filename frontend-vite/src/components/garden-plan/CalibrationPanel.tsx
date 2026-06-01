import React, { useRef } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CORNER_KEYS, CORNER_LABELS } from './types';
import type { CalibrationState, CornerKey } from './types';
import type { UploadStatus } from '../graviola/renderers/image-upload/useImageUpload';

interface CalibrationPanelProps {
  state: CalibrationState;
  uploadStatus: UploadStatus;
  uploadError: string | null;
  isCalibrated: boolean;
  nextCorner: CornerKey | null;
  onUpload: (file: File) => void;
  onSetOpacity: (opacity: number) => void;
  onConfirm: () => void;
  onReset: () => void;
}

export function CalibrationPanel({
  state,
  uploadStatus,
  uploadError,
  isCalibrated,
  nextCorner,
  onUpload,
  onSetOpacity,
  onConfirm,
  onReset,
}: CalibrationPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const corners = 'corners' in state ? state.corners : null;
  const opacity = state.stage === 'adjusting' ? state.opacity : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = '';
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        width: 260,
        zIndex: 10,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontSize: '1rem' }}>
        Garden Plan Calibration
      </Typography>

      {/* Upload */}
      {(state.stage === 'idle' || state.stage === 'uploading') && (
        <Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={uploadStatus === 'uploading'}
            onClick={() => fileInputRef.current?.click()}
            startIcon={uploadStatus === 'uploading' ? <CircularProgress size={16} /> : undefined}
          >
            {uploadStatus === 'uploading' ? 'Uploading…' : 'Upload Plan Image'}
          </Button>
          {uploadError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {uploadError}
            </Typography>
          )}
        </Box>
      )}

      {/* Corner placement status */}
      {corners && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {state.stage === 'placing_corners'
              ? `Place corners — click map to set ${nextCorner ? CORNER_LABELS[nextCorner] : ''}`
              : 'Corners placed — drag to adjust'}
          </Typography>
          <Stack direction="row" gap={0.5} flexWrap="wrap">
            {CORNER_KEYS.map(k => {
              const placed = corners[k] !== null;
              const isNext = k === nextCorner;
              return (
                <Chip
                  key={k}
                  label={CORNER_LABELS[k]}
                  size="small"
                  color={isNext ? 'primary' : placed ? 'success' : 'default'}
                  icon={placed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                  variant={isNext ? 'filled' : 'outlined'}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {/* Opacity slider */}
      {state.stage === 'adjusting' && opacity !== null && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Opacity: {Math.round(opacity * 100)}%
          </Typography>
          <Slider
            value={opacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(_, v) => onSetOpacity(v as number)}
            size="small"
          />
        </Box>
      )}

      {/* Confirmed notice */}
      {state.stage === 'confirmed' && (
        <Tooltip title="Plan georeferenced and overlaid on the map">
          <Chip label="Confirmed" color="success" icon={<CheckCircleIcon />} />
        </Tooltip>
      )}

      {/* Actions */}
      <Stack direction="row" gap={1}>
        {state.stage === 'adjusting' && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isCalibrated}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        )}
        {state.stage !== 'idle' && (
          <Button variant="outlined" fullWidth onClick={onReset}>
            Reset
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
