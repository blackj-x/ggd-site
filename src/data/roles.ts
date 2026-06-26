import data from './roles.json';
import type { Locale } from '../i18n/config';

export interface Role {
  slug: string;
  name: string;
  nameEn: string;
  aliases?: string[];
  camp: 'goose' | 'duck' | 'neutral';
  icon: string;
  art?: string;
  difficulty: number;
  canKill: boolean;
  canVote: boolean;
  canVent?: boolean;
  summary: string;
  summaryEn?: string;
  winCondition: string;
  winConditionEn?: string;
  ability: string;
  abilityEn?: string;
  tips?: string[];
  tipsEn?: string[];
  tags?: string[];
  tier?: string;
  maps?: string[];
  relations?: { canSee?: string[]; counters?: string[]; counteredBy?: string[] };
  updatedAt?: string;
  real_resources?: {
    appearance?: string;
    appearanceEn?: string;
    gameplay_examples?: string;
    gameplay_examplesEn?: string;
    counters?: string;
    countersEn?: string;
    strategies?: string;
    strategiesEn?: string;
    speechcraft?: string;
    speechcraftEn?: string;
    sources?: string;
    youtube_ids?: string[];
    image?: string;
  };
}

export interface Camp {
  name: string;
  en: string;
  color: string;
  goal: string;
}

export const camps = data.camps as Record<string, Camp>;
export const roles = data.roles as Role[];
export const version = data.version as string;
export const dataUpdatedAt = data.updatedAt as string;

export const campName: Record<string, Record<Locale, string>> = {
  goose: { zh: '鹅阵营', en: 'Geese' },
  duck: { zh: '鸭阵营', en: 'Ducks' },
  neutral: { zh: '中立', en: 'Neutral' },
};

export const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n);

export function getRole(slug: string, lang: Locale = 'zh'): Role | undefined {
  const role = roles.find((r) => r.slug === slug);
  if (!role) return undefined;
  return localizeRole(role, lang);
}

export const rolesByCamp = (camp: string) => roles.filter((r) => r.camp === camp);

function localizeRole(role: Role, lang: Locale): Role {
  if (lang === 'zh') return role;

  return {
    ...role,
    name: role.nameEn || role.name,
    summary: role.summaryEn || role.summary,
    winCondition: role.winConditionEn || role.winCondition,
    ability: role.abilityEn || role.ability,
    tips: role.tipsEn || role.tips,
    real_resources: role.real_resources
      ? {
          ...role.real_resources,
          appearance: role.real_resources.appearanceEn || role.real_resources.appearance,
          gameplay_examples: role.real_resources.gameplay_examplesEn || role.real_resources.gameplay_examples,
          counters: role.real_resources.countersEn || role.real_resources.counters,
          strategies: role.real_resources.strategiesEn || role.real_resources.strategies,
          speechcraft: role.real_resources.speechcraftEn || role.real_resources.speechcraft,
        }
      : undefined,
  };
}

// Helper to get localized camp name
export function getCampName(camp: string, lang: Locale = 'zh'): string {
  return campName[camp]?.[lang] || campName[camp]?.zh || camp;
}

// Get all roles localized (for lists)
export function getLocalizedRoles(lang: Locale = 'zh'): Role[] {
  return roles.map((r) => localizeRole(r, lang));
}
