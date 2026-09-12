const thumbCache = new Map<string, string | null>();

type SpotifyEmbedType = 'album' | 'track';

/** Portada vía oEmbed de Spotify (cacheada por build). */
export async function spotifyThumb(
  type: SpotifyEmbedType,
  id: string,
): Promise<string | null> {
  const key = `${type}:${id}`;
  if (thumbCache.has(key)) return thumbCache.get(key) ?? null;

  try {
    const spotifyUrl = `https://open.spotify.com/${type}/${id}`;
    const endpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`;
    const res = await fetch(endpoint);
    if (!res.ok) {
      thumbCache.set(key, null);
      return null;
    }
    const data = (await res.json()) as { thumbnail_url?: string };
    const thumb =
      typeof data.thumbnail_url === 'string' && data.thumbnail_url.length > 0
        ? data.thumbnail_url
        : null;
    thumbCache.set(key, thumb);
    return thumb;
  } catch {
    thumbCache.set(key, null);
    return null;
  }
}
