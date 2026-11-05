# TODO de Brai

**Responsable del repositorio desde el 1 nov 2026: Ricardo.**
Actualizado: 31 oct 2026. Lo hecho se marca con `[x]` y se deja; lo que deja de importar se tacha con `~~así~~` y se dice por qué.

Cómo leer esto: **Para quién** dice si lo hace Ricardo, el equipo o un adulto. **Dónde** dice qué archivo tocar o leer.

---

## 0. Revisar el trabajo del 5 nov (rama `claude/demo-honesta-jose-luis`)

Claude dejó la demo diciendo la verdad sobre sí misma y el paquete de la reunión. **Está en una rama local, sin push ni publicar.** Nada de esto llega a `braiart.vercel.app` hasta que alguien lo revise y lo una a `main`.

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Leer las propuestas P1 a P10 y aprobar, cambiar o rechazar cada una | Equipo | `docs/DECISIONES.md`, sección 5 nov |
| [ ] | Decidir con un adulto si `/jose-luis` sigue publicado antes de que él lo vea, o se apaga con `VITE_DEMO_JOSE_LUIS=0` | Equipo con adulto | `docs/DEMO_JOSE_LUIS.md`, propuesta P8 |
| [ ] | Abrir la rama en el celular (`pnpm build && pnpm preview`) y recorrer la demo | Ricardo | `pitch/reunion-jose-luis/checklist-demo.md` |
| [ ] | Si se aprueba: Pull Request a `main` y revisar en un iPhone y un Android de verdad | Ricardo | |
| [ ] | Volver a generar `visuales/` (las capturas de ahí son de antes del 5 nov) | Ricardo | `visuales/README.md` |
| [ ] | Definir el precio de fundador del mes 4 con la Opción B | Equipo | `docs/OFERTA.md` |
| [ ] | Leer `PERSPECTIVAS.md` y `MERCADO.md`: el certificado digital ya es gratis en markmy.art; decidir qué se vende entonces | Equipo | `docs/PERSPECTIVAS.md`, `docs/MERCADO.md` |
| [ ] | Conseguir una obra real de alguien cercano, con permiso por escrito revisado por un adulto, para la demo del 26 nov (`CONCURSO.md` la pide) | Equipo con adulto | `docs/PERSPECTIVAS.md`, sección 3 |
| [ ] | Llenar las láminas 12 y 14 del deck del jurado con entrevistas reales y el equipo | Equipo | `pitch/jurado-26nov/` |

## Calendario propuesto hasta el 26 nov (lo ajusta el equipo)

Lo que más sube la calificación no es código: son las entrevistas y una obra real con permiso (`docs/PERSPECTIVAS.md`).

| Semana | Qué | Listo cuando |
|---|---|---|
| **5 a 11 nov** | Revisar y unir la rama del 5 nov. Un adulto agenda las 8 entrevistas. Conseguir una obra real con permiso por escrito. Definir roles con nombres. Llenar los `?` de `COSTOS.md` | Hay 8 fechas en el calendario y roles en `CONCURSO.md` |
| **12 a 18 nov** | Hacer las entrevistas con las hojas impresas (`visuales/documentos/hojas-de-entrevista.pdf`). Confirmar con el profe la fecha del infomercial y grabarlo | Fichas llenas en `CLIENTES.md`. Video grabado |
| **19 a 25 nov** | Decidir A o B si 2 de 3 coinciden (DECISIONES #26). Llenar las láminas 12 y 14 del deck. Probar la demo en un iPhone y un Android. Ensayar la presentación 2 veces con reloj | Deck final en PDF. Ensayo sin pasarse de tiempo |
| **26 nov** | Propuesta final | |

## 1. Antes de la reunión con José Luis (urgente)

| | Tarea | Para quién | Dónde |
|---|---|---|---|
| [ ] | Crear un correo normal del proyecto (Gmail, por ejemplo). **Nunca el correo personal de un integrante.** | Equipo con un adulto | |
| [ ] | Poner ese correo en el aviso de privacidad (hoy es un borrador no vigente) y en `/demo`, sección Contacto. Quitar de `app/pruebas/claims.test.ts` la regla del correo solo si el correo ya existe | Ricardo | `app/public/privacidad.html`, `app/src/pages/Demo.tsx` |
| [ ] | Pedirle a José Luis permiso y fotos de sus obras para la demo, **por escrito y después de la plática**, nunca antes | Equipo con adulto | `docs/DEMO_JOSE_LUIS.md` |
| [ ] | Que un adulto lea el aviso de privacidad antes de que alguien real deje su correo | Adulto | `app/public/privacidad.html` |
| [ ] | Agendar la reunión con José Luis, con un adulto presente. El mensaje de contacto ya está en borrador | Adulto y equipo | `docs/REUNION_JOSE_LUIS.md`, `pitch/reunion-jose-luis/borradores-adulto.md` |
| [ ] | Probar el link de la demo en un iPhone y un Android | Ricardo | `braiart.vercel.app/jose-luis` |
| [ ] | Imprimir el one-pager y, si quieren, las piezas de la obra de ejemplo (dicen DEMO). ~~Piezas de *Toricleto*~~: es una obra real a la venta; la demo genérica va primero | Equipo | `pitch/reunion-jose-luis/one-pager.pdf`, `braiart.vercel.app/imprimir/7KQ2X` |

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

## Herramientas y cuentas (revisado el 31 oct 2026)
| Herramienta | Estado | Qué falta |
|---|---|---|
| Vercel | Publica `main` solo en `braiart.vercel.app` | Nada para la demo. Plan Hobby: gratis, pero no permite uso comercial (`docs/COSTOS.md`) |
| Supabase | **Sin cuenta.** La sesión no tenía llave de Supabase | Crear el proyecto (gratis) con un adulto y correr las migraciones (`docs/PROTOTIPO.md`) |
| GitHub | Funciona | |
| AWS y Google Cloud | Había credenciales en la sesión, pero **no eran válidas**. Brai no las necesita | Nada |
| Dominio `brai.art` | No comprado | ~2.60 USD el primer año en Porkbun. **Es el único gasto pendiente** |

No se gastó dinero en ninguna herramienta.

## 4. Deuda conocida (no es urgente, pero que no se olvide)
- La demo usa el mismo código de dueño (`4K7P-9QX2`) para todas las obras y cuenta los intentos en memoria. Es a propósito para la demo y la app lo dice; la versión real está escrita en las migraciones, no conectada.
- Accesibilidad sin auditar: contraste formal, lector de pantalla y celulares reales. La raspadita ya se usa con teclado (5 nov).
- El video del artista y las fotos huella siguen siendo de ejemplo.
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
- [x] Demo pública de José Luis en `/jose-luis` con sus obras reales y fuentes (`docs/DEMO_JOSE_LUIS.md`).
- [x] Punto v2 (principios de Clawd).
- [x] Todos los visuales en PNG, PDF, PPTX y GIF en `visuales/` (para la Chromebook). Se regeneran con `visuales/generar.cjs` y `visuales/deck.cjs`.
- [x] Backend en migraciones con 21 pruebas, verificación del 424 DNA y cadena de huellas.
- [x] Competencia, costos cotizados, Oferta B en prueba.
