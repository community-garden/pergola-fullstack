import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import {
  ControlProps,
  RankedTester,
  rankWith,
  optionIs,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useImageUpload } from './useImageUpload';
import { useMediaConfig } from './MediaConfigContext';

export type ThumbnailSize = 'icon' | 'small' | 'medium' | 'large' | 'xlarge';

const THUMB_PX: Record<ThumbnailSize, number> = {
  icon: 64,
  small: 128,
  medium: 320,
  large: 640,
  xlarge: 1200,
};

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;
const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ImageUploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  allowSvg?: boolean;
  displaySize?: ThumbnailSize;
  apiBase?: string;
}

/** Encode an IRI to base64url (matches the server's Buffer.from(iri).toString('base64url')) */
function encodeIRIBase64url(iri: string): string {
  return btoa(unescape(encodeURIComponent(iri)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const ImageUploadRendererComponent: React.FC<ControlProps> = (props) => {
  const { data, handleChange, path, label, enabled = true, uischema } = props;
  const options = (uischema?.options ?? {}) as ImageUploadOptions;

  const { mediaApiBase } = useMediaConfig();

  const maxSizeBytes = options.maxSizeBytes ?? DEFAULT_MAX_BYTES;
  const displaySize: ThumbnailSize = options.displaySize ?? 'medium';
  // UISchema options.apiBase overrides the globally injected mediaApiBase
  const apiBase = options.apiBase ?? mediaApiBase;
  const allowedTypes = useMemo(() => {
    const base = options.allowedTypes ?? DEFAULT_ALLOWED_TYPES;
    return options.allowSvg ? [...base, 'image/svg+xml'] : base;
  }, [options.allowedTypes, options.allowSvg]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { status, error, mediaIri, encodedIRI, upload, reset } = useImageUpload({
    maxSizeBytes,
    allowedTypes,
    apiBase,
  });

  // Propagate new IRI to form data on successful upload
  useEffect(() => {
    if (status === 'done' && mediaIri) {
      handleChange(path, mediaIri);
    }
  }, [status, mediaIri, handleChange, path]);

  // Build thumbnail URL: prefer the freshly-uploaded encodedIRI, fall back to
  // re-encoding the pre-existing IRI that the form already holds in `data`.
  const activeEncodedIRI = encodedIRI ?? (data ? encodeIRIBase64url(data) : null);
  const thumbnailUrl = activeEncodedIRI
    ? `${apiBase}/${activeEncodedIRI}/thumb/${displaySize}`
    : null;
  const displayPx = THUMB_PX[displaySize];

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      e.target.value = '';
      await upload(file);
    },
    [upload]
  );

  const handleClear = useCallback(() => {
    reset();
    handleChange(path, undefined);
  }, [reset, handleChange, path]);

  const accept = allowedTypes.join(',');

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      {label && (
        <FormLabel sx={{ mb: 1, fontSize: '0.875rem' }}>{label}</FormLabel>
      )}

      {thumbnailUrl && (
        <Box
          sx={{
            mb: 1,
            width: displayPx,
            maxWidth: '100%',
            height: displayPx,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <img
            src={thumbnailUrl}
            alt={label || 'Uploaded image'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      )}

      {status === 'uploading' && (
        <Box sx={{ mb: 1 }}>
          <LinearProgress />
        </Box>
      )}

      {status === 'error' && error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={() => inputRef.current?.click()}
          disabled={!enabled || status === 'uploading'}
          size="small"
        >
          {thumbnailUrl ? 'Replace image' : 'Upload image'}
        </Button>

        {(data || thumbnailUrl) && (
          <Tooltip title="Remove image">
            <span>
              <IconButton size="small" onClick={handleClear} disabled={!enabled}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={!enabled}
        />
      </Box>

      {!thumbnailUrl && (
        <FormHelperText>
          {allowedTypes.map((t) => t.replace('image/', '')).join(', ')} · max{' '}
          {(maxSizeBytes / 1024 / 1024).toFixed(0)} MB
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const ImageUploadRenderer = withJsonFormsControlProps(ImageUploadRendererComponent);

export const imageUploadRendererTester: RankedTester = rankWith(
  10,
  optionIs('customRenderer', 'ImageUploadRenderer')
);
