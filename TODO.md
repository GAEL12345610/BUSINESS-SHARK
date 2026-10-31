# TODO de Brai

**Responsable del repositorio desde el 1 nov 2026: Ricardo.**
Actualizado: 31 oct 2026. Lo hecho se marca con `[x]` y se deja; lo que deja de importar se tacha con `~~así~~` y se dice por qué.

Cómo leer esto: **Para quién** dice si lo hace Ricardo, el equipo o un adulto. **Dónde** dice qué archivo tocar o leer.

---

## 1. Antes de la reunión con José Luis (urgente)

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Crear un correo normal del proyecto (Gmail, por ejemplo). **Nunca el correo personal de un integrante.** | Equipo con un adulto | |
| [ ] | Cambiar `hola@brai.art` por ese correo en la landing y en el aviso de privacidad | Ricardo | `app/src/pages/Landing.tsx` (`CORREO_EQUIPO`) y `app/public/privacidad.html` |
| [ ] | Que un adulto lea el aviso de privacidad antes de que alguien real deje su correo | Adulto | `app/public/privacidad.html` |
| [ ] | Agendar la reunión con José Luis, con un adulto presente | Adulto y equipo | `docs/REUNION_JOSE_LUIS.md` |
| [ ] | Probar el link del recorrido en un iPhone y un Android | Ricardo | `/recorrido?para=José%20Luis%20Malo` |
| [ ] | Imprimir las piezas de ejemplo y pegarlas en un cartón | Equipo | `/imprimir/7KQ2X` |

## 2. Antes del 26 de noviembre (propuesta final)

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Entrevistar a José Luis + 2 artistas más + 5 compradores | Equipo con adulto | `docs/ENTREVISTAS.md`, `docs/CLIENTES.md` |
| [ ] | Decidir Oferta A o B con lo que digan los artistas | Equipo | `docs/OFERTA.md`, `docs/DECISIONES.md` #26 |
| [ ] | Hacer el deck del 26 nov | Equipo | skill `brai-slides`; las imágenes ya están en `visuales/` |
| [ ] | Grabar el infomercial (obligatorio para pasar) y confirmar la fecha con el profe | Equipo | `pitch/infomercial_guion.md`, `pitch/clips/` |
| [ ] | Comprar `brai.art` **antes de bloquear cualquier sello** | Adulto | ~49 MXN el primer año, `docs/COSTOS.md` |
| [ ] | Llenar los `?` de costos con capturas de MercadoLibre (etiquetas VOID, tarjetas) | Equipo | `docs/COSTOS.md` |
| [ ] | Revisar con NFC Tools de qué tipo son los 50 stickers que ya tenemos | Equipo | `docs/SEGURIDAD_OBRA.md` |
| [ ] | Cotizar el envío de 50 NTAG 424 DNA | Equipo | `docs/COSTOS.md`, decisión #27 |
| [ ] | Definir roles con nombres | Equipo | `docs/CONCURSO.md` |

## 3. Técnico (Ricardo), en este orden

| | Tarea | Dónde |
|---|---|---|
| [ ] | Crear el proyecto en Supabase y correr las 5 migraciones (con un adulto) | `docs/PROTOTIPO.md`, sección "Conectar Supabase" |
| [ ] | Cambiar la app para que lea de Supabase en lugar de `src/data/demo.ts`. Ojo: el color va en `tema.acento` y `reclamar_obra` pide nombre | `app/src/data/demo.ts`, `docs/PROTOTIPO.md` |
| [ ] | Conectar el panel a Supabase (login con enlace al correo, registrar obra con fotos reales). Hay una versión vieja en el historial: commit `2676021`, `app/src/app/paginas/Panel.tsx` | `app/src/pages/Panel.tsx` |
| [ ] | Correr el agente `app-security-auditor` antes de guardar datos reales | `.claude/agents/` |
| [ ] | Pantalla de "sello original" para el 424 DNA en la página de la obra (el backend ya está) | `app/supabase/functions/sello/` |
| [ ] | Transferir una obra desde el dueño, no solo desde el artista | `docs/SEGURIDAD_OBRA.md`, paso 5 |
| [ ] | Aviso por correo al artista cuando su obra cambia de dueño | |

## 4. Deuda conocida (no es urgente, pero que no se olvide)
- La demo usa el mismo código de dueño (`4K7P-9QX2`) para todas las obras y cuenta los intentos en memoria. Es a propósito para la demo; la versión real ya está en Supabase.
- No hay `Content-Security-Policy` en `app/vercel.json` porque `app/index.html` tiene un script en línea. Para ponerla, mover ese script a un archivo.
- El video del artista en la página de la obra es una portada sin video.
- La huella de la demo usa FNV (rápida, para enseñar); la de Supabase usa SHA-256.

## Cómo trabajar en el repo (Ricardo, léelo una vez)
1. Al empezar: `git fetch --all` y `git branch -a`. **Si hay ramas `claude/*` sin unir, revisarlas antes de construir** (`memoria/una-sesion-a-la-vez.md`).
2. Todo cambio en una rama y luego Pull Request a `main`. **Lo que llega a `main` se publica solo en Vercel.**
3. Antes de unir: `pnpm build`, `pnpm test` y, si tocaste la base, `pnpm test:db`. Luego abre la página en el celular: compilar no es verificar.
4. `CLAUDE.md` le explica a Claude cómo trabajar. `docs/DECISIONES.md` dice por qué está todo como está.
5. Cada error nuevo, una nota en `memoria/`.

## Hecho el 31 oct 2026
- [x] Landing, página de la obra, reclamar, página del artista, imprimir piezas.
- [x] Panel del artista de ejemplo y recorrido de 5 pasos con calculadora de precios.
- [x] Mascota Punto y kit de marca vivo en `/marca`.
- [x] Imagen para compartir (`og.png`) y clip vertical de la escena del sello.
- [x] Todos los visuales en PNG, PDF, PPTX y GIF en `visuales/` (para la Chromebook). Se regeneran con `visuales/generar.cjs` y `visuales/deck.cjs`.
- [x] Backend en migraciones con 21 pruebas, verificación del 424 DNA y cadena de huellas.
- [x] Competencia, costos cotizados, Oferta B en prueba.
