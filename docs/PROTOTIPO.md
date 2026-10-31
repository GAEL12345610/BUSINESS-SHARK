# Prototipo de Brai

## Alcance hasta el 26 de noviembre (nada más)
1. **Página de la obra** (`/o/:codigo`): cédula de museo, fotos, fotos huella, historia, línea de tiempo, botón Reclamar.
2. **Reclamar:** código + correo → la obra queda a tu nombre.
3. **Página del artista** (`artista.brai.art` o `/a/:artista`): sus obras, con su marca y el sello "Registro Brai".
4. **Panel del artista** (con login): registrar obra, ver dueños, imprimir tarjetas.

Transferir, club de coleccionistas y NTAG 424 DNA: **después del 26 nov.** Si una feature no cabe en Innovación o Viabilidad, no se construye todavía.

## Stack (no se discute)
- **React + Vite + Tailwind**, gestor **pnpm**. Web móvil, no App Store.
- **Supabase**: base de datos, login y fotos.
- **Vercel**: publica la web. Dominio `brai.art`.
- Todo vive en `C:\dev\brai\app`, **fuera de OneDrive**.

## White label: una plataforma, muchas caras
Mismo código para todos. Cada artista tiene en la base de datos su `tema` (colores, logo, tipografía dentro de la marca) y su dominio. Abajo de cada página va el sello chico **"Registro Brai"**: es lo que da la autoridad.

## Modelo de datos (versión simple)

| Tabla | Qué guarda |
|---|---|
| `artistas` | nombre, slug, bio, tema, dominio, usuario dueño |
| `obras` | artista, registro (`BRAI-0007`), código corto de URL, título, técnica, medidas, año, historia, fotos, fotos huella |
| `codigos_dueno` | obra, código **cifrado** (hash), usado o no, intentos fallidos |
| `eventos_obra` | obra, tipo (registro, reclamo, transferencia), dueño, fecha. **Solo se agregan, nunca se editan ni borran.** |
| `escaneos` | obra, fecha. Sirve para el caso documentado: "la obra se tocó 37 veces". |

**Reclamar** se hace con UNA función en la base de datos que, en un solo paso: revisa el código cifrado, revisa que no esté usado, cuenta intentos (máximo 5 por hora por obra), marca el código como usado y crea el evento. Así dos personas no pueden reclamar la misma obra a la vez.

## Cómo arrancar (paso a paso, sin ser programadores)
1. Crear cuentas: **Supabase** y **Vercel** (entrar con GitHub).
2. En una terminal: `cd C:\dev\brai` y `pnpm create vite@latest app` (React + TypeScript).
3. Abrir `C:\dev\brai` en VS Code con Claude Code. Claude lee `CLAUDE.md` y las skills solo.
4. Pedirle a Claude: "arma la página de la obra con la skill ui-frontend-brai".
5. Las llaves de Supabase van en `app/.env.local` (ver `.env.example`). **Nunca en el código ni en el chat.**
6. Antes de publicar: correr el agente **app-security-auditor**.

## Antes de la Expo (16 feb)
- **Supabase Free se pausa tras 7 días sin uso.** Si se pausa, TODOS los chips muestran error frente al jurado. Abrir la app el día anterior o pasar a Pro.
- Probar cada sello con un iPhone, un Android con NFC y un Android sin NFC (por QR).
- Llevar internet propio (datos del celular): el wifi de un evento falla.

## Estado (31 oct 2026)
Hecho en `app/` con datos de ejemplo (sin Supabase todavía):
- Landing `/` prerenderizada, con teléfono 3D que corre la página real de una obra.
- Página de la obra `/o/:codigo` con tema del artista, ficha, fotos huella, video (portada), historia, línea de dueños, catálogo y sello Registro Brai.
- Reclamar `/o/:codigo/reclamar`: código + correo, máximo 5 intentos, momento dorado.

Falta: Supabase (tablas, vista pública, función de reclamar), página del artista, panel del artista. Cómo correrla: `app/README.md`.

## Wireframes
En `docs/wireframes/` (drafts del equipo y qué cambió).
