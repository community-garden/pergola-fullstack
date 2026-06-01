import { Box } from "@mui/material";
import { SemanticTable, TableConfigRegistry } from "@graviola/edb-table-components";
import { useCreateOrEditModal } from "@hooks/useCreateOrEditModal";


const tableConfigRegistry: TableConfigRegistry = {
  default: {
    columnVisibility: {
      IRI: false,
      entity: false,
      '@id': false,
      '@type': false,
    },
  },
};
export const PlantManagement = () => {
  const createOrEditModal = useCreateOrEditModal();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <SemanticTable
          typeName="PlantSpecies"
          tableConfigRegistry={tableConfigRegistry}
          onEditEntry={createOrEditModal}
        />
      </Box>
    </Box>
  );
};

