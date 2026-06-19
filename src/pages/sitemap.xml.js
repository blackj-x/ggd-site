import { roles } from '../data/roles';
import { maps } from '../data/maps';

export function GET({ site }) {
  const base = (site?.href ?? 'https://gooseduck.metaup.pro').replace(/\/$/, '');
  // 必须与 Base.astro 中 canonical + Astro 构建的实际页面 URL 完全一致（带尾斜杠）
  // 否则 GSC 会报“未检测到任何引荐站点地图”
  const staticPaths = ['/', '/roles/', '/maps/', '/guide/', '/about/', '/privacy/', '/contact/'];
  const rolePaths = roles.map((r) => `/roles/${r.slug}/`);
  const mapPaths = maps.map((m) => `/maps/${m.slug}/`);
  const urls = [...staticPaths, ...rolePaths, ...mapPaths]
    .map((p) => `  <url><loc>${base}${p}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
