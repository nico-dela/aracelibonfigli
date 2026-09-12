type ImageItem = { src: string; alt?: string };

const MEMORY_CACHE: HTMLImageElement[] = [];
const CACHE_NAME = 'araceli-gallery-v1';

function pinInMemory(url: string) {
  if (!url || MEMORY_CACHE.some((img) => img.src === url)) return;
  const keep = new Image();
  keep.decoding = 'async';
  keep.src = url;
  MEMORY_CACHE.push(keep);
}

async function pinInCacheStorage(url: string) {
  if (!('caches' in window) || !url.startsWith('http')) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(url);
    if (!hit) await cache.add(url);
  } catch {
    // CORS o red: el pin en memoria igual ayuda
  }
}

function pinImage(img: HTMLImageElement) {
  const url = img.currentSrc || img.src;
  if (!url) return;
  img.loading = 'eager';
  pinInMemory(url);
  void pinInCacheStorage(url);
}

function initThumbCache() {
  document.querySelectorAll<HTMLImageElement>('[data-gallery-thumb]').forEach((img) => {
    const done = () => pinImage(img);
    if (img.complete && img.naturalWidth > 0) done();
    else img.addEventListener('load', done, { once: true });
  });
}

export function initGallery() {
  if (document.documentElement.dataset.galleryInit === '1') return;
  document.documentElement.dataset.galleryInit = '1';

  initThumbCache();

  document.querySelectorAll<HTMLElement>('.gallery-grid').forEach((grid) => {
    const dialog = grid.parentElement?.querySelector<HTMLDialogElement>(
      '[data-gallery-dialog]',
    );
    if (!dialog) return;

    const imageEl = dialog.querySelector<HTMLImageElement>('[data-gallery-image]');
    const captionEl = dialog.querySelector('[data-gallery-caption]');
    const thumbs = [...grid.querySelectorAll<HTMLElement>('[data-gallery-open]')];
    const images: ImageItem[] = thumbs.map((thumb) => {
      const img = thumb.querySelector('img');
      const full = thumb.dataset.fullSrc || img?.src || '';
      return { src: full, alt: img?.alt ?? '' };
    });

    let index = 0;

    const show = (i: number) => {
      index = (i + images.length) % images.length;
      const item = images[index];
      if (!item || !imageEl) return;
      imageEl.src = item.src;
      imageEl.alt = item.alt ?? '';
      pinInMemory(item.src);
      void pinInCacheStorage(item.src);
      if (captionEl) captionEl.textContent = `${index + 1} / ${images.length}`;
    };

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        show(Number(thumb.dataset.index ?? 0));
        dialog.showModal();
      });
    });

    dialog.querySelector('[data-gallery-close]')?.addEventListener('click', () => {
      dialog.close();
    });
    dialog.querySelector('[data-gallery-prev]')?.addEventListener('click', () => {
      show(index - 1);
    });
    dialog.querySelector('[data-gallery-next]')?.addEventListener('click', () => {
      show(index + 1);
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
}
