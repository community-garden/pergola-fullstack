import { FC } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import {
  LocalFlorist,
  Info,
  Category,
  Science,
  Warning,
  Public,
} from "@mui/icons-material";
import type { Result as GbifResult } from "../../knowledge-bases/types/gbif-search";

export interface GbifDetailViewProps {
  data: GbifResult;
}

export const GbifDetailView: FC<GbifDetailViewProps> = ({ data }) => {
  // Helper to render taxonomy hierarchy
  const renderTaxonomy = () => {
    const taxonomyLevels = [
      { label: "Kingdom", value: data.kingdom },
      { label: "Phylum", value: data.phylum },
      { label: "Class", value: data.class },
      { label: "Order", value: data.order },
      { label: "Family", value: data.family },
      { label: "Genus", value: data.genus },
      { label: "Species", value: data.species },
    ];

    return (
      <Stack spacing={1}>
        {taxonomyLevels
          .filter((level) => level.value)
          .map((level) => (
            <Box key={level.label} display="flex" gap={1}>
              <Typography variant="body2" color="text.secondary" minWidth={80}>
                {level.label}:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {level.value}
              </Typography>
            </Box>
          ))}
      </Stack>
    );
  };

  // Helper to get status color
  const getStatusColor = (status: string): "success" | "warning" | "default" => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "SYNONYM":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <CardContent>
        {/* Header with scientific name */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LocalFlorist color="primary" />
          <Box flex={1}>
            <Typography variant="h6" component="div">
              <em>{data.scientificName}</em>
            </Typography>
            {data.authorship && (
              <Typography variant="caption" color="text.secondary">
                {data.authorship}
              </Typography>
            )}
          </Box>
          <Chip
            label={data.rank}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>

        {/* Common names */}
        {data.vernacularNames && data.vernacularNames.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Common Names:
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {data.vernacularNames.slice(0, 5).map((vn, idx) => (
                <Chip
                  key={idx}
                  label={`${vn.vernacularName}${vn.language ? ` (${vn.language})` : ""}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Status badges */}
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <Chip
            label={data.taxonomicStatus}
            size="small"
            color={getStatusColor(data.taxonomicStatus)}
          />
          {data.synonym && (
            <Chip
              label="Synonym"
              size="small"
              color="warning"
              icon={<Warning />}
            />
          )}
          {data.extinct && <Chip label="Extinct" size="small" color="error" />}
          {data.nameType && (
            <Chip
              label={data.nameType}
              size="small"
              variant="outlined"
              icon={<Science />}
            />
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Taxonomy section */}
        <Box mb={2}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Category fontSize="small" color="action" />
            <Typography variant="subtitle2">Taxonomy</Typography>
          </Stack>
          {renderTaxonomy()}
        </Box>

        {/* If it's a synonym, show accepted name */}
        {data.synonym && data.accepted && (
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Accepted Name:
            </Typography>
            <Typography variant="body2" color="primary">
              <em>{data.accepted}</em>
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Additional information */}
        <Stack spacing={1.5}>
          {/* Habitats */}
          {data.habitats && data.habitats.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Habitats:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {data.habitats.map((habitat, idx) => (
                  <Chip key={idx} label={habitat} size="small" />
                ))}
              </Stack>
            </Box>
          )}

          {/* Threat statuses */}
          {data.threatStatuses && data.threatStatuses.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom color="error">
                Conservation Status:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {data.threatStatuses.map((status, idx) => (
                  <Chip key={idx} label={status} size="small" color="error" />
                ))}
              </Stack>
            </Box>
          )}

          {/* Occurrences */}
          <Box display="flex" gap={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Occurrences
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {data.numOccurrences.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Descendants
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {data.numDescendants}
              </Typography>
            </Box>
          </Box>

          {/* External IDs */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <Public fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                GBIF Key: {data.key} | Taxon ID: {data.taxonID}
              </Typography>
            </Stack>
            {data.nubKey && (
              <Typography variant="caption" color="text.secondary">
                NUB Key: {data.nubKey}
              </Typography>
            )}
          </Box>

          {/* Descriptions */}
          {data.descriptions && data.descriptions.length > 0 && (
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Info fontSize="small" color="action" />
                <Typography variant="subtitle2">Description</Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxHeight: 200,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.descriptions[0].description.substring(0, 500)}
                {data.descriptions[0].description.length > 500 ? "..." : ""}
              </Typography>
            </Box>
          )}

          {/* Published in */}
          {data.publishedIn && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Published in: {data.publishedIn}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

