import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const track = z.object({
  title: z.string(),
  src: z.string(),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    type: z.string(),
    cover: z.string(),
    order: z.number(),
    summary: z.string(),
    tracks: z.array(track).default([]),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    cover: z.string(),
    backCover: z.string().optional(),
    pdf: z.string(),
    order: z.number(),
    summary: z.string(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    youtubeId: z.string(),
    order: z.number(),
  }),
});

const productions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productions' }),
  schema: z.object({
    title: z.string(),
    meta: z.string().optional(),
    role: z.string().optional(),
    category: z.enum(['produccion', 'sesionista']),
    order: z.number(),
    spotifyType: z.enum(['album', 'track']).optional(),
    spotifyId: z.string().optional(),
    youtubeId: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    order: z.number(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
      }),
    ),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/settings' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    heroImage: z.string(),
    metaDescription: z.string(),
    linktree: z.string(),
    featured: z.array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        image: z.string(),
        href: z.string(),
      }),
    ),
  }),
});

export const collections = {
  albums,
  books,
  videos,
  productions,
  gallery,
  pages,
  settings,
};
