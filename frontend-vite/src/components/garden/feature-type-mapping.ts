// Feature type mapping for the new feature wizard

export const GARDEN_FEATURES = [
  'Beet',
  'Gewächshaus',
  'Schuppen',
  'Bienenstand',
  'Weg',
  'Sitzgelegenheit',
  'Feuerstelle',
] as const;

export type GardenFeatureType = typeof GARDEN_FEATURES[number];

export interface FeatureTypeInfo {
  typeName: string;
  typeIRI: string;
  icon?: string;
}

export const featureTypeMapping: Record<GardenFeatureType, FeatureTypeInfo> = {
  'Beet': {
    typeName: 'Patch',
    typeIRI: 'https://ontology.semantic-desk.top/garden#Patch',
    icon: '🌱',
  },
  'Gewächshaus': {
    typeName: 'Workshop',
    typeIRI: 'https://ontology.semantic-desk.top/garden#Workshop',
    icon: '🏠',
  },
  'Schuppen': {
    typeName: 'Shed',
    typeIRI: 'https://ontology.semantic-desk.top/garden#Shed',
    icon: '🏚️',
  },
  'Bienenstand': {
    typeName: 'BeeStand',
    typeIRI: 'https://ontology.semantic-desk.top/garden#BeeStand',
    icon: '🐝',
  },
  'Weg': {
    typeName: 'Path',
    typeIRI: 'https://ontology.semantic-desk.top/garden#Path',
    icon: '🛤️',
  },
  'Sitzgelegenheit': {
    typeName: 'Seating',
    typeIRI: 'https://ontology.semantic-desk.top/garden#Seating',
    icon: '🪑',
  },
  'Feuerstelle': {
    typeName: 'FirePlace',
    typeIRI: 'https://ontology.semantic-desk.top/garden#FirePlace',
    icon: '🔥',
  },
};

// Helper function to get type info by German name
export const getFeatureTypeInfo = (featureType: GardenFeatureType): FeatureTypeInfo | undefined => {
  return featureTypeMapping[featureType];
};

// Helper function to get type name by German name
export const getTypeName = (featureType: GardenFeatureType): string | undefined => {
  return featureTypeMapping[featureType]?.typeName;
};

// Helper function to get type IRI by German name
export const getTypeIRI = (featureType: GardenFeatureType): string | undefined => {
  return featureTypeMapping[featureType]?.typeIRI;
};




