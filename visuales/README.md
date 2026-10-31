# Visuales de Brai (PNG, PDF, PPTX, GIF)

Todo lo visual de Brai en formatos que abre cualquier computadora, incluida la Chromebook de la escuela. **Se generan desde la app real**: si cambia la app, se vuelven a generar (abajo).

## Para abrir rápido
| Archivo | Qué es |
|---|---|
| **`Brai-visuales.pptx`** | Presentación de 13 diapositivas: logo, color, tipografía, Punto, piezas físicas, pantallas del prototipo y la demo de José Luis. Ábrela con Google Slides. |
| **`Brai-visuales.pdf`** | La misma presentación en PDF. Se abre directo en la Chromebook. |
| `imprimir/piezas-BRAI-0001-carta.pdf` | Tarjeta de dueño, sello y QR en **tamaño real**, hoja carta. Para imprimir. |

## Carpetas
| Carpeta | Contenido |
|---|---|
| `logos/` | Isotipo en color, claro y una tinta (1024 × 1024, fondo transparente). Logo horizontal transparente, sobre lienzo y sobre fondo oscuro. |
| `punto/` | La mascota en sus 4 estados: tranquilo, toque, feliz, duda (fondo transparente). |
| `marca/` | Paleta, tipografía, voz, piezas físicas y el kit de marca completo en una sola imagen. |
| `pantallas/celular/` | Cada pantalla a 390 px de ancho. `nombre.png` es lo primero que se ve; `nombre-completa.png` es la página entera. |
| `pantallas/escritorio/` | Lo mismo a 1440 px. |
| `imprimir/` | Piezas para imprimir en PNG y en PDF tamaño carta. |
| `obras-ejemplo/` | Las 4 pinturas de ejemplo (inventadas, no son de ningún artista) y los marcos "foto pendiente" de las obras de José Luis. |
| `compartir/` | La imagen que sale al pegar el link en WhatsApp y el ícono para celular. |
| `clips/` | La escena del sello en GIF (se ve en cualquier lado) y un cuadro fijo. El video original en MP4 está en `pitch/clips/`. |

**Pantallas:** `landing`, `obra`, `reclamar`, `artista`, `panel`, `recorrido`, `marca` (con Lucía Arce, artista inventada) y `jose-luis-recorrido`, `jose-luis-obra`, `jose-luis-artista` (demo de José Luis con sus datos públicos, `docs/DEMO_JOSE_LUIS.md`).

## Volver a generar todo
Necesita Playwright con Chromium y ffmpeg.
```
cd app
pnpm build
pnpm preview
```
En otra terminal, desde la raíz del repo:
```
node visuales/generar.cjs http://localhost:4173
```
Para la presentación hace falta `pptxgenjs`, que no es parte de la app. Instálalo en otra carpeta con pnpm y corre:
```
NODE_PATH=<esa carpeta>/node_modules node visuales/deck.cjs
```
El PDF de la presentación se saca abriendo el PPTX en Google Slides o PowerPoint y exportando a PDF.
