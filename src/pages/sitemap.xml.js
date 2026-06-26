import { roles } from '../data/roles';
import { maps } from '../data/maps';

export function GET({ site }) {
  const base = (site?.href ?? 'https://gooseduck.metaup.pro').replace(/\/$/, '');
  // Chinese + English sitemap entries
  const staticPathsZh = ['/', '/roles/', '/maps/', '/guide/', '/meeting/', '/duck-tactics/', '/about/', '/privacy/', '/contact/'];
  const staticPathsEn = ['/en/', '/en/roles/', '/en/maps/', '/en/guide/', '/en/meeting/', '/en/duck-tactics/', '/en/about/', '/en/contact/', '/en/privacy/'];

  const roleUrlsZh = roles.map((r) => {
    const lastmod = r.updatedAt || '2026-06-19';
    return `  <url><loc>${base}/roles/${r.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');

  const roleUrlsEn = roles.map((r) => {
    const lastmod = r.updatedAt || '2026-06-19';
    return `  <url><loc>${base}/en/roles/${r.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');

  const mapUrlsZh = maps.map((m) => {
    const lastmod = m.updatedAt || '2026-06-06';
    return `  <url><loc>${base}/maps/${m.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');

  const mapUrlsEn = maps.map((m) => {
    const lastmod = m.updatedAt || '2026-06-06';
    return `  <url><loc>${base}/en/maps/${m.slug}/</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');

  const today = '2026-06-26';
  const urls = [
    ...staticPathsZh.map(p => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`),
    ...staticPathsEn.map(p => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`),
    roleUrlsZh,
    roleUrlsEn,
    mapUrlsZh,
    mapUrlsEn
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
