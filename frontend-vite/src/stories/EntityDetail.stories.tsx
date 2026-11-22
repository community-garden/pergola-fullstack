import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { withGraviolaViews } from '../../.storybook/GraviolaViewsProvider';
import { EntityDetailDialog } from '../components/entity-detail/EntityDetailDialog';
import {
  alexPerson,
  blaueHilde,
  igelBeet,
  karottenPflanzung,
  kletterbohne,
  knoblauch,
} from './fixtures/entityDetail';

/**
 * Detail view of any entity (the dialog behind "Show" / a click on an
 * entity). The content is Graviola's detail renderer — structured dispatch
 * over the type's schema — with the app's view settings
 * (provider/useDetailViewConfig). The entities come from
 * fixtures/entityDetail.ts; no store is involved.
 */
const meta = {
  title: 'Entity detail/Detail dialog',
  component: EntityDetailDialog,
  parameters: { layout: 'fullscreen' },
  decorators: [withGraviolaViews()],
  args: {
    ...knoblauch,
    onClose: action('close'),
    onEdit: action('edit'),
  },
} satisfies Meta<typeof EntityDetailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Plant species with image: the card with the image on top, then the properties. */
export const PlantSpecies: Story = {};

/** A second species: nutrient demand (enum), sowing months. */
export const PlantSpeciesKletterbohne: Story = {
  args: { ...kletterbohne },
};

/** Variety: the species is a nested entity. */
export const PlantVariety: Story = {
  args: { ...blaueHilde },
};

/** Bed without an image: responsible persons as nested entities, the geometry is hidden. */
export const Patch: Story = {
  args: { ...igelBeet },
};

/** Planting: bed, species and the person who asked for it are relations. */
export const Planting: Story = {
  args: { ...karottenPflanzung },
};

export const Person: Story = {
  args: { ...alexPerson },
};

/** While the entity is loading. */
export const Loading: Story = {
  args: { data: undefined },
};

/** Opened read-only: no "Edit" button. */
export const ReadOnly: Story = {
  args: { onEdit: undefined },
};

/** Layout variant: the image bleeds into one card that also holds the properties. */
export const VariantSingleCard: Story = {
  args: { config: { topLevelLayoutVariant: 'singleCardPropertiesFirst' } },
};

/** Layout variant: article layout (title, lede, sections, info box). */
export const VariantArticle: Story = {
  args: { config: { detailLayoutType: 'ArticleLayout' } },
};

/** Phone: the dialog fills the screen. */
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};
