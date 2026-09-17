# DECISIONS.md

Log de sesiones de trabajo. Entrada corta al cerrar cada sesión no trivial — no reemplaza al historial de git, complementa el "por qué" que el diff no cuenta.

Al arrancar una sesión en Cursor, el agente debe leer `AGENTS.md`, `CODE_QUALITY.md` y este archivo para recuperar contexto.

---

## Formato de cada entrada

```markdown
## YYYY-MM-DD HH:MM:ss — <título corto del cambio>
- Qué: <qué se hizo, una línea>
- Por qué: <la decisión de diseño o el problema que resolvía>
- Descartado: <si evaluaste otra alternativa y la descartaste, cuál y por qué>
- Pendiente: <qué queda para la próxima sesión, si algo>
```

---

<!-- Nuevas entradas abajo de esta línea -->

## 2026-09-17 18:30:00 — Adaptar AGENTS / CODE_QUALITY / DECISIONS al sitio Astro

- Qué: creados `AGENTS.md`, `CODE_QUALITY.md` y `DECISIONS.md` en la raíz, con stack Astro/content collections y sin entradas del sandbox Python.
- Por qué: dar al agente contexto persistente de arquitectura, calidad y decisiones propias de aracelibonfigli.com.ar.
- Descartado: copiar tal cual el template Aider/Python (tests obligatorios, `.aider.conf.yml`) — este repo es estático Astro sin suite ni Aider.
- Pendiente: —

## 2026-09-17 18:45:00 — UX home/player/galería + producciones Para_Nico

- Qué: brand del header pasa a “Inicio” solo en home; player “Escucha”/“Reproduciendo”; spinner de carga en lightbox; 9 producciones nuevas del brief (con Spotify/YouTube cuando hubo ID verificable).
- Por qué: evitar duplicar el nombre en home; reflejar estado real del audio; no dejar la foto anterior colgada al cambiar de slide; actualizar Estudio con releases 2025–2026.
- Descartado: brand poético tipo “Piedra Lunar” (menos claro como link a home); esperar load para actualizar el contador de galería (el índice debe responder al click).
- Pendiente: Spotify IDs de “Cruzar el Puente” (Pía Lara) y, si aparece, embed Spotify de “El Bosque Púrpura” (hoy YouTube).
