import { Box, Divider } from '@mui/material';
import { rankWith, uiTypeIs } from '@jsonforms/core';
import { DetailHero, EntityActionsBar, TopLevelLayoutRenderer } from '@graviola/edb-detail-renderer';
import { type DetailRendererProps, type DetailRendererRegistryEntry } from '@graviola/edb-detail-renderer-core';
import type { EntityActionDef } from '@graviola/edb-core-types';

/**
 * Detail layout of a bed: the usual hero card and properties, plus the type's
 * own actions (e.g. "open bed planning") as a button row inside the card.
 *
 * Graviola's default `TopLevelLayout` has no slot for actions (only its card
 * view does), so this renderer outranks it for one type through
 * `extraRenderers`. Other types get their layout the same way.
 */
export const createActionsTopLevelLayout = (
  typeName: string,
  actions: EntityActionDef[],
): DetailRendererRegistryEntry => {
  const Layout = (props: DetailRendererProps) => {
    const { uiSchema, dispatch, ctx, rootSchema, rootData } = props;
    // the tester cannot know the entity's type name; other types keep Graviola's layout
    if (ctx.typeName !== typeName) return <TopLevelLayoutRenderer {...props} />;
    const layout = uiSchema as { elements?: Parameters<typeof dispatch>[0]['uiSchema'][]; options?: { headline?: string } };
    return (
      <Box>
        <DetailHero ctx={ctx} headline={layout.options?.headline} variant="card">
          <Box sx={{ mt: 1.5 }} data-testid="entity-detail-actions">
            <EntityActionsBar
              surface="detail"
              declaredActions={actions}
              // only the type's own actions: "Show" and "Edit" from the default registry are redundant in the dialog
              registry={[]}
              schema={rootSchema}
              data={rootData}
              ctx={ctx}
              maxVisible={4}
            />
          </Box>
        </DetailHero>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {(layout.elements ?? []).map((el, i) => (
            <Box key={i}>{dispatch({ uiSchema: el, ctx })}</Box>
          ))}
        </Box>
      </Box>
    );
  };
  return {
    tester: rankWith(20, uiTypeIs('TopLevelLayout')),
    renderer: Layout,
  };
};
