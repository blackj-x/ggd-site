import data from './roles.json';

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
  winCondition: string;
  ability: string;
  tips?: string[];
  tags?: string[];
  tier?: string;
  maps?: string[];
  relations?: { canSee?: string[]; counters?: string[]; counteredBy?: string[] };
  updatedAt?: string;
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

export const campName: Record<string, string> = {
  goose: '鹅阵营',
  duck: '鸭阵营',
  neutral: '中立',
};

export const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n);

export const getRole = (slug: string) => roles.find((r) => r.slug === slug);
export const rolesByCamp = (camp: string) => roles.filter((r) => r.camp === camp);
