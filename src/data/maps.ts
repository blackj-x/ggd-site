import data from './maps.json';

export interface Annotation {
  type: string;
  x: number;
  y: number;
  label: string;
  note?: string;
}

export interface MapFeatures {
  hasVents: boolean;
  hasCCTV: boolean;
  hasJail: boolean;
  hasPreTask: boolean;
  dayNight: boolean;
  corruption: boolean;
  disposalAreas: number;
  mapSabotages: string[];
  hideSpots: string[];
}

export interface GameMap {
  slug: string;
  name: string;
  nameEn: string;
  aliases?: string[];
  theme: string;
  size: 'small' | 'medium' | 'large';
  summary: string;
  image?: string;
  imageW?: number;
  imageH?: number;
  features: MapFeatures;
  annotations?: Annotation[];
  strategy?: { goose?: string[]; duck?: string[]; neutral?: string[] };
  tips?: string[];
  updatedAt?: string;
}

export interface AnnotationType {
  name: string;
  color: string;
  icon: string;
}

export const annotationTypes = data.annotationTypes as Record<string, AnnotationType>;
export const maps = data.maps as GameMap[];
export const mapsVersion = data.version as string;

export const sizeLabel: Record<string, string> = {
  small: '小型',
  medium: '中型',
  large: '大型',
};

export const getMap = (slug: string) => maps.find((m) => m.slug === slug);
