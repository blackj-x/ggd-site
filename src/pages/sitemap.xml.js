import { roles } from '../data/roles';
import { maps } from '../data/maps';

export function GET({ site }) {
  const base = (site?.href ?? 'https://gooseduck.metaup.pro').replace(/\/$/, '');
  // 必须与 Base.astro 中 canonical + Astro 构建的实际页面 URL 完全一致（带尾斜杠）
  // 否则 GSC 会报“未检测到任何引荐站点地图”
  const staticPaths = ['/', '/roles/', '/maps/', '/guide/', '/about/', '/privacy/', '/contact/'];
  const rolePaths = roles.map((r) => `/roles/${r.slug}/`);
  const mapPaths = maps.map((m) => `/maps/${m.slug}/`);
  const roleUrls = roles.map((r) => {
    const lastmod = r.updatedAt || '2026-06-19';
    return `  <url><loc>${base}/roles/${r.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');
  const mapUrls = maps.map((m) => {
    const lastmod = m.updatedAt || '2026-06-06';
    return `  <url><loc>${base}/maps/${m.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');
  const urls = [...staticPaths.map(p => `  <url><loc>${base}${p}</loc></url>`), roleUrls, mapUrls].join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
