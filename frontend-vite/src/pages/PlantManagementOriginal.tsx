import { useMemo } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PergolaSemanticTable } from "@components/graviola/table/PergolaSemanticTable";
import { useCreateOrEditModal } from "@hooks/useCreateOrEditModal";
import { usePergolaRowActions } from "@hooks/usePergolaRowActions";
import { PlantCalendarTab } from "@components/plants/PlantCalendarTab";
import { hiddenColumns, type TableUiSchema } from "@components/graviola/table/hiddenColumns";

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

const DEFAULT_TABLE_UI_SCHEMA = hiddenColumns();
const TABLE_UI_SCHEMAS: Record<string, TableUiSchema> = {
  PlantSpecies: hiddenColumns(...BOTANICAL_COLUMNS, "careInfo", "siteInfo", "description"),
  PlantVariety: hiddenColumns(...BOTANICAL_COLUMNS),
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
  const rowActions = usePergolaRowActions();
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
          <PergolaSemanticTable
            key={active.typeName}
            typeName={active.typeName}
            tableUiSchema={TABLE_UI_SCHEMAS[active.typeName] ?? DEFAULT_TABLE_UI_SCHEMA}
            onEditEntry={createOrEditModal}
            actionRegistry={rowActions}
          />
        ) : (
          <PlantCalendarTab />
        )}
      </Box>
    </Box>
  );
};
