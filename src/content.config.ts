import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CONTENT_CATEGORIES = [
  'Azure',
  'Inteligencia Artificial',
  'Arquitectura Cloud',
  'FinOps',
  'Automatización e IaC',
  'Seguridad y Gobierno',
  'Certificaciones',
  'Comunidad'
] as const;

const dateSchema = z.coerce.date();

const baseSchema = ({ image }: SchemaContext) => z.object({
  schemaVersion: z.literal(1).default(1),
  title: z.string().min(10).max(110),
  description: z.string().min(50).max(170),
  summary: z.string().min(50).max(320),
  category: z.enum(CONTENT_CATEGORIES),
  tags: z.array(z.string().min(2).max(40)).min(1).max(12).refine((items) => new Set(items.map((item) => item.toLowerCase())).size === items.length, 'Las etiquetas no deben repetirse'),
  publishedAt: dateSchema,
  updatedAt: dateSchema.optional(),
  author: z.string().default('Irving Omar Patron Padron'),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  reviewStatus: z.enum(['draft', 'reviewed', 'approved']).default('draft'),
  cover: image(),
  coverAlt: z.string().min(12).max(180),
  imageCredit: z.string().max(180).optional(),
  airtableRecordId: z.string().max(80).optional()
});

const idFromFolder = ({ entry }: { entry: string }) =>
  entry.replace(/\\/g, '/').replace(/\/index\.md$/i, '');

const articles = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/data/articles',
    generateId: idFromFolder
  }),
  schema: (context) => baseSchema(context).extend({
    contentType: z.literal('article')
  })
});

const guides = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/data/guides',
    generateId: idFromFolder
  }),
  schema: (context) => baseSchema(context).extend({
    contentType: z.literal('guide'),
    level: z.enum(['Inicial', 'Intermedio', 'Avanzado']),
    durationMinutes: z.number().int().min(1).max(600),
    prerequisites: z.array(z.string().min(2).max(120)).max(12).default([])
  })
});

const news = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/data/news',
    generateId: idFromFolder
  }),
  schema: (context) => baseSchema(context).extend({
    contentType: z.literal('news'),
    newsType: z.enum(['Anuncios', 'Noticias', 'Certificaciones', 'Eventos']),
    eventDate: dateSchema,
    sources: z.array(z.object({
      title: z.string().min(4).max(180),
      url: z.string().url().startsWith('https://')
    })).min(1).max(12)
  })
});

export const collections = { articles, guides, news };
