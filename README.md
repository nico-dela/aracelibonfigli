# Araceli Bonfigli

Sitio editorial con **Astro**. Contenido en Markdown (`src/content/`). Deploy gratis en GitHub Pages; solo se paga el dominio.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:4321](http://localhost:4321).

## Cómo actualizar contenido

Editá los archivos en `src/content/`:

| Qué querés cambiar | Dónde |
| --- | --- |
| Hero, Linktree, cantidad de recientes | `src/content/settings/site.md` |
| Biografía | `src/content/pages/bio.md` |
| Álbum / tracks | `src/content/albums/` |
| Poemario / PDF | `src/content/books/` |
| Video de YouTube | `src/content/videos/` |
| Crédito de estudio | `src/content/productions/` |
| Set de fotos | `src/content/gallery/` |

Media (audio, imágenes, PDFs) en `public/media/`.

## Estructura

- `src/content/` — fuente de verdad del contenido
- `src/pages/` — rutas
- `src/components/` — UI (player, galería, PDF)
- `public/media/` — audio, imágenes, PDFs

## Deploy

Push a `main` dispara el build y publica en **GitHub Pages**. El dominio `aracelibonfigli.com.ar` se mantiene vía `public/CNAME`.
