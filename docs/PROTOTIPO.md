# Prototipo de Brai

**Estado al 31 oct 2026:** el prototipo ya existe en `app/` y corre completo en **modo ejemplo** (sin Supabase). Falta conectarlo a un proyecto real de Supabase y publicarlo en Vercel (pasos abajo).

## Alcance hasta el 26 de noviembre

| Pantalla | Ruta | Estado |
|---|---|---|
| Landing | `/` (`app/index.html`) | Hecha. HTML crudo, 730 palabras legibles sin JavaScript. |
| Página de la obra | `/o/:codigo` | Hecha. Cédula, ficha, capas de confianza, fotos huella, línea de tiempo, contador de toques. |
| Reclamar | `/o/:codigo/reclamar` | Hecha. Código de un solo uso, 5 intentos por hora, solo iniciales en público. |
| Página del artista | `/a/:slug` | Hecha. Subdominio `artista.brai.art`: pendiente (necesita el dominio). |
| Panel del artista | `/panel` | Hecho. Entrar con enlace al correo, lista de obras con dueño, registrar obra con fotos, tarjeta imprimible con QR. |
| Aviso de privacidad | `/privacidad` | Hecho. **Pendiente que lo lea un adulto** antes de usar datos reales. |
| Verificar sello 424 DNA | función `sello` | Hecha y probada con el vector oficial de NXP. Falta probar con un chip físico. |

Después del 26 nov: transferir desde el dueño (hoy lo hace el artista generando código nuevo), club de coleccionistas, aviso por correo al artista.

## Stack (no se discute)
- **React 19 + Vite + Tailwind 4**, gestor **pnpm**. Web móvil, no App Store.
- **Supabase**: base de datos, login con enlace al correo, fotos.
- **Vercel**: publica la web. Dominio `brai.art`.
- Todo vive en `C:\dev\brai\app`, **fuera de OneDrive**.

## Cómo correrlo en tu compu (modo ejemplo, 3 minutos)
```bash
cd C:\dev\brai\app
pnpm install
pnpm dev
```
Abre `http://localhost:5173`. Sin `.env.local` todo corre con datos de ejemplo guardados en tu navegador.

**Códigos de ejemplo** (solo para la demo, nunca en obras reales):
| Obra | URL | Código de dueño |
|---|---|---|
| Tarde en Tlaquepaque | `/o/7KQ2X` | `HFKW-3P9Q` |
| Barro de Tonalá (424 DNA) | `/o/M4RTZ` | `TQ7N-K2DV` |
| Lluvia sobre Chapultepec | `/o/R9WCH` | ya tiene dueño |

**Simular un toque al sello seguro:** `/o/M4RTZ?e=EF963FF7828658A599F3041510671E88&c=94EED9EE65337086` dice "Sello original". Si recargas ese mismo enlace, dice "Este enlace ya se usó". El botón **Reiniciar** de la barra negra deja todo como al principio.

## Pruebas
```bash
pnpm test
```
Prueba los códigos y la verificación del 424 DNA (9 pruebas).

```bash
pnpm test:db
```
Levanta un Postgres desechable, corre las migraciones y 20 pruebas de seguridad (anon no lee nada, el límite de intentos frena, el correo nunca sale en público, la historia no se borra ni por el admin). Necesita Postgres 16 (en Windows, dentro de WSL).

## Cómo conectarlo a Supabase real (hacerlo con un adulto)
1. Crear proyecto en Supabase (región `us-east-1` o la más cercana).
2. SQL Editor: pegar y correr, **en orden**, los 4 archivos de `app/supabase/migrations/`. No correr `seed.sql` en producción.
3. Authentication, Providers, Email: activado. URL Configuration: Site URL `https://brai.art`, Redirect URLs `https://brai.art/panel` y `http://localhost:5173/panel`.
4. Crear la cuenta de cada artista: Authentication, Users, Add user, con su correo. Luego, en SQL Editor:
   ```sql
   insert into public.artistas (slug, nombre, ciudad, user_id)
   values ('jose-luis-malo', 'José Luis Malo', '?', (select id from auth.users where email = 'CORREO_DEL_ARTISTA'));
   ```
