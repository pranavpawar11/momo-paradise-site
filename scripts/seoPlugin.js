import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Injects title, description, Restaurant + FAQ structured data, and emits robots.txt / sitemap.xml.
// All values come from src/config, so there is one source of truth.
// Set VITE_SITE_URL (for example https://your-temporary-host.example) at build time; the custom domain can be added later.
export function seoPlugin() {
  const load = (file) => import(pathToFileURL(path.resolve('src/config', file)).href);
  const siteUrl = () => (process.env.VITE_SITE_URL || '').replace(/\/$/, '');

  return {
    name: 'momo-seo',
    async transformIndexHtml(html) {
      const [{ BRAND }, { CONTACT }, { OPENING_HOURS }, { FAQ }] = await Promise.all(
        ['brand.js', 'contact.js', 'openingHours.js', 'faq.js'].map(load),
      );
      const site = siteUrl();
      const restaurant = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: BRAND.name,
        description: BRAND.seoDescription,
        telephone: CONTACT.phoneIntl,
        servesCuisine: 'Momos',
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONTACT.address.street,
          addressLocality: CONTACT.address.city,
          addressRegion: CONTACT.address.state,
          postalCode: CONTACT.address.postalCode,
          addressCountry: CONTACT.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: CONTACT.coordinates.lat, longitude: CONTACT.coordinates.lng },
        sameAs: CONTACT.instagram.map((i) => i.url),
        ...(site ? { url: `${site}/`, image: `${site}/og.jpg` } : {}),
      };
      // Opening hours are only added when a weekly schedule is confirmed (none is yet).
      const faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      };
      const tags = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(restaurant), injectTo: 'head' },
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(faq), injectTo: 'head' },
      ];
      if (site) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${site}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${site}/og.jpg` }, injectTo: 'head' },
        );
      }
      void OPENING_HOURS;
      return {
        html: html.replaceAll('{{TITLE}}', BRAND.seoTitle).replaceAll('{{DESCRIPTION}}', BRAND.seoDescription),
        tags,
      };
    },
    generateBundle() {
      const site = siteUrl();
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`,
      });
      if (site) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc></url>\n</urlset>\n`,
        });
      }
    },
  };
}
