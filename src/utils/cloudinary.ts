/** Inserta transformaciones de Cloudinary sin tocar URLs ajenas. */
export function cloudinaryThumb(src: string, width = 480): string {
  const marker = '/image/upload/';
  const i = src.indexOf(marker);
  if (i === -1) return src;
  const head = src.slice(0, i + marker.length);
  const tail = src.slice(i + marker.length);
  // Evitar duplicar si ya hay transforms
  if (/^(c_|w_|h_|f_|q_|g_)/.test(tail)) return src;
  return `${head}c_fill,g_auto,w_${width},q_auto,f_auto/${tail}`;
}
