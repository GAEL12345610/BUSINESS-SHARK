# Punto, la mascota de Brai

**Qué es (v2, 31 oct 2026):** el sello redondo de Brai con patitas. Cuerpo terracota de un solo color, el hueco del enso a las 2 en punto con el punto dorado encajado, ojos de bloque, sin boca. La v1 (sello color lienzo con cara de emoji) no convenció: se veía como un emoji más, no como un personaje. Se llama **Punto** porque el punto dorado es "el último gesto, el que verifica" (`brand/BRAND.md`, sección 4).

Componente: `app/src/components/punto.tsx`. Reglas de uso: `brand/BRAND.md`, sección 12. PNG: `visuales/punto/`.

## v2: ingeniería inversa de Clawd (la mascota de Claude Code)

Clawd es el personaje de pixeles, color naranja, que sale en la terminal de Claude Code. Es de Anthropic: no copiamos su forma (es un cangrejo de bloques), copiamos **por qué funciona**:

| Por qué funciona Clawd | Lo que tomamos para Punto v2 |
|---|---|
| **Un solo color plano** (naranja, ojos negros). Se reconoce aunque mida 16 px. | Cuerpo terracota plano, patitas y bracitos terracota oscuro. Se lee chiquito y en una sola tinta. |
| **No tiene boca.** Toda la expresión está en dos ojos de bloque. | Quitamos boca y chapetes. Los ojos son bloques: normales, más altos al tocarlo, `^ ^` feliz, uno entrecerrado con duda. |
| **Patitas cortas.** Lo vuelven "alguien" y no un ícono. | Dos patitas y dos bracitos: saluda al tocarlo y levanta los brazos cuando registras una obra. |
| **Está hecho del medio donde vive** (pixeles de terminal). | Está hecho de lo que es Brai: el sello redondo con el hueco del enso y el punto dorado. |

**Lo que salió mal en el camino:** la primera muesca llegaba al centro del círculo y Punto quedó igual a Pac-Man. Se corrigió a un hueco chico en el borde (`memoria/silueta-propia.md`).

Fuentes sobre Clawd (secundarias, Anthropic no publica la ficha de diseño): [Stark Insider](https://www.starkinsider.com/2025/10/clawd-ai-retro-mascot-command-line.html), [explicación de logo y mascota de Claude Code](https://dot-ai.myuuu.co.jp/times/articles/85).

---

## v1: la investigación de principios (sigue vigente)

---

## Por qué no copiamos una mascota existente

Nos pidieron copiar una mascota famosa y darle nuestro toque. No lo hicimos, por tres razones:

1. **Son marcas registradas.** El búho de Duolingo o el muñeco de Michelin están protegidos. Copiar su forma con otro color sigue siendo copiar.
2. **Nos baja en Innovación.** La rúbrica de Arte califica creatividad y branding (`docs/CONCURSO.md`). Un jurado que reconoce al búho de Duolingo pintado de terracota nos ve como copia.
3. **No cuenta nuestra historia.** El búho dice "aprende idiomas". Nuestra mascota tiene que decir "esta obra tiene registro".

Lo que sí hicimos fue **ingeniería inversa de por qué funcionan** y aplicar esos principios a una mascota propia. Es la regla de la casa: copiar lo probado, con toque propio.

## Qué copiamos de cada una (el principio, no el dibujo)

| Mascota | Por qué funciona | Lo que tomamos para Punto |
|---|---|---|
| **Bibendum, Michelin** (1898) | Está hecho del producto: nació de una pila de llantas. Quien lo ve entiende qué vende la marca. | **Punto está hecho del producto:** es el sello NFC redondo. Quien lo conoce en la landing lo reconoce detrás del cuadro. |
| **Duo, Duolingo** (rediseño 2019) | Hecho de pocas formas básicas (círculos, rectángulos redondeados), con ojos grandes que cargan toda la expresión. Fácil de animar y de reconocer en chiquito. | Punto es un círculo, dos ojos, dos patitas. **Toda la emoción va en los ojos.** Se ve igual de bien a 24 px que a 200 px. |
| **Duo, Duolingo** | Es el mismo personaje con la misma voz en la app, en las notificaciones y en redes. | Punto habla como Brai: tú, frases cortas, nada de "¡Wow!". |
| **Clippy, Microsoft** (lo que NO hay que hacer) | Lo odiaron porque interrumpía cuando nadie lo llamaba y no se podía quitar. Microsoft lo apagó por default en Office 2000 y lo quitó en 2007. | **Punto nunca interrumpe.** No sale en ventanas emergentes ni tapa contenido. Aparece solo en momentos de Brai y se queda quieto si no lo tocas. |

## Cómo está construido
- **Cuerpo:** círculo color lienzo con el borde suave del sello físico.
- **Contorno:** el isotipo enso real (`brand/isotipo.svg`), nunca redibujado. El hueco a las 2 queda arriba a la derecha, con el punto dorado.
- **Cara:** dos ojos color tinta y una boca de una línea. Chapetes terracota muy suaves.
- **Estados:** `tranquilo` (parpadea), `atento` (sus ojos siguen al cursor o al dedo), `toque` (salen ondas NFC, como cuando lo acercas a un celular), `feliz` (salta una vez: cuando el artista registra una obra nueva en su panel), `duda` (ladea la cabeza: página no encontrada).

## Dónde sale y dónde no
| Sí | No |
|---|---|
| Landing, en la sección del sello | La página de la obra: esa es del artista, Brai solo firma abajo |
| Panel del artista (registrar obra, panel vacío) | Ventanas emergentes o mensajes que tapan algo |
| Página no encontrada | Junto al precio (no se ríe del dinero) |
| Recorrido guiado y kit de marca (`/marca`) | Reclamar: vive dentro de la página del artista; ahí el momento es el sello dorado |
| | Más de una vez por pantalla |

## Fuentes
- [Michelin, origen del Michelin Man](https://www.michelinman.com/why-michelin/michelin-man-origin) y [Wikipedia, Michelin Man](https://en.wikipedia.org/wiki/Michelin_Man).
- [Duolingo, "Reshaping Duo"](https://blog.duolingo.com/reshaping-duo/), [Design Week sobre el rediseño de 2019](https://www.designweek.co.uk/issues/2-6-january-2019/duolingo-owl-receives-makeover-as-app-becomes-more-gamified) y [guía de ilustración de Duolingo](https://design.duolingo.com/illustration).
- [Mental Floss sobre Clippy](https://www.mentalfloss.com/article/504767/tragic-life-clippy-worlds-most-hated-virtual-assistant) y [BGR, por qué Microsoft lo retiró](https://bgr.com/2155953/what-happened-to-clippy-why-microsoft-retired-office-assistant/).
