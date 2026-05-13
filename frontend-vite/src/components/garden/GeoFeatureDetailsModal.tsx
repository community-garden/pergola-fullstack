import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useAnyOfFilterStore } from '@graviola/edb-state-hooks';
import type { Patch } from '../../schema/patch-schema';
import type { Workshop, Shed, BeeStand, Path, Seating, FirePlace } from '../../schema/feature-types-schema';
import { GeoFeatureInfo } from './GeoFeatureInfo';
import { FeatureTypeSelector } from './FeatureTypeSelector';
import { PatchFeatureCard } from './feature/PatchFeatureCard';
import { WorkshopFeatureCard } from './feature/WorkshopFeatureCard';
import { ShedFeatureCard } from './feature/ShedFeatureCard';
import { BeeStandFeatureCard } from './feature/BeeStandFeatureCard';
import { PathFeatureCard } from './feature/PathFeatureCard';
import { SeatingFeatureCard } from './feature/SeatingFeatureCard';
import { FirePlaceFeatureCard } from './feature/FirePlaceFeatureCard';
import { NewFeatureWizardNiceModal } from './NewFeatureWizardNiceModal';
import { GardenFeatureType } from './feature-type-mapping';

interface GeoFeature {
  '@id': string;
  '@type'?: string;
  name?: string;
  description?: string;
  geo: string;
  creationTime?: string;
  modificationTime?: string;
  [key: string]: any;
}

interface GeoFeatureDetailsModalProps {
  feature: GeoFeature;
}

export const GeoFeatureDetailsModal = NiceModal.create<GeoFeatureDetailsModalProps>(({ feature }) => {
  const modal = useModal();
  const { t } = useTranslation('garden');

  // Use the new useAnyOfFilterStore to query multiple types at once
  const { data: relatedFeatures, isLoading: isLoadingFeatures } = useAnyOfFilterStore<{
    patches: Patch[];
    workshops: Workshop[];
    sheds: Shed[];
    beeStands: BeeStand[];
    paths: Path[];
    seating: Seating[];
    firePlaces: FirePlace[];
  }>(
    {
      patches: "Patch",
      workshops: "Workshop",
      sheds: "Shed",
      beeStands: "BeeStand",
      paths: "Path",
      seating: "Seating",
      firePlaces: "FirePlace",
    },
    {
      where: {
        geoFeature: {
          '@id': feature['@id']
        }
      }
    }
  );

  // Calculate total features and determine which accordion should be expanded
  const { totalFeatures, firstFeatureType } = useMemo(() => {
    if (!relatedFeatures) return { totalFeatures: 0, firstFeatureType: null };

    const total = 
      relatedFeatures.patches.length +
      relatedFeatures.workshops.length +
      relatedFeatures.sheds.length +
      relatedFeatures.beeStands.length +
      relatedFeatures.paths.length +
      relatedFeatures.seating.length +
      relatedFeatures.firePlaces.length;

    // Determine first feature type (in order of priority)
    let first = null;
    if (relatedFeatures.patches.length > 0) first = 'patches';
    else if (relatedFeatures.workshops.length > 0) first = 'workshops';
    else if (relatedFeatures.sheds.length > 0) first = 'sheds';
    else if (relatedFeatures.beeStands.length > 0) first = 'beeStands';
    else if (relatedFeatures.paths.length > 0) first = 'paths';
    else if (relatedFeatures.seating.length > 0) first = 'seating';
    else if (relatedFeatures.firePlaces.length > 0) first = 'firePlaces';

    return { totalFeatures: total, firstFeatureType: first };
  }, [relatedFeatures]);

  const handleClose = () => {
    modal.remove();
  };

  const handleFeatureSelect = (featureType: GardenFeatureType) => {
    // Open the NewFeatureWizardNiceModal with pre-selected feature type
    NiceModal.show(NewFeatureWizardNiceModal, {
      geoFeatureIRI: feature['@id'],
      preselectedFeatureType: featureType,
    });
  };

  return (
    <Dialog
      open={modal.visible}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionProps={{
        onExited: () => modal.remove(),
      }}
    >
      <DialogTitle>
        {feature.name || t('geoFeature.title')}
      </DialogTitle>

      <DialogContent>
        {isLoadingFeatures && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={32} />
          </Box>
        )}

        {!isLoadingFeatures && relatedFeatures && (
          <Box sx={{ mt: 1 }}>
            {/* GeoFeature Accordion */}
            <Accordion
              defaultExpanded={totalFeatures === 0}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t('geoFeature.details')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <GeoFeatureInfo feature={feature} />
                {totalFeatures === 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {t('features.noFeaturesAttached')}
                    </Typography>
                    <FeatureTypeSelector
                      onFeatureSelect={handleFeatureSelect}
                      title={t('features.createNew')}
                      showSelection={false}
                    />
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Patch Accordions */}
            {relatedFeatures.patches.map((patch, index) => (
              <Accordion
                key={patch['@id']}
                defaultExpanded={firstFeatureType === 'patches' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🌱 {patch.name || t('features.types.Beet')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PatchFeatureCard patch={patch} />
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Workshop Accordions */}
            {relatedFeatures.workshops.map((workshop, index) => (
              <Accordion
                key={workshop['@id']}
                defaultExpanded={firstFeatureType === 'workshops' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🏠 {workshop.name || t('features.types.Gewächshaus')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <WorkshopFeatureCard workshop={workshop} />
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Shed Accordions */}
            {relatedFeatures.sheds.map((shed, index) => (
              <Accordion
                key={shed['@id']}
                defaultExpanded={firstFeatureType === 'sheds' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🏚️ {shed.name || t('features.types.Schuppen')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ShedFeatureCard shed={shed} />
                </AccordionDetails>
              </Accordion>
            ))}

            {/* BeeStand Accordions */}
            {relatedFeatures.beeStands.map((beeStand, index) => (
              <Accordion
                key={beeStand['@id']}
                defaultExpanded={firstFeatureType === 'beeStands' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🐝 {beeStand.name || t('features.types.Bienenstand')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BeeStandFeatureCard beeStand={beeStand} />
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Path Accordions */}
            {relatedFeatures.paths.map((path, index) => (
              <Accordion
                key={path['@id']}
                defaultExpanded={firstFeatureType === 'paths' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🛤️ {path.name || t('features.types.Weg')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PathFeatureCard path={path} />
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Seating Accordions */}
            {relatedFeatures.seating.map((seating, index) => (
              <Accordion
                key={seating['@id']}
                defaultExpanded={firstFeatureType === 'seating' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🪑 {seating.name || t('features.types.Sitzgelegenheit')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SeatingFeatureCard seating={seating} />
                </AccordionDetails>
              </Accordion>
            ))}

            {/* FirePlace Accordions */}
            {relatedFeatures.firePlaces.map((firePlace, index) => (
              <Accordion
                key={firePlace['@id']}
                defaultExpanded={firstFeatureType === 'firePlaces' && index === 0}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    🔥 {firePlace.name || t('features.types.Feuerstelle')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FirePlaceFeatureCard firePlace={firePlace} />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
});
