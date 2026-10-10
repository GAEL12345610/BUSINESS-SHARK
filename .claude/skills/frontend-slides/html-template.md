# Arquitectura HTML — canvas fijo 1920×1080

Motor de deck. Origen: open-design deck-framework (Apache 2.0). La regla de oro:
**copia el skeleton verbatim y llena SOLO los `SLOT:`**. No reescribas el `fit()`,
el handler de teclado, el toggle de visibilidad, el contador ni el `@media print`.
Cada vez que se re-autoran, salen bugs sutiles (focus dentro del iframe, drift del
scale, flechas que se tragan, PDF de una sola página).

## El contrato que te da gratis

- Stage 1920×1080 escalado a viewport con `transform-origin: top left` + translate.
- Solo `.slide.active` visible. El script auto-cuenta los slides.
- Prev/next + contador **fuera** del stage escalado (no encogen).
- Teclado `← → space PgUp PgDn Home End`, click-anywhere focus, capture-phase en
  window **y** document (sobrevive focus de iframe).
- Posición restaurada vía `localStorage`.
- `@media print` → "Guardar como PDF" emite PDF vertical multipágina, 1 slide/página.

## Slots que SÍ puedes editar

- `SLOT: deck title` — el `<title>`.
- `SLOT: theme tokens` — el `:root` (`--bg`, `--fg`, `--accent`, `--surface`, …).
  Aquí pegas la paleta de la dirección/tema elegido. **Verbatim, sin improvisar.**
- `SLOT: per-deck styles` — el **segundo** `<style>`. Define tus clases (`.title`,
  `.big-stat`, `.grid-3`, tipografía). **Nunca** redefinas `.deck-shell`,
  `.deck-stage`, `.slide`, `.deck-counter`, `.deck-hint`, ni nada dentro de
  `@media print`.
- `SLOT: slides` — los `<section class="slide">`. El primero DEBE ser
  `class="slide active"`; el resto solo `class="slide"`.
- `SLOT: slide N content` — contenido dentro de cada `<section>`.

## Modos de drift — NO HAGAS ESTO

- ❌ Escribir tu propio `fit()` o `transform: scale()`. Ya existe; las versiones
  ad-hoc driftan dentro del wrapper transformado del viewer.
- ❌ `transform-origin: center center` en el stage. El framework usa `top left`
  + translate explícito.
- ❌ `document.addEventListener('keydown')` solo. Dentro de iframe el focus puede
  estar en window. El framework escucha en **ambos** en capture phase.
- ❌ Cambiar la key de localStorage, el toggle `.slide.active`, o los IDs
  `#deck-cur`/`#deck-total`/`#deck-prev`/`#deck-next` (el script los lee por ID).
- ❌ Meter prev/next o contador **dentro** de `.deck-stage`.
- ❌ Redefinir `.slide`, `.slide.active` o `.slide:not(.active)`. Para un layout
  no-flex en un slide, **agrega una clase variante** al mismo `<section>` (ej.
  `.s-cover`, `.s-magazine`) y declara `display: grid/block` ahí. El default activo
  está en `:where(...)` (especificidad 0) → tu variante siempre gana.
- ❌ Borrar o "limpiar" el `@media print`. Es como Share→PDF cose el documento.

## Densidad y overflow (la causa #1 de decks feos)

Reglas no negociables:
1. **Titulares de portada: máx ~140px font-size, máx 8 palabras, máx 3 líneas.**
   Si no cabe, el slide tiene la forma equivocada — pártelo, no encojas la fuente.
2. **Footer safe-zone.** Si usas `.footer { position:absolute; bottom:Npx }`, el
   contenido de flujo debe parar ≥80px antes de `1080 − alto_footer − N`. En la
   práctica: que el contenido no entre en los últimos 200px del slide. Lo fácil:
   contenido en su propio `<div style="height:760px">` y el footer absoluto abajo.
3. **Slides de cuerpo: ≤3 párrafos, ≤56ch de ancho de lead, ≤12 palabras/línea.**
4. **Una idea por slide.** Dos ideas = dos slides. Los slides cuestan cero (el
   framework los cuenta solo).

## Self-check antes de emitir

Para cada `<section class="slide">`, renderiza mentalmente a 1920×1080:
- [ ] ¿Cabe sin recortar ni desbordar por abajo?
- [ ] Si hay footer/header absoluto, ¿el contenido para antes de su banda?
- [ ] ¿Titular ≤140px y ≤8 palabras?
- [ ] ¿≤1 idea grande por slide?

Si algún "no" → rediseña ANTES de emitir.

## Skeleton canónico

El archivo `deck-skeleton.html` en esta carpeta ES el template. Cópialo entero,
ajusta `:root`, agrega clases en el segundo `<style>`, y rellena los
`<section class="slide">`. Nada más, nada menos.
