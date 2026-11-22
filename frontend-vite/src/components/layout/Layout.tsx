import { Box, styled } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import { usePlacementCleanup } from '../../hooks/usePlacementCleanup';
import { PathnameProvider } from '@graviola/edb-state-hooks';

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
  },
}));

const ContentContainer = styled(Box)({
  flex: '1 1 0',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
});

const Layout = () => {
  const { pathname } = useLocation();
  usePlacementCleanup();

  return (
    // Graviola intents (show, edit, saved, …) are answered by PergolaIntentBus
    // in the GraviolaProvider, which also covers the modals.
    <PathnameProvider value={pathname}>
        <RootContainer>
          <AppHeader />
          <ContentContainer>
            <Outlet />
          </ContentContainer>
        </RootContainer>
    </PathnameProvider>
  );
};

export default Layout;