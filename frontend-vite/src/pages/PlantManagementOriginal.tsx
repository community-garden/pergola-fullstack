import { useMemo } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SemanticTable, TableConfigRegistry } from "@graviola/edb-table-components";
import { useCreateOrEditModal } from "@hooks/useCreateOrEditModal";
import { PlantCalendarTab } from "@components/plants/PlantCalendarTab";

// Graviola names its columns `<key>_single` (scalar), `<key>_entity` (nested
// object), `<key>_label_group` (list) or `<key>`: hide all variants.
const COLUMN_ID_SUFFIXES = ["", "_single", "_entity", "_label_group"];
const hidden = (...keys: string[]) =>
  Object.fromEntries(
    ["IRI", "entity", "@id", "@type", ...keys].flatMap((k) =>
      COLUMN_ID_SUFFIXES.map((suffix) => [`${k}${suffix}`, false]),
    ),
  );

/** Botanical / technical columns that gardeners do not need in the overview. */
const BOTANICAL_COLUMNS = [
  "canGrowFromSeed",
  "imageUrl",
  "images",
  "taxonomy",
  "climateData",
  "externalIdentifiers",
  "authorityLinks",
  "growingSeason",
  "requirements",
  "physicalCharacteristics",
  "timing",
  "gardeningInfo",
];

const tableConfigRegistry: TableConfigRegistry = {
  default: { columnVisibility: hidden() },
  PlantSpecies: {
    columnVisibility: hidden(...BOTANICAL_COLUMNS, "careInfo", "siteInfo", "description"),
  },
  PlantVariety: { columnVisibility: hidden(...BOTANICAL_COLUMNS) },
};

const TABS = [
  { key: "species", typeName: "PlantSpecies" },
  { key: "varieties", typeName: "PlantVariety" },
  { key: "seeds", typeName: "SeedStock" },
  { key: "plantings", typeName: "Planting" },
  { key: "calendar", typeName: undefined },
] as const;

export const PlantManagement = () => {
  const { t } = useTranslation("garden");
  const createOrEditModal = useCreateOrEditModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get("tab") ?? "species";
  const active = useMemo(() => TABS.find((tab) => tab.key === activeKey) ?? TABS[0], [activeKey]);

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        px: 2,
        pb: 2,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={active.key}
        onChange={(_e, key) => setSearchParams({ tab: key })}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ mb: 1 }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.key} value={tab.key} label={t(`plantManagement.tabs.${tab.key}`)} />
        ))}
      </Tabs>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        {active.typeName ? (
          <SemanticTable
            key={active.typeName}
            typeName={active.typeName}
            tableConfigRegistry={tableConfigRegistry}
            onEditEntry={createOrEditModal}
          />
        ) : (
          <PlantCalendarTab />
        )}
      </Box>
    </Box>
  );
};
