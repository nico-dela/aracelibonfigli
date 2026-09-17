import { getCollection } from 'astro:content';
import { spotifyThumb } from './spotify';

export type RecentWork = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  year: number;
  month: number;
  kind: 'album' | 'book' | 'video' | 'production';
};

const PLACEHOLDER = '/media/images/svg/produccion-placeholder.svg';

function sortKey(year: number, month: number) {
  return year * 100 + month;
}

function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

async function productionImage(entry: {
  data: {
    youtubeId?: string;
    spotifyId?: string;
    spotifyIds?: string[];
    spotifyType?: 'album' | 'track';
  };
}): Promise<string> {
  if (entry.data.youtubeId) return youtubeThumb(entry.data.youtubeId);
  const id = entry.data.spotifyId ?? entry.data.spotifyIds?.[0];
  if (id && entry.data.spotifyType) {
    const thumb = await spotifyThumb(entry.data.spotifyType, id);
    if (thumb) return thumb;
  }
  return PLACEHOLDER;
}

export async function getRecentWorks(limit = 6): Promise<RecentWork[]> {
  const [albums, books, videos, productions] = await Promise.all([
    getCollection('albums'),
    getCollection('books'),
    getCollection('videos'),
    getCollection('productions'),
  ]);

  const productionWorks = await Promise.all(
    productions.map(async (entry) => ({
      id: entry.id,
      title: entry.data.title,
      subtitle:
        entry.data.category === 'produccion'
          ? `Producción • ${entry.data.year}`
          : `Sesión • ${entry.data.year}`,
      description: entry.data.role ?? entry.data.meta ?? 'Trabajo en estudio',
      image: await productionImage(entry),
      href: `/estudio/#${entry.id}`,
      year: entry.data.year,
      month: entry.data.month ?? 12,
      kind: 'production' as const,
    })),
  );

  const works: RecentWork[] = [
    ...albums.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      subtitle: `${entry.data.type} • ${entry.data.year}`,
      description: entry.data.summary,
      image: entry.data.cover,
      href: `/musica/#${entry.id}`,
      year: entry.data.year,
      month: entry.data.month ?? 12,
      kind: 'album' as const,
    })),
    ...books.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      subtitle: `Poemario • ${entry.data.year}`,
      description: entry.data.summary,
      image: entry.data.cover,
      href: `/libros/#${entry.id}`,
      year: entry.data.year,
      month: entry.data.month ?? 12,
      kind: 'book' as const,
    })),
    ...videos.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      subtitle: `Video • ${entry.data.year}`,
      description: entry.data.subtitle ?? 'Obra audiovisual',
      image: youtubeThumb(entry.data.youtubeId),
      href: `/videos/#${entry.id}`,
      year: entry.data.year,
      month: entry.data.month ?? 12,
      kind: 'video' as const,
    })),
    ...productionWorks,
  ];

  return works
    .sort((a, b) => {
      const byDate = sortKey(b.year, b.month) - sortKey(a.year, a.month);
      if (byDate !== 0) return byDate;
      return a.title.localeCompare(b.title, 'es');
    })
    .slice(0, limit);
}
