# Araceli Bonfigli — Propuesta v2 (Astro + Decap CMS)

Sitio editorial generado con **Astro** y contenido editable con **Decap CMS**. Todo el stack es gratis: GitHub Pages + GitHub Actions + Decap (login con GitHub). Solo se paga el dominio.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:4321](http://localhost:4321).

### CMS en local

En una terminal:

```bash
npm run cms
```

En otra: `npm run dev`, y entrá a [http://localhost:4321/admin/](http://localhost:4321/admin/). Con `local_backend: true` no hace falta OAuth.

### CMS en producción

1. Entrá a `/admin/` en el sitio desplegado.
2. Login con una cuenta GitHub que tenga **write** al repo `nico-dela/aracelibonfigli`.
3. La primera vez hace falta un [Netlify OAuth proxy](https://docs.decapcms.org/docs/github-backend/) (gratis) o un GitHub OAuth App apuntando al proxy de Netlify ya configurado en `public/admin/config.yml`.

Cuando merges esta rama a `main`, cambiá `backend.branch` en `public/admin/config.yml` a `main`, y el trigger del workflow en `.github/workflows/deploy.yml`.

## Cómo actualizar contenido (sin tocar HTML)

| Qué querés cambiar | Dónde en el CMS |
| --- | --- |
| Hero, Linktree, destacados | Sitio → Ajustes generales |
| Biografía | Páginas → Biografía |
| Álbum / tracks | Álbumes |
| Poemario / PDF | Libros |
| Video de YouTube | Videos |
| Crédito de estudio | Estudio |
| Set de fotos | Galería |

También podés editar los Markdown en `src/content/`.

## Estructura

- `src/content/` — fuente de verdad del contenido
- `src/pages/` — rutas
- `src/components/` — UI (player, galería, PDF)
- `public/media/` — audio, imágenes, PDFs
- `public/admin/` — Decap CMS

## Deploy

Push a `proposal-v2-cms` dispara el build y publica en GitHub Pages. El dominio `aracelibonfigli.com.ar` se mantiene vía `public/CNAME`.

### Preview en Cloudflare Pages (gratis)

Sí: el plan gratuito de Cloudflare Pages alcanza para mostrar esta propuesta sin tocar el dominio de producción.

1. Subí/pusheá esta rama a GitHub.
2. En [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/) → Create → Pages → Connect to Git.
3. Elegí el repo y la rama `proposal-v2-cms`.
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `22` (o superior)
5. Deploy → te dan una URL `*.pages.dev` para mostrar la propuesta.

El dominio `aracelibonfigli.com.ar` puede seguir apuntando a GitHub Pages con la web actual hasta que decidas migrar.

> Mientras esta propuesta no se mergee a `main`, la web actual en producción no cambia.
