import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from '@theme/index';
import Layout from '@components/layout/Layout';
import {
  Home,
  GardenMap,
  Watering,
  Notifications,
  Settings,
  LandingPage,
  WateringWizard,
  PlantManagement,
  SeasonPlanner,
  BedPlan,
  Events,
} from './pages';
import './i18n';

// Create a client

const App = () => {
  return (
          <ThemeContextProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:gardenId/*" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="map" element={<GardenMap />} />
                <Route path="watering" element={<Watering />} />
                <Route path="watering/wizard" element={<WateringWizard />} />
                <Route path="watering/wizard/:stepNumber" element={<WateringWizard />} />
                <Route path="plants" element={<PlantManagement />} />
                <Route path="season-planner" element={<SeasonPlanner />} />
                <Route path="events" element={<Events />} />
                <Route path="beds/:patchId/plan" element={<BedPlan />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="garden-settings" element={<Settings />} />
              </Route>
            </Routes>
          </ThemeContextProvider>
  );
};

export default App;
