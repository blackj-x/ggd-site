/**
 * i18n configuration for GGD site (and future MetaUp sites)
 * Strategy: Subdirectory routing (/en/ for English)
 * Chinese is default (no prefix)
 */

export const locales = ['zh', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'zh';

export const localeConfig: Record<Locale, {
  label: string;
  htmlLang: string;
  ogLocale: string;
  siteName: string;
}> = {
  zh: {
    label: '中文',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
    siteName: '鹅鸭攻略社',
  },
  en: {
    label: 'English',
    htmlLang: 'en',
    ogLocale: 'en_US',
    siteName: 'Goose Goose Duck Guide',
  },
};

// UI strings (common navigation + labels)
export const ui: Record<Locale, Record<string, string>> = {
  zh: {
    home: '首页',
    roles: '角色图鉴',
    maps: '地图攻略',
    guide: '新手入门',
    about: '关于本站',
    'camp.goose': '鹅阵营',
    'camp.duck': '鸭阵营',
    'camp.neutral': '中立',
    'role.compendium': '全角色图鉴',
    'map.guides': '地图攻略',
    searchPlaceholder: '搜索角色名 / 技能 / 关键词…',
    all: '全部',
    difficulty: '难度',
    tags: '标签',
    updated: '更新',
    source: '来源',
    footNote: '鹅鸭攻略社 · 角色数据持续更新 · 本站为玩家攻略站，与游戏官方无关',
    gameResources: '📸 含游戏资源',
    privacy: '隐私政策',
    contact: '联系我们',
  },
  en: {
    home: 'Home',
    roles: 'Roles',
    maps: 'Maps',
    guide: 'Beginner Guide',
    about: 'About',
    'camp.goose': 'Geese',
    'camp.duck': 'Ducks',
    'camp.neutral': 'Neutral',
    'role.compendium': 'Role Compendium',
    'map.guides': 'Map Guides',
    searchPlaceholder: 'Search roles, abilities, keywords…',
    all: 'All',
    difficulty: 'Difficulty',
    tags: 'Tags',
    updated: 'Updated',
    source: 'Sources',
    footNote: 'Goose Goose Duck Guide · Roles updated regularly · Unofficial player resource, not affiliated with the game',
    gameResources: '📸 Game Resources',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
  },
};

export function getUI(lang: Locale = defaultLocale) {
  return ui[lang] ?? ui[defaultLocale];
}

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en/') || pathname === '/en') return 'en';
  return 'zh';
}
