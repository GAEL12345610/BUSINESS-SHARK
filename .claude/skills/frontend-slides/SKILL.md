---
name: frontend-slides
description: "Motor base de presentaciones HTML autocontenidas (1920x1080 scale-to-fit, teclado, export PDF, animaciones). Debajo corre brai-slides. Úsala directo para decks genéricos SIN marca o cuando otra skill de slides te delegue. Gatillos: hazme un deck, presentación HTML, slides genéricos."
---

# Frontend-Slides — motor de presentaciones HTML

Genera decks HTML autocontenidos (un solo archivo, sin build, sin npm). El motor está
**bloqueado**: stage 1920×1080, scale-to-fit, teclado, contador, export PDF y print.
Tu trabajo es contenido + composición + tema — **nunca** reescribir el motor.

Origen del motor: open-design deck-framework (Apache 2.0). Ver
`design-systems/NOTICE.md` en el workspace Claudio.

## Archivos del motor (léelos antes de generar)

1. **[deck-skeleton.html](deck-skeleton.html)** — el template canónico. Cópialo
   verbatim y llena solo los `SLOT:`. **Esto es el output base.**
2. **[html-template.md](html-template.md)** — el contrato: qué slots editar, modos de
   drift prohibidos, reglas de densidad/overflow, self-check pre-emisión.
3. **[viewport-base.css](viewport-base.css)** — el CSS base del motor (ya viene dentro
   del skeleton; este archivo es la referencia aislada).
4. **[animation-patterns.md](animation-patterns.md)** — reveals staggered, caret,
   contador de big numbers, filas de tabla, `prefers-reduced-motion`.

Paletas de arranque: `design-systems/DIRECTIONS.md` y los 13 `tokens.css` en
`design-systems/` del workspace.

Referencias extra (huashu-design, en chino — ver [references/README.md](references/README.md)):
`references/design-styles.md` (40 estilos + protocolo de color oklch),
`references/typography.md` (razonamiento tipográfico), `references/critique-guide.md`
(audit de diseño en 6 dimensiones), `references/editable-pptx.md` (ruta PPTX editable).

---

## Fase 0: Detección de modo

- **A — From scratch:** solo hay tema/objetivo → Fase 1.
- **B — From content:** contenido listo (Doc, markdown, notas) → Fase 2.
- **C — Enhance existing:** ya hay un HTML → léelo, detecta su tema, aplica cambios
  manteniendo el motor intacto (no regeneres desde cero salvo cambio de tema completo).

Las skills que delegan saltan fases: brai-slides salta Fase 2 (tema bloqueado);
yt-slides salta Fase 1 (contenido ya escrito) y entra en Fase 2.

## Fase 1: Content discovery (solo modo A)

Una sola pregunta agrupada (`AskUserQuestion` si está disponible, si no opciones
numeradas en un mensaje). Nunca una por una. Recoge: objetivo del deck, audiencia,
mensaje único que debe quedar, 3-5 puntos clave, longitud, densidad
(speaker-led/baja vs reading-first/alta). Si faltan puntos clave, propónlos tú.

## Fase 2: Style discovery

Si no hay marca definida, elige una de las 5 **direcciones** (paleta OKLch + fuentes +
posture deterministas; full specs en `design-systems/DIRECTIONS.md`):

1. **editorial-monocle** — revista impresa, serif, papel+tinta, 1 acento. Briefs editoriales.
2. **modern-minimal** — Linear/Vercel, sans de sistema, base neutra, acento cobalto. SaaS/producto.
3. **human-approachable** — Airbnb/Duolingo, radios generosos, teal. Consumer/educación/AI.
4. **tech-utility** — Datadog/GitHub, denso, mono, signal green. Dashboards/ingeniería.
5. **brutalist-experimental** — Are.na/Yale, serif gigante, mono body, rojo. Arte/agencia/manifiesto.

Elige según el tema (no preguntes si los datos lo dicen). Si el usuario quiere comparar,
genera 3 previews cortos (`style-a.html`, `style-b.html`, `style-c.html`) de 2 slides
cada uno y que elija. Pega el `:root` de la dirección **verbatim** en el `SLOT: theme
tokens`. Acento: máximo 1 por deck.

Si las 5 direcciones no encajan o el usuario pide explorar más, abre
`references/design-styles.md` (40 estilos con fidelidad HTML-puro marcada). Al usarlo,
sigue su protocolo de color: los hex de cada estilo son anclas de ejemplo, NO recetas —
deriva la paleta del contenido/marca real (muestrear → converger en oklch → poder
decir en una frase por qué ese color).

Fuentes solo vía Google Fonts (o stacks de sistema si la dirección los pide). Nunca
mezclar fuentes de una dirección con paleta de otra.

## Fase 3: Generación

1. Copia `deck-skeleton.html` como `{slug}.html`.
2. Pega la paleta+fuentes elegidas en `SLOT: theme tokens` (`:root`).
3. Planea el arco de slides en voz alta (1 idea por slide).
4. Agrega tus clases en el segundo `<style>` (`SLOT: per-deck styles`).
5. Rellena cada `<section class="slide">`. El primero `class="slide active"`.
6. Aplica `animation-patterns.md` (reveals + reduced-motion obligatorio).
7. **Corre el self-check de densidad de `html-template.md` ANTES de cerrar.**

Copy real siempre — sin lorem ipsum, sin métricas inventadas, sin filas de emoji
decorativas. Si no tienes un dato, deja un placeholder corto y honesto.

## Fase 4: Entrega

1. Guarda en el directorio actual (o `clients/{cliente}/` si aplica).
2. Ábrelo: `start deck.html` (Windows) / `open deck.html` (macOS).
3. Reporta: archivo, tema/dirección, nº de slides, atajos (← → space para navegar).
4. Ofrece: export PDF (`scripts/export-pdf.sh deck.html`), export PowerPoint
   (`python ../../scripts/html_to_pptx.py deck.html salida.pptx` — una imagen full-bleed
   por slide, se ve exacto al deck) o deploy (`scripts/deploy.sh deck.html`).
   El PDF sale gratis del `@media print` del motor.
5. Si el cliente necesita **PPTX editable** (texto real, doble-clic y editar): es OTRA
   ruta, no una conversión — leer `references/editable-pptx.md` ANTES de escribir el
   HTML (body 960×540pt + 4 restricciones duras) y exportar con
   `node scripts/export_deck_pptx.mjs --slides <dir> --out <file.pptx>`
   (deps: `pnpm add playwright pptxgenjs sharp`).
6. Antes de entregar un deck importante (cliente/inversor), pasa el audit de
   `references/critique-guide.md`: 6 dimensiones, concepto manda (≤5 → total máx 6.0).
   Itera hasta ≥8 o hasta agotar los quick wins.

## Restricciones

- HTML único autocontenido. Sin npm, sin build. Dependencias externas solo Google Fonts.
- Sin tracking de terceros salvo que se pida.
- Cada slide cabe en 1920×1080 sin scroll. Contenido que no cabe → 2 slides.
- **Nunca** reescribas `fit()`, el handler de teclado, el toggle `.slide.active`, el
  contador ni el `@media print`. Si te ves escribiendo eso, PARA y re-lee `html-template.md`.
