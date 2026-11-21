import { useEffect, useState } from 'react';
import { and, isStringControl, optionIs, rankWith, type ControlProps, type RankedTester } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { useInputVariant } from '@jsonforms/material-renderers';
import { Box, TextField } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import { useTranslation } from 'react-i18next';
import { resolveMediaUrl } from '@utils/mediaUrl';

const PREVIEW = 56;

/**
 * A plain image URL (absolute, or relative to the app root such as
 * `/media/plants/kartoffel/frucht.webp`) with a small preview.
 *
 * Use it on a string control with `options.customRenderer: "ImageUrlRenderer"`.
 * Unlike the ImageUploadRenderer it needs no media server: the image is a
 * static asset or lives elsewhere on the web.
 */
const ImageUrlRendererComponent = ({
  data,
  handleChange,
  path,
  label,
  description,
  enabled,
  visible,
  required,
  id,
}: ControlProps) => {
  const { t } = useTranslation('jsonforms');
  const variant = useInputVariant();
  const value = typeof data === 'string' ? data : '';
  const src = resolveMediaUrl(value);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!visible) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, my: 1 }}>
      <Box
        data-testid="image-url-preview"
        sx={{
          width: PREVIEW,
          height: PREVIEW,
          flexShrink: 0,
          borderRadius: 1,
          border: 1,
          borderColor: failed ? 'error.main' : 'divider',
          bgcolor: 'rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          color: failed ? 'error.main' : 'text.disabled',
        }}
      >
        {src && !failed ? (
          <Box
            component="img"
            src={src}
            alt={label}
            onError={() => setFailed(true)}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : failed ? (
          <BrokenImageOutlinedIcon />
        ) : (
          <ImageOutlinedIcon />
        )}
      </Box>
      <TextField
        id={`${id}-input`}
        fullWidth
        variant={variant}
        label={label}
        required={required}
        disabled={!enabled}
        value={value}
        placeholder="/media/…"
        onChange={(e) => handleChange(path, e.target.value.trim() ? e.target.value : undefined)}
        error={failed}
        helperText={failed ? t('image.notFound', { defaultValue: 'Image not found' }) : description}
      />
    </Box>
  );
};

export const ImageUrlRenderer = withJsonFormsControlProps(ImageUrlRendererComponent);

export const imageUrlRendererTester: RankedTester = rankWith(
  10,
  and(isStringControl, optionIs('customRenderer', 'ImageUrlRenderer')),
);