5. Copiar URL y anon key a `app/.env.local` (ver `app/.env.example`). **Nunca la service_role.**
6. **Probar que anon no ve nada** (memoria `rls-es-la-unica-puerta.md`): `curl "$URL/rest/v1/duenos?select=email" -H "apikey: $ANON"` debe responder error `42501`.
7. Correr el agente **app-security-auditor** antes de publicar.

**Lo que no se pudo probar en esta sesión:** las migraciones se probaron en un Postgres 16 que imita a Supabase, no en Supabase real. La primera vez que se corran allá, revisar que no truene nada y repetir el paso 6.

### Sello 424 DNA (cuando lleguen los chips)
1. Generar dos llaves aleatorias de 32 caracteres hex (una "meta" y una "maestra"). Guardarlas en un gestor de contraseñas del equipo.
2. Supabase, Edge Functions: publicar `app/supabase/functions/sello` y poner los secretos `SELLO_LLAVE_META`, `SELLO_LLAVE_MAESTRA` y `ORIGENES=https://brai.art`.
3. Grabar el chip con la app **NXP TagXplorer** o **NFC TagInfo/TagWriter** con SUN activado, URL `https://brai.art/o/XXXXX?e={PICCData}&c={CMAC}`, la llave de **SDMMetaRead** = llave meta y la de **SDMFileRead** = llave del chip. La llave del chip se saca con `node app/scripts/llave-chip.ts LLAVE_MAESTRA UID` (corre en tu compu, nunca pegues la maestra en un chat ni en un commit). **Pedir ayuda: esto se hace una vez con calma, probando en 1 chip.**
4. Ligar el chip a la obra: `insert into public.sellos (uid, obra_id) values ('UID_DEL_CHIP', 'ID_DE_LA_OBRA');`

## Publicar en Vercel
1. Importar el repo, **Root Directory: `app`**. Framework: Vite. Install: `pnpm install`. Build: `pnpm build`.
2. Variables: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. Nada más con `VITE_`.
3. `app/vercel.json` ya trae los rewrites de `/o`, `/a` y `/panel` (memoria `vercel-spa-rewrites.md`) y las cabeceras de seguridad.
4. Después de publicar: bajar el JS y confirmar que la llave dice `"role":"anon"` (memoria `service-role-nunca-en-vite.md`).

## Modelo de datos

| Tabla | Qué guarda | Quién la lee |
|---|---|---|
| `artistas` | nombre, slug, bio, tema, dominio, `es_demo`, usuario | el artista (lo suyo) |
| `obras` | registro `BRAI-0007`, código corto `7KQ2X`, ficha, historia, fotos, fotos huella, tipo de sello | el artista (lo suyo) |
| `duenos` | nombre y correo | el artista, solo de sus obras |
| `codigos_dueno` | hash bcrypt del código, usado, anulado | nadie (solo funciones) |
| `intentos_reclamo` | intentos fallidos, para el límite | nadie |
| `eventos_obra` | registro, reclamo, transferencia, nota. **Solo se agregan.** | el artista (lo suyo) |
| `escaneos` | toques por obra y por vía (nfc, qr, link) | el artista (lo suyo) |
| `sellos` | UID del 424 DNA y último contador | nadie (solo la función `sello`) |

Lo público sale por funciones que **solo devuelven lo público**: `obra_publica`, `artista_publico`, `registrar_escaneo`, `reclamar_obra`.

## Antes de la Expo (16 feb)
- **Supabase Free se pausa tras 7 días sin uso.** Abrir la app el día anterior o pasar a Pro. Plan B: el modo ejemplo corre sin internet si la página ya está cargada.
- Probar cada sello con un iPhone, un Android con NFC y un Android sin NFC (por QR).
- Llevar internet propio (datos del celular): el wifi de un evento falla.

## Wireframes
En `docs/wireframes/`. Las capturas de las pantallas reales salen corriendo la app.
