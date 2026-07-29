import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPublishedContent, contentLabel } from '../lib/content';

export async function GET(context: APIContext) {
  const entries = await getAllPublishedContent();
  return rss({
    title: 'PatronTech',
    description: 'Artículos, guías y novedades sobre Azure, IA, arquitectura cloud y FinOps.',
    site: context.site ?? 'https://www.patrontechhub.com',
    items: entries.map(({ entry, url }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: url,
      categories: [contentLabel(entry), entry.data.category, ...entry.data.tags]
    })),
    customData: '<language>es-MX</language>'
  });
}
