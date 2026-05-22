/**
 * Demo schema for a GardenPhoto entity — illustrates how to attach an image
 * to any data model using the ImageUploadRenderer. Not wired into the live app;
 * used by Storybook to demonstrate the upload renderer.
 */
import type { JsonSchema7 } from '@jsonforms/core';
import type { UISchemaElement } from '@jsonforms/core';

export const gardenPhotoSchema: JsonSchema7 = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Photo title',
      minLength: 1,
    },
    description: {
      type: 'string',
      title: 'Description',
    },
    image: {
      type: 'string',
      format: 'attachment',
      title: 'Photo',
    },
    icon: {
      type: 'string',
      format: 'attachment',
      title: 'Icon',
    },
  },
  required: ['title'],
};

export const gardenPhotoUiSchema: UISchemaElement = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/title',
    },
    {
      type: 'Control',
      scope: '#/properties/description',
    },
    {
      type: 'Control',
      scope: '#/properties/image',
      options: {
        customRenderer: 'ImageUploadRenderer',
        displaySize: 'medium',
        maxSizeBytes: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      },
    },
    {
      type: 'Control',
      scope: '#/properties/icon',
      options: {
        customRenderer: 'ImageUploadRenderer',
        displaySize: 'icon',
        maxSizeBytes: 2 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        allowSvg: true,
      },
    },
  ],
} as UISchemaElement;
