# App de Brai

Landing (`/`), página de la obra (`/o/:codigo`), reclamar (`/o/:codigo/reclamar`). React + Vite + Tailwind, con **pnpm**.

## Correrla en tu compu

```
cd C:\dev\brai\app
pnpm install
pnpm dev
```

Abre `http://localhost:5173`. Para verla en tu celular (misma red wifi), abre la dirección "Network" que imprime la terminal, por ejemplo `http://192.168.1.20:5173/o/7KQ2X`.

Obras de la demo: `/o/7KQ2X` (Los olvidados, sin reclamar), `/o/M3RT8` (ya tiene dueño), `/o/P9WD4`, `/o/H2ZC6`. Código de dueño: `4K7P-9QX2`. Los reclamos se borran al cerrar la pestaña.

## Probar la versión de producción

```
pnpm build
pnpm preview
```

El build prerenderiza la landing en `dist/index.html` (para que Google y los modelos de IA la lean sin JavaScript) y deja `dist/app.html` vacío para las rutas de obras.

## Dónde vive cada cosa

| Qué | Archivo |
|---|---|
| Datos de ejemplo (artista, obras, código) | `src/data/demo.ts` |
| Color del artista y su contraste | `src/lib/tema.ts` |
| Tokens de marca (colores, fuentes) | `src/index.css`, salen de `brand/kit.html` |
| Teléfono 3D, tarjetas 3D, barra de progreso | `src/components/movimiento.tsx` |
| Logo, sello NFC, tarjeta de dueño, sello Registro Brai | `src/components/marca.tsx` |
| Pinturas de ejemplo | `scripts/pinturas.mjs` genera `public/obras/*.svg` |

## Publicar en Vercel (todavía NO)

**Candado:** la demo usa el nombre de José Luis Malo. No se publica hasta que firme el permiso de fundador (`docs/DECISIONES.md` #24). Antes de eso, cambiar `ARTISTA` en `src/data/demo.ts` o esperar la firma.

Cuando toque:
1. En Vercel: New Project, importar el repo, **Root Directory: `app`**. Vercel detecta pnpm por `packageManager`.
2. `vercel.json` ya manda las rutas de obras a `app.html` (`memoria/vercel-spa-rewrites.md`).
3. Abrir `/o/7KQ2X` en el link publicado, en un iPhone y en un Android. Si da 404, no está listo.
4. Antes de conectar Supabase: correr el agente `app-security-auditor`.
