import { LocationRenderer, locationRendererTester } from './location/LocationRenderer';
import { PrimaryFieldRenderer, primaryFieldRendererTester } from './PrimaryFieldRenderer';
import { ImageUploadRenderer, imageUploadRendererTester } from './image-upload/ImageUploadRenderer';
import { ImageUrlRenderer, imageUrlRendererTester } from './image-url/ImageUrlRenderer';

export const customRenderers = [
  { tester: locationRendererTester, renderer: LocationRenderer },
  { tester: primaryFieldRendererTester, renderer: PrimaryFieldRenderer },
  { tester: imageUploadRendererTester, renderer: ImageUploadRenderer },
  { tester: imageUrlRendererTester, renderer: ImageUrlRenderer },
];

