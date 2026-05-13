import { LocationRenderer, locationRendererTester } from './location/LocationRenderer';
import { PrimaryFieldRenderer, primaryFieldRendererTester } from './PrimaryFieldRenderer';

export const customRenderers = [
  { tester: locationRendererTester, renderer: LocationRenderer },
  { tester: primaryFieldRendererTester, renderer: PrimaryFieldRenderer },
];

