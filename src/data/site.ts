// 站点级配置 —— 域名在 astro.config.mjs 的 site 字段统一配置，这里放其余站点信息
export const SITE = {
  name: '鹅鸭攻略社',
  shortName: '鹅鸭攻略社',
  // 默认社交分享图（放在 public/og-default.svg），各页可覆盖
  defaultOgImage: '/og-default.png',
  locale: 'zh_CN',
  // 主题色（移动端浏览器地址栏）
  themeColor: '#151229',
};
