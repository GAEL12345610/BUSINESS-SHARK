# Prototipo de Brai

**Estado al 31 oct 2026 (noche):** se unieron las dos sesiones del día (DECISIONES #35).
- **La app** (lo que se ve) es la de la sesión de la tarde: corre con datos de ejemplo de `app/src/data/demo.ts`, sin Supabase.
- **El backend** (la base de datos) es el de migraciones, con 21 pruebas. Está escrito y probado, pero **todavía no está conectado a la app**.

Cómo correr la app, sus rutas y el código de dueño de ejemplo: `app/README.md`.

## Qué hay y qué falta

| Pieza | Ruta o archivo | Estado |
|---|---|---|
| Landing | `/` | Hecha. Se prerenderiza: ~800 palabras legibles sin JavaScript. |
| Página de la obra | `/o/:codigo` | Hecha, con datos de ejemplo. Tema del artista, ficha, visor, fotos huella, historia, línea de dueños, sello Registro Brai. |
| Reclamar | `/o/:codigo/reclamar` | Hecha, con datos de ejemplo. Liga al aviso de privacidad. |
| Página del artista | `/a/:slug` | Hecha (`/a/ejemplo` en lo publicado). |
| Hoja de piezas para imprimir | `/imprimir/:codigo` | Hecha: tarjeta, sello y QR en tamaño real. |
| Aviso de privacidad | `/privacidad` (`app/public/privacidad.html`) | Hecho. **Falta que lo lea un adulto** y poner el correo real del equipo. |
| Base de datos | `app/supabase/migrations/` | Hecha y probada en un Postgres que imita a Supabase. Falta crear el proyecto real. |
| Verificar sello 424 DNA | `app/supabase/functions/sello/` | Hecha, probada con el vector oficial de NXP. Falta un chip físico y la pantalla en la app. |
| Panel del artista | `/panel` | Hecho **de ejemplo**: quién tiene cada obra (con correo), avisar a coleccionistas, registrar obra con foto. Falta conectarlo a Supabase con login real. |
| Recorrido para artistas | `/recorrido?para=Nombre` | Hecho: 5 pasos y calculadora de Oferta A y B. Guion de uso: `docs/REUNION_JOSE_LUIS.md`. |
| Kit de marca vivo | `/marca` | Hecho, con la mascota Punto. |

Después del 26 nov: transferir desde el dueño, club de coleccionistas, aviso por correo al artista.

## Stack (no se discute)
- **React 19 + Vite + Tailwind 4 + react-router**, gestor **pnpm**. Web móvil, no App Store.
- **Supabase**: base de datos, login con enlace al correo, fotos.
- **Vercel**: publica la web. Dominio `brai.art`.
- Fuentes autohospedadas (`@fontsource`), nada de Google Fonts.
- Todo vive en `C:\dev\brai\app`, **fuera de OneDrive**.

## Demo de José Luis Malo (DECISIONES #42)
`braiart.vercel.app/jose-luis`: sus obras públicas con fuente, sin dueños ni fotos inventadas. Detalle en `docs/DEMO_JOSE_LUIS.md`.

## Pruebas
```bash
pnpm test
```
Verificación del 424 DNA con el vector oficial de NXP (5 pruebas).

```bash
pnpm test:db
```
Levanta un Postgres desechable, corre las migraciones y 21 pruebas: anon no lee ninguna tabla, el límite de 5 intentos frena, el correo nunca sale en público, la historia no se borra ni por el admin, el sello 424 detecta enlaces repetidos y la cadena de huellas delata una edición a escondidas. Necesita Postgres 16 (en Windows, dentro de WSL).

## Publicar en Vercel (modo ejemplo)
1. New Project, importar el repo, **Root Directory: `app`**, preset **Vite**.
2. **Sin variables de entorno.**
3. `app/vercel.json` ya manda las rutas de obras a `app.html`, sirve `/privacidad` y pone cabeceras de seguridad.
4. Abrir `/o/7KQ2X` en el link publicado, en un iPhone y en un Android. Si da 404, no está listo.

## Conectar Supabase (con un adulto, después de publicar)
1. Crear el proyecto en Supabase.
2. SQL Editor: correr **en orden** los 5 archivos de `app/supabase/migrations/`. No correr `seed.sql` en producción.
3. Authentication, Email activado. Site URL `https://brai.art`.
4. Crear la cuenta de cada artista (Authentication, Users, Add user) y ligarla:
   ```sql
   insert into public.artistas (slug, nombre, ciudad, user_id, tema)
   values ('jose-luis-malo', 'José Luis Malo', '?', (select id from auth.users where email = 'CORREO_DEL_ARTISTA'), '{"acento": "#2F5D62"}');
   ```
5. URL y anon key en `app/.env.local` y en Vercel. **Nunca la service_role.**
6. **Lo que falta programar para conectar:** la app lee `src/data/demo.ts`. Hay que cambiarla para que llame a `obra_publica`, `artista_publico`, `registrar_escaneo` y `reclamar_obra`. Ojo con dos diferencias: el backend guarda el color del artista en `tema.acento` (no en `acento`), y `reclamar_obra` pide **nombre** además de código y correo.
7. Probar que anon no ve nada: `curl "$URL/rest/v1/duenos?select=email" -H "apikey: $ANON"` debe dar error `42501`.
8. Correr el agente **app-security-auditor**.

### Sello 424 DNA (cuando lleguen los chips)
1. Generar dos llaves aleatorias de 32 caracteres hex ("meta" y "maestra"). Guardarlas en un gestor de contraseñas del equipo.
2. Supabase, Edge Functions: publicar `app/supabase/functions/sello` con los secretos `SELLO_LLAVE_META`, `SELLO_LLAVE_MAESTRA` y `ORIGENES=https://brai.art`.
3. Grabar el chip con **NXP TagXplorer** o **TagWriter** con SUN activado, URL `https://brai.art/o/XXXXX?e={PICCData}&c={CMAC}`, la llave de **SDMMetaRead** = llave meta y la de **SDMFileRead** = llave del chip. La llave del chip se saca con `node app/scripts/llave-chip.ts LLAVE_MAESTRA UID` en tu compu. Nunca pegues la maestra en un chat ni en un commit. **Se hace una vez con calma, probando en 1 chip.**
4. Ligar el chip a la obra: `insert into public.sellos (uid, obra_id) values ('UID_DEL_CHIP', 'ID_DE_LA_OBRA');`

## Modelo de datos

| Tabla | Qué guarda | Quién la lee |
|---|---|---|
| `artistas` | nombre, slug, bio, tema (color), dominio, `es_demo`, usuario | el artista (lo suyo) |
| `obras` | registro `BRAI-0007`, código corto `7KQ2X`, ficha, historia, fotos, fotos huella, tipo de sello | el artista (lo suyo) |
| `duenos` | nombre y correo | el artista, solo de sus obras |
| `codigos_dueno` | hash bcrypt del código, usado, anulado | nadie (solo funciones) |
| `intentos_reclamo` | intentos, para el límite de 5 por hora | nadie |
| `eventos_obra` | registro, reclamo, transferencia, nota, con **cadena de huellas** sha256. Solo se agregan. | el artista (lo suyo) |
| `escaneos` | toques por obra y por vía (nfc, qr, link) | el artista (lo suyo) |
| `sellos` | UID del 424 DNA y último contador | nadie (solo la función `sello`) |

Lo público sale por funciones que **solo devuelven lo público**: `obra_publica` (incluye `cadena_intacta`), `artista_publico`, `registrar_escaneo`, `reclamar_obra`.

## Antes de la Expo (16 feb)
- **Supabase Free se pausa tras 7 días sin uso.** Abrir la app el día anterior o pasar a Pro.
- Probar cada sello con un iPhone, un Android con NFC y un Android sin NFC (por QR).
- Llevar internet propio (datos del celular): el wifi de un evento falla.

## Wireframes
En `docs/wireframes/` (drafts del equipo y qué cambió).
