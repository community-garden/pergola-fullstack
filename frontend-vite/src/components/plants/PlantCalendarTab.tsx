import { useMemo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SeasonalGrowingCalendar } from '@components/garden/SeasonalGrowingCalendar';
import { useSeasonData } from '@hooks/useSeasonData';
import { GARDEN_NS, type PlantInfo } from '../../api/season';
import type { PlantSpecies, PlantVariety } from '../../schema';

const toGrowingSeason = (plant: PlantInfo) => {
  const { preCultivation, sowing, planting, harvest } = plant.phases;
  return {
    ...(preCultivation && { preCultivationStart: preCultivation[0], preCultivationEnd: preCultivation[1] }),
    ...(sowing && { sowingStart: sowing[0], sowingEnd: sowing[1] }),
    ...(planting && { plantingStart: planting[0], plantingEnd: planting[1] }),
    ...(harvest && { harvestStart: harvest[0], harvestEnd: harvest[1] }),
  };
};

const toSpecies = (plant: PlantInfo): PlantSpecies => ({
  '@id': plant.iri,
  '@type': `${GARDEN_NS}PlantSpecies`,
  name: plant.name,
  icon: plant.icon,
  family: plant.family,
  growingSeason: toGrowingSeason(plant),
  ...(plant.spacing !== undefined && { physicalCharacteristics: { spacing: plant.spacing } }),
  ...(plant.germinationDays !== undefined || plant.daysToHarvest !== undefined
    ? { timing: { germinationDays: plant.germinationDays, daysToHarvest: plant.daysToHarvest } }
    : {}),
});

/**
 * Read-only sowing / planting / harvest calendar of all species and varieties
 * (varieties inherit the species calendar unless they define their own).
 */
export const PlantCalendarTab = () => {
  const { t } = useTranslation('garden');
  const { data, isLoading, error } = useSeasonData();

  const calendarData = useMemo(() => {
    const rows: (PlantSpecies | PlantVariety)[] = [];
    const species = data.plants
      .filter((p) => p.kind === 'species')
      .sort((a, b) => a.name.localeCompare(b.name, 'de'));
    species.forEach((s) => {
      rows.push(toSpecies(s));
      data.plants
        .filter((v) => v.kind === 'variety' && v.speciesIri === s.iri)
        .forEach((v) => {
          const own = toGrowingSeason(v);
          rows.push({
            '@id': v.iri,
            '@type': `${GARDEN_NS}PlantVariety`,
            name: v.name,
            species: toSpecies(s),
            ...(v.spacing !== undefined && { physicalCharacteristics: { spacing: v.spacing } }),
            ...(v.germinationDays !== undefined || v.daysToHarvest !== undefined
              ? { timing: { germinationDays: v.germinationDays, daysToHarvest: v.daysToHarvest } }
              : {}),
            ...(Object.keys(own).length > 0 && { growingSeason: own }),
          });
        });
    });
    return rows;
  }, [data.plants]);

  // a column nobody has filled in yet would only show dashes
  const visibleProperties = (['germinationDays', 'daysToHarvest', 'spacing'] as const).filter((key) =>
    data.plants.some((p) => p[key] !== undefined),
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">{t('seasonPlanner.loadError')}</Typography>;
  }
  return <SeasonalGrowingCalendar data={calendarData} defaultVisibleProperties={visibleProperties} />;
};
