// 站点级配置 —— 域名在 astro.config.mjs 的 site 字段统一配置，这里放其余站点信息
export const SITE = {
  name: '鹅鸭攻略社',
  shortName: '鹅鸭攻略社',
  // 默认社交分享图（放在 public/og-default.svg），各页可覆盖
  defaultOgImage: '/og-default.png',
  locale: 'zh_CN',
  // 主题色（移动端浏览器地址栏）
  themeColor: '#151229',
  // Google Search Console HTML 标签验证码（meta content 值，留空则不输出标签）
  googleSiteVerification: '',
  // AdSense 发布商 ID（形如 ca-pub-1234567890123456，留空则不加载广告脚本）
  // 接入时同步创建 public/ads.txt：google.com, pub-xxxx, DIRECT, f08c47fec0942fa0
  adsenseClient: '',
};
