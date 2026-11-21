import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { resolveMediaUrl } from '@utils/mediaUrl';

interface PlantIconProps {
  /** Emoji, shown when there is no image (or it fails to load) */
  icon?: string;
  /** Main image URL of the plant */
  image?: string;
  /** Edge length in px */
  size: number;
  /** false shows the emoji even if there is an image */
  preferImage?: boolean;
  /** round (default, for small symbols) or a rounded square that shows more of the picture */
  shape?: 'circle' | 'rounded';
}

/**
 * Symbol of a plant: its main image as a small round picture, or its emoji.
 * The image has a fixed size, so layouts (e.g. map label collisions) do not
 * shift while it loads.
 */
export const PlantIcon = ({ icon, image, size, preferImage = true, shape = 'circle' }: PlantIconProps) => {
  const src = preferImage ? resolveMediaUrl(image) : undefined;
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (src && !failed) {
    return (
      <Box
        component="img"
        src={src}
        alt=""
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
        sx={{
          width: size,
          height: size,
          borderRadius: shape === 'circle' ? '50%' : '18%',
          objectFit: 'cover',
          verticalAlign: 'middle',
          flexShrink: 0,
          display: 'inline-block',
        }}
      />
    );
  }
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: size,
        textAlign: 'center',
        fontSize: Math.round(size * 0.8),
        lineHeight: `${size}px`,
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    >
      {icon ?? '🌱'}
    </Box>
  );
};
