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

const RootContainer = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'fixed',
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