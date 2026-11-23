import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PergolaSemanticTable } from "@components/graviola/table/PergolaSemanticTable";
import { hiddenColumns, type TableUiSchema } from "@components/graviola/table/hiddenColumns";
import { useCreateOrEditModal } from "@hooks/useCreateOrEditModal";
import { useEventMutations } from "@hooks/useEventMutations";
import { usePergolaRowActions } from "@hooks/usePergolaRowActions";

/** Bookkeeping and detail columns; they can be switched on in the column menu. */
const EVENT_TABLE_UI_SCHEMA: TableUiSchema = {
  ...hiddenColumns(
    "garden",
    "timeZone",
    "sequence",
    "createdAt",
    "modifiedAt",
    "description",
    "url",
    "contact",
    "endsAt",
  ),
  // Latest first: what is coming up is on top, the history below.
  options: { defaultSort: { scope: "#/properties/startsOn", desc: true } },
};

/**
 * The garden's events as a Graviola table: create, edit, duplicate and delete
 * come from the table and its edit dialog. There is no calendar view yet.
 */
export const Events = () => {
  const { t } = useTranslation("events");
  const createOrEditModal = useCreateOrEditModal();
  const rowActions = usePergolaRowActions();
  const { createEvent } = useEventMutations();

  return (
    <Box
      data-testid="events-page"
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
      <Typography variant="h6" component="h1" sx={{ py: 1.5 }}>
        {t("title")}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <PergolaSemanticTable
          typeName="GardenEvent"
          tableUiSchema={EVENT_TABLE_UI_SCHEMA}
          onEditEntry={createOrEditModal}
          actionRegistry={rowActions}
          // a new event starts with today, confirmed, in the garden's zone
          callbacks={{ onCreateEntry: () => void createEvent() }}
        />
      </Box>
    </Box>
  );
};
