import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { withStoryProvider } from '../../.storybook/StoryProvider';
import {
  ImageUploadRenderer,
  imageUploadRendererTester,
} from '../components/graviola/renderers/image-upload/ImageUploadRenderer';
import {
  gardenPhotoSchema,
  gardenPhotoUiSchema,
} from '../schema/demo-garden-photo-schema';

const renderers = [
  ...materialRenderers,
  { tester: imageUploadRendererTester, renderer: ImageUploadRenderer },
];

const meta = {
  title: 'Graviola/Media/ImageUploadRenderer',
  decorators: [withStoryProvider()],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ImageUploadRenderer

A custom JsonForms renderer that handles image uploads to the Pergola media API.

### How to activate

In your UISchema, set \`options.customRenderer: "ImageUploadRenderer"\` on any string control:

\`\`\`json
{
  "type": "Control",
  "scope": "#/properties/image",
  "options": {
    "customRenderer": "ImageUploadRenderer",
    "displaySize": "medium",
    "maxSizeBytes": 5242880,
    "allowedTypes": ["image/jpeg", "image/png", "image/webp"]
  }
}
\`\`\`

### UISchema options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`displaySize\` | \`"icon" \\| "small" \\| "medium" \\| "large" \\| "xlarge"\` | \`"medium"\` | Thumbnail size to display |
| \`maxSizeBytes\` | number | 5242880 (5 MB) | Max upload size |
| \`allowedTypes\` | string[] | \`["image/jpeg","image/png","image/webp","image/gif"]\` | Accepted MIME types |
| \`allowSvg\` | boolean | false | Also allow SVG uploads (served directly, not proxied through picturium) |

### Form data value

The field stores the full semantic IRI of the \`MediaAttachment\` entity, e.g.
\`https://data.semantic-desk.top/garden/Media/{uuid}\`. This can then be linked
to any other entity in the RDF graph.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// ── Story 1: Standalone upload field ─────────────────────────────────────────

const standaloneSchema = {
  type: 'object',
  properties: {
    photo: {
      type: 'string',
      format: 'attachment',
      title: 'Garden photo',
    },
  },
};

const standaloneUiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/photo',
      options: {
        customRenderer: 'ImageUploadRenderer',
        displaySize: 'medium',
        maxSizeBytes: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        // apiBase is NOT set here — it comes from MediaConfigContext (global)
      },
    },
  ],
};

export const StandaloneUploadField = () => {
  const [data, setData] = React.useState<Record<string, unknown>>({});

  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h6" gutterBottom>
        Standalone image upload field
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click "Upload image" to select a file. The field stores the semantic IRI
        of the created <code>MediaAttachment</code> entity. Without a running API
        the upload will fail gracefully — the error state is shown.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <JsonForms
          schema={standaloneSchema}
          uischema={standaloneUiSchema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data: d }) => setData(d as Record<string, unknown>)}
        />
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Form data:
        </Typography>
        <pre
          style={{
            marginTop: 4,
            padding: 8,
            background: '#f5f5f5',
            borderRadius: 4,
            fontSize: 12,
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};

StandaloneUploadField.storyName = 'Standalone upload field';

// ── Story 2: Full GardenPhoto form ───────────────────────────────────────────

export const GardenPhotoForm = () => {
  const [data, setData] = React.useState<Record<string, unknown>>({ title: 'Rose corner' });

  return (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h6" gutterBottom>
        GardenPhoto form — image + icon fields
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Demonstrates two different upload fields in one form: a full-size photo
        (medium thumbnail, max 5 MB) and a small icon (64 px preview, max 2 MB,
        SVG allowed). Both store IRIs pointing to separate{' '}
        <code>MediaAttachment</code> entities.
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip label="photo → displaySize: medium" size="small" variant="outlined" />
        <Chip label="icon → displaySize: icon + allowSvg" size="small" variant="outlined" />
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <JsonForms
          schema={gardenPhotoSchema}
          uischema={gardenPhotoUiSchema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data: d }) => setData(d as Record<string, unknown>)}
        />
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Form data (IRIs stored here after upload):
        </Typography>
        <pre
          style={{
            marginTop: 4,
            padding: 8,
            background: '#f5f5f5',
            borderRadius: 4,
            fontSize: 12,
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </Box>
    </Box>
  );
};

GardenPhotoForm.storyName = 'GardenPhoto form (image + icon)';

// ── Story 3: Pre-existing IRI (thumbnail display) ─────────────────────────────

export const WithExistingMediaIRI = () => {
  // Simulate a form that already has a stored media IRI from a previous session.
  // The thumbnail URL will be constructed client-side and attempted; without a
  // running API it will show a broken image — this is expected in Storybook.
  const existingIRI =
    'https://data.semantic-desk.top/garden/Media/00000000-0000-0000-0000-000000000001';

  const [data, setData] = React.useState<Record<string, unknown>>({
    photo: existingIRI,
  });

  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h6" gutterBottom>
        Pre-existing IRI — thumbnail reconstruction
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        When a form field already contains a media IRI (loaded from the store),
        the renderer reconstructs the thumbnail URL client-side using base64url
        encoding and requests it from <code>/api/media/:base64iri/thumb/medium</code>.
        Without a running API the image placeholder is shown.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <JsonForms
          schema={standaloneSchema}
          uischema={standaloneUiSchema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data: d }) => setData(d as Record<string, unknown>)}
        />
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Pre-loaded IRI:
        </Typography>
        <pre
          style={{
            marginTop: 4,
            padding: 8,
            background: '#f5f5f5',
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          {existingIRI}
        </pre>
      </Box>
    </Box>
  );
};

WithExistingMediaIRI.storyName = 'Pre-existing IRI (thumbnail from store)';
