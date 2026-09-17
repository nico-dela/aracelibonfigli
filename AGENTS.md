# AGENTS.md

## Project Context

- Stack: Astro 7 (static site), TypeScript, content collections + Zod (`src/content.config.ts`), scoped CSS in `.astro` components + `src/styles/global.css`, vanilla client scripts in `src/scripts/`. Media in `public/media/`; remote images via Cloudinary, Spotify oEmbed, YouTube. Deploy: GitHub Pages (`.github/workflows/deploy.yml`).
- Test command: — (no test suite yet)
- Lint command: — (no linter configured yet)
- Build command: `npm run build` (dev: `npm run dev`, preview: `npm run preview`)
- Estructura de carpetas relevante:
  - `src/pages/` — rutas Astro
  - `src/components/`, `src/layouts/` — UI y layout base
  - `src/content/{albums,books,videos,productions,gallery,pages,settings}/` — markdown con frontmatter
  - `src/scripts/` — init client-side (music player, gallery, PDF viewer)
  - `src/utils/` — helpers de build (`spotify.ts`, `cloudinary.ts`, `recent-works.ts`)
  - `public/media/` — audio, PDF, imágenes locales
- Convenciones de naming del proyecto:
  - Content/slugs: kebab-case (`el-bosque-purpura.md`)
  - Componentes Astro: PascalCase (`MusicPlayer.astro`)
  - Funciones/variables TS: camelCase
  - Hooks DOM para scripts: atributos `data-*` (`data-music-player`, `data-gallery-image`)

---

## 1. Antes de generar código

- Revisá si CODE_QUALITY.md tiene una regla aplicable a lo que estás por hacer. Si la hay, decilo explícitamente antes de escribir código.
- Revisá DECISIONS.md si existe: puede haber contexto de por qué algo está hecho de determinada forma.

## 2. Al generar una función nueva

- Hoy no hay runner de tests. No inventes una suite completa sin pedido.
- Si tocás lógica pura en `src/utils/` (o algo fácilmente testeable), preferí dejar pendiente en DECISIONS.md o agregar tests cuando exista el tooling.
- No agregues aserciones triviales solo para subir cobertura.

## 3. Complejidad ciclomática

- Objetivo por función: ≤7. Máximo aceptable: 10.
- Si la superás, refactorizá antes de entregar: extraer funciones con nombre descriptivo → eliminar anidamiento con early returns → polimorfismo/strategy si hay ramas por tipo.

## 4. Seguridad — checklist antes de dar por terminada la tarea

- [ ] Sin credenciales, tokens o keys hardcodeadas
- [ ] Input validado en todos los puntos de entrada (schemas Zod de content, query params, etc.)
- [ ] Sin riesgo de inyección
- [ ] Sin datos sensibles en logs

Si algo es ambiguo, decilo en la respuesta en vez de asumir.

## 5. Arquitectura y dependencias

- Respetá las capas existentes; no cruces boundaries sin avisar.
  - Contenido editorial → `src/content/**`
  - Presentación → `pages` / `components` / `layouts`
  - Comportamiento cliente → `src/scripts/`
  - Helpers de build → `src/utils/`
- No agregues una dependencia nueva sin justificar por qué.
- Buscá antes de escribir: no dupliques lógica existente.

## 6. Calidad general

DEBE: naming descriptivo, seguir el linting del proyecto cuando exista, pasar `npm run build`.
NO DEBE: dejar bloques comentados grandes, TODOs de lógica placeholder, optimizaciones especulativas no pedidas.

## 7. Al cerrar una sesión de trabajo

- Si tocaste algo no trivial, agregá una entrada breve en DECISIONS.md con: qué se hizo, por qué, qué queda pendiente.

## 8. Si no podés explicar tu propio código

Decilo explícitamente en la respuesta en vez de entregarlo como si fuera obvio.
