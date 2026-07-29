import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;
export type GuideEntry = CollectionEntry<'guides'>;
export type NewsEntry = CollectionEntry<'news'>;
export type ContentEntry = ArticleEntry | GuideEntry | NewsEntry;

function sortNewestFirst<T extends { data: { publishedAt: Date } }>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}


export async function getPublishedArticles(): Promise<ArticleEntry[]> {
  return sortNewestFirst(await getCollection('articles', ({ data }) => !data.draft && data.reviewStatus === 'approved'));
}

export async function getPublishedGuides(): Promise<GuideEntry[]> {
  return sortNewestFirst(await getCollection('guides', ({ data }) => !data.draft && data.reviewStatus === 'approved'));
}

export async function getPublishedNews(): Promise<NewsEntry[]> {
  return sortNewestFirst(await getCollection('news', ({ data }) => !data.draft && data.reviewStatus === 'approved'));
}

export async function getAllPublishedContent() {
  const [articles, guides, news] = await Promise.all([
    getPublishedArticles(),
    getPublishedGuides(),
    getPublishedNews()
  ]);

  return [
    ...articles.map((entry) => ({ entry, collection: 'articles' as const, url: `/articulos/${entry.id}/` })),
    ...guides.map((entry) => ({ entry, collection: 'guides' as const, url: `/guias/${entry.id}/` })),
    ...news.map((entry) => ({ entry, collection: 'news' as const, url: `/novedades/${entry.id}/` }))
  ].sort(
    (a, b) => b.entry.data.publishedAt.getTime() - a.entry.data.publishedAt.getTime()
  );
}

export function contentUrl(entry: ContentEntry): string {
  if (entry.collection === 'articles') return `/articulos/${entry.id}/`;
  if (entry.collection === 'guides') return `/guias/${entry.id}/`;
  return `/novedades/${entry.id}/`;
}

export function contentLabel(entry: ContentEntry): string {
  if (entry.collection === 'guides') return 'Guía';
  if (entry.collection === 'news') return entry.data.newsType;
  return 'Artículo';
}

export function readingMinutes(body = ''): number {
  const plainText = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~\[\]()!-]/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 210));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}
