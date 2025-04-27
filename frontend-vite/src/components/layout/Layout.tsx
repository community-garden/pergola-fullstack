import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import BottomNav from './BottomNav';

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
  flex: '1 0 auto',
});

const Layout = () => {
  const { gardenId = '' } = useParams<{ gardenId: string }>();

  return (
    <RootContainer>
      <AppHeader />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <BottomNav gardenId={gardenId} />
    </RootContainer>
  );
};

export default Layout;