export function GET({ site }) {
  const base = (site?.href ?? 'https://gooseduck.metaup.pro/').replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
