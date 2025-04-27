import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { ThemeContextProvider } from '@theme/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@auth/index';
import Layout from '@components/layout/Layout';
import {
  Home,
  GardenMap,
  Watering,
  Notifications,
  Settings,
  GardenSettings,
  LandingPage,
  WateringWizard
} from './pages';
import './i18n';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeContextProvider>
            <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:gardenId/*" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="map" element={<GardenMap />} />
                <Route path="watering" element={<Watering />} />
                <Route path="watering/wizard" element={<WateringWizard />} />
                <Route path="watering/wizard/:stepNumber" element={<WateringWizard />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
                <Route path="garden-settings" element={<GardenSettings />} />
              </Route>
            </Routes>
            </Router>
          </ThemeContextProvider>
        </AuthProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
