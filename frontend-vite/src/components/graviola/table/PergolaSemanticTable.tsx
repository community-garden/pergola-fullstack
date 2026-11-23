import { useCallback, useRef, type ComponentProps } from "react";
import { Box } from "@mui/material";
import {
  DisplayModeToggleButton,
  SemanticTable,
  resolveTableViewSettings,
  useResponsiveDisplayMode,
  type SemanticTableDisplayMode,
} from "@graviola/edb-table-components";
import { useAdbContext } from "@graviola/edb-state-hooks";

import { PergolaAdaptiveListTable } from "./PergolaAdaptiveListTable";

export type PergolaSemanticTableProps = ComponentProps<typeof SemanticTable>;

/**
 * Graviola {@link SemanticTable} with Pergola's list quick filter wired through
 * {@link useAdaptiveListSearch} (see {@link PergolaAdaptiveListTable}).
 *
 * In table mode, `<SemanticTable>` renders its built-in toolbar toggle via
 * `viewMode="auto"` (`listBreakpointPx={1}` keeps responsive breakpoint
 * ownership in the outer `useResponsiveDisplayMode`) and hands `"list"`
 * transitions back through `onDisplayModeChange`.
 */
export const PergolaSemanticTable = (props: PergolaSemanticTableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { table: tableAppConfig } = useAdbContext();
  const viewSettings = resolveTableViewSettings({
    typeName: props.typeName,
    viewMode: props.viewMode,
    enableViewSwitch: props.enableViewSwitch,
    listBreakpointPx: props.listBreakpointPx,
    tableConfig: tableAppConfig,
  });

  const { effectiveMode, toggleDisplayMode, setDisplayMode } =
    useResponsiveDisplayMode({
      containerRef,
      listBreakpointPx: viewSettings.listBreakpointPx,
      configuredMode: viewSettings.configuredMode,
      onDisplayModeChange: props.onDisplayModeChange,
    });

  const canSwitchView =
    viewSettings.enableViewSwitch && viewSettings.configuredMode === "auto";

  const handleTableDisplayModeChange = useCallback(
    (mode: SemanticTableDisplayMode) => {
      if (mode === "list") {
        setDisplayMode("list");
      }
    },
    [setDisplayMode],
  );

  const shellSx =
    props.layout === "embedded"
      ? { position: "relative" as const, width: "100%" }
      : {
          flex: 1,
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
          position: "relative" as const,
          display: "flex",
          flexDirection: "column" as const,
        };

  if (effectiveMode === "list") {
    return (
      <Box ref={containerRef} sx={shellSx}>
        <PergolaAdaptiveListTable
          {...props}
          viewSwitchAction={
            canSwitchView ? (
              <DisplayModeToggleButton mode="list" onToggle={toggleDisplayMode} />
            ) : undefined
          }
        />
      </Box>
    );
  }

  return (
    <Box ref={containerRef} sx={shellSx}>
      <SemanticTable
        {...props}
        rowShape="jsonld"
        viewMode={canSwitchView ? "auto" : "table"}
        listBreakpointPx={1}
        enableViewSwitch={canSwitchView}
        onDisplayModeChange={canSwitchView ? handleTableDisplayModeChange : undefined}
      />
    </Box>
  );
};