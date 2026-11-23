import { useEffect } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Link,
  Portal,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { usePaintingFocus } from './PaintingFocusContext';

const ARTIST_URL = 'http://www.joachim-tilsch.de/';

const PaintingCredit = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const { mode, setMode, close } = usePaintingFocus();
  // Phones report a tap as hover and then never leave it, so hover is desktop-only.
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  const isPinned = mode === 'pinned';
  const isOpen = mode !== 'closed';

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  const handleClusterMouseEnter = () => {
    if (canHover && mode !== 'pinned') setMode('hover');
  };

  const handleClusterMouseLeave = () => {
    if (canHover && mode === 'hover') setMode('closed');
  };

  const handleCreditClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (mode === 'pinned') {
      setMode('closed');
    } else {
      setMode('pinned');
    }
  };

  return (
    <Portal>
      {isOpen && (
        <Box
          aria-hidden
          data-testid="painting-focus-overlay"
          onClick={close}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: theme.zIndex.appBar - 1,
            cursor: 'default',
          }}
        />
      )}

      <Box
        onMouseEnter={handleClusterMouseEnter}
        onMouseLeave={handleClusterMouseLeave}
        sx={{
          position: 'fixed',
          right: { xs: 12, sm: 20 },
          bottom: { xs: 12, sm: 20 },
          zIndex: theme.zIndex.appBar + 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 0.5,
        }}
      >
        <Collapse in={isOpen} orientation="vertical" unmountOnExit>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              pl: 1.5,
              pr: 0.5,
              py: 0.25,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.common.white, 0.55)}`,
              backgroundColor: alpha(theme.palette.common.white, 0.92),
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: theme.shadows[2],
            }}
          >
            <Link
              href={ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="painting-artist-link"
              variant="caption"
              fontWeight={600}
              underline="always"
              sx={{ color: 'primary.dark' }}
            >
              {t('home.visitArtist')}
            </Link>
            <IconButton
              size="small"
              aria-label={t('home.closePaintingFocus')}
              data-testid="painting-focus-close"
              onClick={close}
              sx={{ color: 'text.primary' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Collapse>

        <Box
          component="button"
          type="button"
          data-testid="painting-credit"
          onClick={handleCreditClick}
          sx={{
            m: 0,
            px: 1.5,
            py: 0.75,
            border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
            borderRadius: 2,
            cursor: 'pointer',
            font: 'inherit',
            color: 'text.primary',
            backgroundColor: alpha(theme.palette.common.white, 0.72),
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: theme.shadows[2],
            transition: theme.transitions.create(['background-color', 'box-shadow']),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.92),
              boxShadow: theme.shadows[4],
            },
          }}
        >
          <Typography variant="caption" component="span" fontWeight={500}>
            {t('home.paintingCredit')}
          </Typography>
        </Box>
      </Box>
    </Portal>
  );
};

export default PaintingCredit;