import data from './maps.json';
import type { Locale } from '../i18n/config';

export interface Annotation {
  type: string;
  x: number;
  y: number;
  label: string;
  labelEn?: string;
  note?: string;
  noteEn?: string;
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
  summaryEn?: string;
  image?: string;
  imageW?: number;
  imageH?: number;
  features: MapFeatures;
  annotations?: Annotation[];
  strategy?: { goose?: string[]; duck?: string[]; neutral?: string[] };
  strategyEn?: { goose?: string[]; duck?: string[]; neutral?: string[] };
  tips?: string[];
  tipsEn?: string[];
  mapSabotagesEn?: string[];
  hideSpotsEn?: string[];
  updatedAt?: string;
}

export interface AnnotationType {
  name: string;
  nameEn?: string;
  color: string;
  icon: string;
}

export const annotationTypes = data.annotationTypes as Record<string, AnnotationType>;
export const maps = data.maps as GameMap[];
export const mapsVersion = data.version as string;

// Chinese size labels kept for backward compat with existing zh pages
export const sizeLabel: Record<string, string> = {
  small: '小型',
  medium: '中型',
  large: '大型',
};

// English-friendly size labels
export const sizeLabelEn: Record<string, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
};

// English theme names for localized output (used by getLocalizedMaps('en'))
const themeEn: Record<string, string> = {
  '太空': 'Space',
  '维多利亚': 'Victorian',
  '丛林': 'Jungle',
  '沙漠': 'Desert',
  '小镇': 'Small Town',
  '嘉年华': 'Carnival',
  '怪兽': 'Kaiju',
};

export function getSizeLabel(size: string, lang: Locale = 'zh'): string {
  if (lang === 'en') return sizeLabelEn[size] || size;
  return sizeLabel[size] || size;
}

export const getMap = (slug: string, lang: Locale = 'zh') => {
  const m = maps.find((m) => m.slug === slug);
  if (!m) return undefined;
  return localizeMap(m, lang);
};

export function getLocalizedMaps(lang: Locale = 'zh'): GameMap[] {
  return maps.map((m) => localizeMap(m, lang));
}

export function getAnnotationTypes(lang: Locale = 'zh'): Record<string, AnnotationType> {
  const raw = annotationTypes;
  if (lang === 'zh') return raw;
  const localized: Record<string, AnnotationType> = {};
  for (const [key, val] of Object.entries(raw)) {
    localized[key] = {
      ...val,
      name: val.nameEn || val.name,
    };
  }
  return localized;
}

function localizeMap(map: GameMap, lang: Locale): GameMap {
  if (lang === 'zh') return map;

  const annotations = (map.annotations ?? []).map((a) => ({
    ...a,
    label: a.labelEn || a.label,
    note: a.noteEn || a.note,
  }));

  const strategy = map.strategyEn || map.strategy;
  const tips = map.tipsEn || map.tips;
  const summary = map.summaryEn || map.summary;

  // Prefer En versions for sabotage/hide labels when provided
  const features: MapFeatures = {
    ...map.features,
    mapSabotages: (map as any).mapSabotagesEn || map.features.mapSabotages,
    hideSpots: (map as any).hideSpotsEn || map.features.hideSpots,
  };

  return {
    ...map,
    name: map.nameEn || map.name,
    theme: themeEn[map.theme] || map.theme,
    summary,
    annotations,
    strategy,
    tips,
    features,
  };
}
