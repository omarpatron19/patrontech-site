import type { ContentEntry } from './content';

const SITE_URL = 'https://www.patrontechhub.com';
const AUTHOR_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

const authorEntity = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  name: 'Irving Omar Patron Padron',
  url: `${SITE_URL}/sobre-mi/`,
  sameAs: ['https://www.linkedin.com/in/omarpatron/']
};

export function buildContentJsonLd(entry: ContentEntry, url: string, imageUrl: string) {
  const type = entry.collection === 'news' ? 'NewsArticle' : 'TechArticle';
  const data = entry.data;
  const canonicalUrl = absoluteUrl(url);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline: data.title,
    description: data.description,
    image: [imageUrl],
    datePublished: data.publishedAt.toISOString(),
    dateModified: (data.updatedAt ?? data.publishedAt).toISOString(),
    mainEntityOfPage: canonicalUrl,
    isPartOf: { '@id': WEBSITE_ID },
    isAccessibleForFree: true,
    inLanguage: 'es-MX',
    author: authorEntity,
    publisher: authorEntity,
    keywords: data.tags.join(', '),
    articleSection: data.category,
    ...(entry.collection === 'news'
      ? { citation: entry.data.sources.map((source) => source.url) }
      : {})
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function buildCollectionPageJsonLd(title: string, description: string, path: string) {
  const url = absoluteUrl(path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'es-MX',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': AUTHOR_ID }
    },
    buildBreadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: title.replace(/\s*\|\s*PatronTech$/, ''), path }
    ])
  ];
}
