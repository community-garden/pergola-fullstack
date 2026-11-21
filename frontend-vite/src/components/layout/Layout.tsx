import { Box, styled } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import NiceModal from '@ebay/nice-modal-react';
import {
  GraviolaIntentBusProvider,
  PathnameProvider,
  MODAL_ENTITY_DETAIL,
  type GraviolaIntent,
} from '@graviola/edb-state-hooks';

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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useCallback((intent: GraviolaIntent) => {
    switch (intent.kind) {
      case 'show-entity':
        void NiceModal.show(MODAL_ENTITY_DETAIL, {
          entityIRI: intent.entityIRI,
          typeIRI: intent.typeIRI,
          readonly: true,
        });
        break;
      case 'entity-saved':
        enqueueSnackbar(intent.created ? 'Created' : 'Saved', { variant: 'success' });
        break;
      case 'entity-save-failed':
        enqueueSnackbar(`Error: ${intent.error.message}`, { variant: 'error' });
        break;
      case 'entity-removed':
        enqueueSnackbar('Removed', { variant: 'success' });
        break;
      case 'entity-removal-failed':
        enqueueSnackbar(intent.error.message, { variant: 'error' });
        break;
      case 'reload-completed':
        enqueueSnackbar(intent.message, { variant: intent.ok ? 'success' : 'error' });
        break;
      case 'navigate':
        void navigate(intent.href);
        break;
    }
  }, [enqueueSnackbar, navigate]);

  return (
    <GraviolaIntentBusProvider dispatch={dispatch}>
      <PathnameProvider value={pathname}>
        <RootContainer>
          <AppHeader />
          <ContentContainer>
            <Outlet />
          </ContentContainer>
        </RootContainer>
      </PathnameProvider>
    </GraviolaIntentBusProvider>
  );
};

export default Layout;