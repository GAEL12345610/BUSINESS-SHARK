# Patrones de animación

Todo va en el **segundo `<style>`** (per-deck) + un pequeño `<script>` extra
ANTES del `<script>` del framework (no toques el del framework). Las animaciones
disparan al activarse cada slide.

## 1. Reveal staggered en entrada (el patrón base)

```css
.slide.active [data-reveal] {
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.slide.active [data-reveal="1"] { animation-delay: 0ms; }
.slide.active [data-reveal="2"] { animation-delay: 80ms; }
.slide.active [data-reveal="3"] { animation-delay: 160ms; }
.slide.active [data-reveal="4"] { animation-delay: 240ms; }
@keyframes reveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Marca los elementos con `data-reveal="1|2|3|4"`. Como solo `.slide.active`
matchea, la animación re-dispara cada vez que entras al slide.

## 2. Caret parpadeante (efecto "se está escribiendo")

```css
.caret::after {
  content: "▍"; color: var(--accent); margin-left: 0.06em;
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
```
Úsalo en el último carácter de un título hero. Máximo 1 por deck.

## 3. Contador animado de big numbers (0 → valor)

Script extra (antes del framework). Re-dispara al activar el slide vía
MutationObserver sobre la clase `active`:

```html
<span class="big-stat" data-count="2304" data-suffix=" leads">0</span>
<script>
(function () {
  function run(el) {
    var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
    var t0 = null, dur = 1200;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      el.textContent = Math.round(end * e).toLocaleString('es-MX') + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var obs = new MutationObserver(function (m) {
    m.forEach(function (r) {
      if (r.target.classList.contains('active'))
        r.target.querySelectorAll('[data-count]').forEach(run);
    });
  });
  document.querySelectorAll('.slide').forEach(function (s) {
    obs.observe(s, { attributes: true, attributeFilter: ['class'] });
  });
  // dispara el primero al cargar
  var first = document.querySelector('.slide.active');
  if (first) first.querySelectorAll('[data-count]').forEach(run);
})();
</script>
```

## 4. Filas de tabla/comparativa que entran de izquierda

```css
.slide.active tr[data-row] { animation: rowIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
.slide.active tr[data-row="1"] { animation-delay: 80ms; }
.slide.active tr[data-row="2"] { animation-delay: 160ms; }
@keyframes rowIn { from { opacity:0; transform: translateX(-20px); } to { opacity:1; transform:none; } }
```

## NO uses

Bounces, rotaciones random, gradient animations en backgrounds importantes,
parallax exagerado, glow neón, micro-interacciones dispersas. La animación apoya
la jerarquía; no es el show.

## Obligatorio: respeta prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .slide.active [data-reveal],
  .slide.active tr[data-row] { animation: none !important; }
  .caret::after { animation: none !important; }
}
```
