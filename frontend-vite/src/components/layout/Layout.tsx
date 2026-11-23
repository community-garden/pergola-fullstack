import { Box, styled } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useRemovalCleanup } from '../../hooks/useRemovalCleanup';
import { PathnameProvider } from '@graviola/edb-state-hooks';
import {
  PaintingFocusProvider,
  usePaintingFocus,
} from '../home/PaintingFocusContext';

// Import background image
import backgroundImage from '../../assets/background_full_grey_01.jpg';

// The background sits on a viewport-fixed layer, so it stays in place while long
// pages (settings, tables) scroll. On the container itself it would end after
// 100vh, because the content area is a flex child with basis 0 and overflows.
// A fixed layer also works on iOS, where `background-attachment: fixed` is ignored.
const RootContainer = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  isolation: 'isolate',
  '&::before': {
    content: '""',
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    pointerEvents: 'none',
    transition: 'transform 0.75s ease, filter 0.75s ease',
    transform: 'scale(1)',
    filter: 'brightness(1) saturate(1)',
  },
  '&[data-painting-focus="true"]::before': {
    transform: 'scale(1.06)',
    filter: 'brightness(1.04) saturate(1.1)',
  },
  '& .painting-focus-dim': {
    transition: 'opacity 0.55s ease',
    opacity: 1,
  },
  '&[data-painting-focus="true"] .painting-focus-dim': {
    opacity: 0,
    pointerEvents: 'none',
  },
}));

const ContentContainer = styled(Box)({
  flex: '1 1 0',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
});

const LayoutInner = () => {
  const { pathname } = useLocation();
  const { mode } = usePaintingFocus();
  useRemovalCleanup();

  const focusActive = mode !== 'closed';

  return (
    <PathnameProvider value={pathname}>
      <RootContainer
        data-painting-focus={focusActive ? 'true' : undefined}
        data-testid={focusActive ? 'painting-focus-active' : undefined}
      >
        <AppHeader className="painting-focus-dim" />
        <ContentContainer className="painting-focus-dim">
          <Outlet />
        </ContentContainer>
      </RootContainer>
    </PathnameProvider>
  );
};

const Layout = () => (
  <PaintingFocusProvider>
    <LayoutInner />
  </PaintingFocusProvider>
);

export default Layout;