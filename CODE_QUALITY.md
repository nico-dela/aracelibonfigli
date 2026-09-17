# CODE_QUALITY.md

Referencia de estándares del proyecto. El agente la consulta antes de generar código (ver AGENTS.md §1); vos la mantenés y ajustás con el tiempo.

## Naming

- Nombres descriptivos, sin abreviaturas crípticas (`userRepository`, no `usrRepo`).
- Funciones: verbo + sustantivo (`calculateTotal`, no `total2`).
- Booleanos con prefijo `is`/`has`/`can` (`isValid`, `hasPermission`).

## Estructura de funciones

- Una función, una responsabilidad.
- Máximo ~30 líneas como guía blanda; si la supera, evaluar extracción.
- Early returns en vez de anidar condicionales.
- Evitar parámetros booleanos que cambien el comportamiento de la función (preferir dos funciones separadas).

## Manejo de errores

- No silenciar excepciones sin loggear o re-lanzar (salvo catches intencionales documentados, p. ej. prefetch de cache que puede fallar por CORS).
- Errores esperables (validación, input de usuario) se manejan explícitamente; errores inesperados se propagan.
- Mensajes de error accionables: qué pasó, no solo "error".

## Comentarios

- El código explica el "qué"; el comentario explica el "por qué" cuando no es obvio.
- Nada de comentarios que repitan literalmente lo que dice la línea de abajo.
- Sin bloques grandes de código comentado — se borra, para eso está git.

## Tests

- Hoy no hay framework de tests. Cuando se agregue, preferir Vitest sobre utils puras en `src/utils/`.
- Un test por comportamiento, no por línea de código.
- Nombres de test que describen el escenario: `should_reject_when_input_is_negative`, no `test1`.
- Mocks solo en los bordes (I/O, red, tiempo) — no mockear la lógica que estás probando.

## Dependencias

- Antes de agregar una librería nueva: ¿esto ya lo resuelve algo que ya está instalado?
- Preferir librerías mantenidas activamente sobre alternativas más "livianas" pero abandonadas.
- Astro ya cubre el sitio estático; no agregar un framework UI sin necesidad clara.

## Git / commits

- Un commit, un cambio lógico.
- Mensaje en imperativo: "agrega validación de email", no "agregado" ni "agregando".

## Notas del proyecto

- Contenido editorial (títulos, créditos, años, embeds) vive en `src/content/**/*.md`; no hardcodear eso en páginas.
- El schema Zod en `src/content.config.ts` es la fuente de verdad de campos de cada colección.
- UI en español; labels de nav/player coherentes con el resto del sitio.
- En listados de Estudio, `order` define el orden visual; `year`/`month` alimentan “recent works” en home (`src/utils/recent-works.ts`).
- Preferir embeds Spotify (`spotifyType` + `spotifyId`) o YouTube (`youtubeId`); no inventar assets de tapa locales salvo pedido explícito.
- Scripts cliente: un solo init por página con guard (`dataset.*Init`), sin frameworks.
- Rutas con `trailingSlash: 'always'` (`/musica/`, no `/musica`).
