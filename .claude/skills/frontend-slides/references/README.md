# Referencias huashu-design (importadas 2026-07-10)

Origen: [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) (MIT).
Los archivos están en chino — Claude los lee sin problema al ejecutar la skill; este
índice es para humanos. Se copiaron VERBATIM (traducirlos pierde fidelidad).

| Archivo | Qué es | Cuándo cargarlo |
|---|---|---|
| `design-styles.md` | 40 estilos (20 web + 20 PPT) con fidelidad "puro HTML/CSS" marcada, + protocolo de derivación de color en 3 pasos (muestrear → converger en oklch → argumentar) | Fase 2 (style discovery) cuando las 5 direcciones propias no alcanzan o el usuario quiere explorar. Es munición, NO checklist: el diseño sale del contenido del usuario, no del catálogo. |
| `typography.md` | Sistema de razonamiento tipográfico: orden de decisión (contenido → idioma → temperatura → recién ahí la fuente), escalas modulares, línea/interlineado, lista de fuentes quemadas | Al elegir tipografía fuera de las 5 direcciones, o al auditar un deck que "se ve genérico". Ignorar las reglas específicas de chino (中文). |
| `critique-guide.md` | Crítica de diseño en 6 dimensiones con veto: concepto ≤5 → total máx 6.0. Incluye Top 10 de clichés y template de reporte | Ciclo v1→audit→v2 de cualquier deck/landing/dossier antes de entregar. Patrón de iteración: v1, auditoría, v2 hasta que los defectos graves bajen del 2%. |
| `editable-pptx.md` | Restricciones duras para exportar PPTX EDITABLE (texto real, no imagen) | SOLO si el cliente pide PowerPoint editable. Leer ANTES de escribir el HTML — no es convertible a posteriori. |

## Ruta PPTX editable (scripts/html2pptx.js + scripts/export_deck_pptx.mjs)

- **NO convierte decks del motor 1920×1080.** El HTML se escribe desde cero bajo 4
  restricciones: body 960×540pt, texto solo dentro de `<p>`/`<h1>-<h6>`, sin gradientes
  CSS, fondo/borde/sombra solo en divs, imágenes como `<img>` (nunca background-image).
- Deps: `pnpm add playwright pptxgenjs sharp` (una vez, donde corras el export).
- Uso: `node scripts/export_deck_pptx.mjs --slides <dir> --out <file.pptx>`
  (un HTML por slide: `01-*.html`, `02-*.html`, ...).
- Si el cliente NO necesita editar → usa la ruta normal del motor (PDF o PPTX-imagen),
  es más rápida y visualmente superior.
