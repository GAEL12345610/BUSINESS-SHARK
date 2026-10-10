---
name: brai-slides
description: "Presentaciones HTML con la marca de Brai: propuesta del 26 de noviembre, pitch de la Expo, deck para un artista. Corre sobre frontend-slides. Gatillos: /brai-slides, hazme el deck, pitch de Brai, presentación para el jurado, presentación para el artista."
---

# Brai Slides

Decks de 1920×1080 con la marca bloqueada. Motor: `frontend-slides` (viewport-base.css, html-template.md, animation-patterns.md). Aquí NO hay fase de elegir estilo: el estilo es Brai. Tú decides contenido y composición.

## Fase 1: brief (una sola llamada a AskUserQuestion)

1. **Tipo:** propuesta al jurado (26 nov) / pitch de la Expo / deck para un artista / interno.
2. **Densidad:** para hablar encima (una idea por slide) o para leer solo.
3. **Longitud:** corto (6 a 10) / medio (10 a 18).
4. **Contenido:** de qué va, en 2 a 4 frases.

## Fase 2: outline

Slide por slide, título + una línea. Espera el sí antes de generar.

**Deck para el jurado: cada slide se gana su lugar en la rúbrica** (`docs/CONCURSO.md`).
- Innovación (Arte y Español): problema humano, el ritual de entrega, la marca, el club de coleccionistas, las 3 piezas físicas.
- Viabilidad (Mate): mesa de costos, precio, punto de equilibrio, logística de los NFC, crecimiento.
- Cierre: el caso del cliente fundador (con datos reales, nunca inventados) y la demo.

## Fase 3: generación

Lee antes: `brand/BRAND.md`, los tokens `:root` de `brand/kit.html`, y del motor `frontend-slides/viewport-base.css` (entera en el `<style>`), `html-template.md` y `animation-patterns.md`. Usa `slide-templates/` como base (ya traen el logo de Brai inline) y adáptalos.

Tokens del deck (puente al motor):
```css
:root{
  --terracota:#C06E52; --terracota-btn:#A2563D; --tinta:#2B2622; --dorado:#C9A24B;
  --lienzo:#F6F1EA; --verde:#5E6C52; --linea:#E5DDCF;
  --bg:var(--lienzo); --surface:#FFFFFF; --fg:var(--tinta); --fg-secondary:var(--verde);
  --border:var(--linea); --accent:var(--terracota-btn); --accent-soft:#F3E4DC;
  --font-display:'Fraunces',Georgia,serif; --font-body:'Schibsted Grotesk',system-ui,sans-serif;
  --font-mono:'IBM Plex Mono',ui-monospace,monospace;
  --shell:#1E1A17; --stage-bg:var(--bg); --slide-bg:var(--bg);
}
```
Tema oscuro (apertura y cierre): `--bg:#2B2622; --fg:#F6F1EA; --fg-secondary:#CFC6B8; --accent:#C9A24B` (el logo en versión clara).

Reglas:
- Un acento por deck. Dorado solo para "registrada".
- Números con contexto y fuente ("8,870 artistas visuales en Jalisco, DataMéxico 2025"). Cifras en IBM Plex Mono con `tabular-nums`.
- Puntuación humana y voz de `marca-brai`. Cero "soluciones innovadoras".
- Animaciones suaves de entrada, con `prefers-reduced-motion`.
- Numeración `01 / 12` en mono, esquina inferior derecha.

## Fase 4: entrega

Guarda en `pitch/<slug>.html`, ábrelo y di: ruta, número de slides, atajos (flechas, `E` edita, `S` exporta). Ofrece PDF con `frontend-slides/scripts/export-pdf.sh`.

Antes de cerrar: ortografía, datos consistentes con `docs/COSTOS.md`, ningún `{{PLACEHOLDER}}` sin reemplazar.
