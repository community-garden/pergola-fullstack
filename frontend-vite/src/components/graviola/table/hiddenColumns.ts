import type { ComponentProps } from "react";
import type { SemanticTable } from "@graviola/edb-table-components";

export type TableUiSchema = NonNullable<ComponentProps<typeof SemanticTable>["tableUiSchema"]>;

/**
 * Table UI schema that hides technical columns plus the given properties
 * (they can still be switched on in the column menu).
 *
 * A property scope `#/properties/<key>` covers every column Graviola derives
 * from it (`<key>_single`, `<key>_entity`, `<key>_label_group`); `@id` covers
 * the `IRI` column. `entity` is the raw id of the entity-link column.
 */
export const hiddenColumns = (...keys: string[]): TableUiSchema => ({
  type: "Table",
  mode: "blacklist",
  columns: [
    { scope: "#/properties/@id", visibility: "hiddenByDefault" },
    { scope: "#/properties/@type", visibility: "hiddenByDefault" },
    { scope: "entity", visibility: "hiddenByDefault" },
    ...keys.map((key) => ({ scope: `#/properties/${key}`, visibility: "hiddenByDefault" as const })),
  ],
});
