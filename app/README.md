# App de Brai

Landing (`/`), página de la obra (`/o/:codigo`), reclamar (`/o/:codigo/reclamar`). React + Vite + Tailwind, con **pnpm**.

## Correrla en tu compu

```
cd C:\dev\brai\app
pnpm install
pnpm dev
```

Abre `http://localhost:5173`. Para verla en tu celular (misma red wifi), abre la dirección "Network" que imprime la terminal, por ejemplo `http://192.168.1.20:5173/o/7KQ2X`.

Rutas de la demo:

| Ruta | Qué es |
|---|---|
| `/` | Landing |
| `/o/7KQ2X` | Obra de ejemplo sin reclamar. Código de dueño: `4K7P-9QX2` |
| `/o/M3RT8` | Una obra que ya tiene dueño |
| `/a/ejemplo` | Página del artista (`/a/jose-luis-malo` con el candado abierto, ver abajo) |
| `/imprimir/7KQ2X` | Tarjeta, sello y QR en tamaño real para imprimir |
| `/panel` | Panel del artista de ejemplo: quién tiene cada obra, avisar a coleccionistas, registrar obra |
| `/jose-luis` | Demo para José Luis Malo: sus obras reales con fuente (`docs/DEMO_JOSE_LUIS.md`). Salir: `/?salir-demo`. El modo vive en `localStorage` |
| `/recorrido?para=Nombre` | Recorrido de 5 pasos con calculadora de Oferta A y B. El nombre vive solo en esa pestaña |
| `/marca` | Kit de marca vivo y la mascota Punto |

Los reclamos y las obras registradas en la demo se borran al cerrar la pestaña.

Imagen para compartir: `node scripts/og/generar.cjs` regenera `public/og.png` y `public/apple-touch-icon.png`.

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

## Base de datos (Supabase)

Vive en `supabase/migrations/` (5 archivos, se corren en orden). Todavía **no** está conectada a la app: la app lee `src/data/demo.ts`. Pasos para conectarla en `docs/PROTOTIPO.md`.

Probarla sin Supabase, en un Postgres 16 desechable:
```
pnpm test:db
```
21 pruebas: nadie sin sesión lee tablas, un artista no toca obras ajenas, reclamar sirve una sola vez con máximo 5 intentos por hora, el correo nunca sale en público, el sello 424 DNA detecta enlaces repetidos y la cadena de huellas delata una edición a escondidas. Tiene que terminar en `TODAS LAS PRUEBAS PASARON`.

`pnpm test` prueba la verificación del 424 DNA con el vector oficial de NXP.

## Demo de José Luis Malo

`/jose-luis` activa su modo (sus obras públicas con fuente). También se activa solo al abrir una de sus obras, por ejemplo al escanear el QR impreso. `/?salir-demo` regresa a la artista de ejemplo. Reglas y fuentes: `docs/DEMO_JOSE_LUIS.md`. Los marcos "foto pendiente" se regeneran con `node scripts/marcos-jose-luis.mjs`.

## Publicar en Vercel

1. En Vercel: New Project, importar el repo, **Root Directory: `app`**, preset **Vite**. Vercel detecta pnpm por `packageManager`.
2. **Sin variables de entorno.**
3. `vercel.json` ya manda las rutas de obras a `app.html` (`memoria/vercel-spa-rewrites.md`) y sirve `/privacidad`.
4. Abrir `/o/7KQ2X` en el link publicado, en un iPhone y en un Android. Si da 404, no está listo.
5. Antes de conectar Supabase: correr el agente `app-security-auditor`.
