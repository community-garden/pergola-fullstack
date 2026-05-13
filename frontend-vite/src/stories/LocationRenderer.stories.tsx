import type { Meta, StoryObj } from '@storybook/react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { LocationRenderer, locationRendererTester } from '../components/graviola/renderers/location/LocationRenderer';

const meta = {
  title: 'Graviola/Location/LocationRenderer',
  component: LocationRenderer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = {
  type: 'object',
  properties: {
    location: {
      type: 'string',
      format: 'wktLiteral',
      title: 'Garden Location',
    },
  },
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/location',
    },
  ],
};

export const InJsonForm = () => {
  const [data, setData] = React.useState({});
  
  const renderers = [
    ...materialRenderers,
    { tester: locationRendererTester, renderer: LocationRenderer },
  ];
  
  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <pre style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export const WithExistingLocation = () => {
  const [data, setData] = React.useState({
    location: 'POINT(13.404954 52.520008)', // Berlin
  });
  
  const renderers = [
    ...materialRenderers,
    { tester: locationRendererTester, renderer: LocationRenderer },
  ];
  
  return (
    <div>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <pre style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

