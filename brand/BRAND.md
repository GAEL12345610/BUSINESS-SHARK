# Brai, manual de marca v2.3

*Cada obra sabe de dónde viene.*

Kit visual: `brand/kit.html` (ábrelo en el navegador) y el kit vivo en la app, ruta `/marca`. Logos: `brand/isotipo*.svg`. Mascota: `docs/MASCOTA.md`. **Todo en PNG, PDF y PPTX: `visuales/`.**

## 0. Lo que Brai tiene que hacer sentir (léelo antes de diseñar cualquier cosa)

**En una frase:** la obra de un artista independiente tratada con el respeto de un museo, y el artista que nunca la pierde de vista.

| Quién la ve | Qué tiene que sentir | Cómo se logra |
|---|---|---|
| **Artista** (el que paga) | "Por fin me tratan como marca seria, y sé dónde está mi obra." | Su nombre y su color mandan en la página de la obra. Brai solo firma abajo. |
| **Comprador** (el que toca el sello) | "Esto es mío, tiene historia, y el artista me conoce." | Cédula de museo, la historia contada por el artista, el momento de reclamar. |
| **Jurado** (Arte, Español, Mate) | "Esto existe, se toca y está pensado." | Sello físico + demo que abre de verdad + promesa honesta + números. |

**Tres palabras para revisar cualquier pieza:** *museo* (orden, ficha, aire), *taller* (calidez, mano, voz cercana), *registro* (fechas, números, nada que no podamos sostener). Si una pantalla no se siente como ninguna de las tres, está mal.

**Lo que NO es Brai:** una tienda en línea, un marketplace, una app de cripto, una startup de "tecnología de vanguardia".

## 1. Nombre
**Brai** viene de *vrai* ("verdadero" en francés). En español la B y la V suenan igual, así que "Brai" se oye exactamente como *vrai*.
- Riesgo de leerlo "brAI": se resuelve con la "i" estándar en el wordmark y nunca escribiéndolo "BrAI".
- Dominios (oct 2026, sin DNS, confirmar al comprar): `brai.art` (recomendado), `brai.mx`. `brai.com` y `brai.app` están tomados.

## 2. Posicionamiento
**Autoridad para el artista, rastro para su obra.**
Brai le da al artista independiente lo que tienen las marcas de lujo: cada obra con su registro, su historia y su dueño. El artista se ve serio, cobra más, y nunca pierde de vista a quién le compró.

**Frente a Verisart:** ellos venden tecnología (certificar, acuñar, Shopify). Nosotros vendemos un ritual: la entrega en persona, la tarjeta firmada a mano, el comprador que raspa su código. Se siente como la cédula de un museo, no como software.

**Lo que NO decimos:** "autenticación infalible", "blockchain", "anti-falsificación". Decimos "registro de propiedad y procedencia". Ver `docs/SEGURIDAD_OBRA.md`.

## 3. Personalidad
1. **Auténtico:** nunca corporativo.
2. **Cercano:** habla como el artista en su taller, no como una fintech.
3. **Artesanal con precisión:** calidez visual con orden de archivo de museo.
4. **Discretamente inteligente:** la tecnología resuelve, no presume.

## 4. Isotipo: el enso
Círculo de un solo trazo de pincel que casi se cierra; el punto dorado cierra el hueco: el último gesto, el que verifica. Es redondo porque el sello NFC detrás del cuadro también lo es: logo y chip son la misma pieza.
- El hueco va a las 2 en punto. Arriba se confunde con el ícono de encender.
- Mínimo 8 mm. Variantes: color, una tinta clara, una tinta oscura.
- El SVG sale de un script (trazo con grosor variable). Si lo redibuja un diseñador, conservar: grosor irregular, hueco a las 2, punto dorado.

## 5. Paleta
| Rol | HEX | Regla |
|---|---|---|
| Terracota | `#C06E52` | Logo y superficies grandes. Texto encima solo en tinta (4.0:1). |
| Terracota botón | `#A2563D` | Botones, links, texto chico (4.75:1 sobre lienzo). |
| Tinta carbón | `#2B2622` | Texto y fondos oscuros. |
| Dorado | `#C9A24B` | SOLO el momento "obra registrada". Nunca texto (2.1:1). |
| Lienzo | `#F6F1EA` | Fondos. |
| Verde sabio | `#5E6C52` | Texto secundario y etiquetas (5.0:1). |

## 6. Tipografía: tres voces (sistema v2.2, 31 oct 2026)
| Voz | Fuente | Uso |
|---|---|---|
| Galería | Fraunces, eje de tamaño óptico, peso 560 | Títulos y nombres de obra |
| Taller | Schibsted Grotesk variable, 400 a 600 | Texto e interfaz. Única fuente del panel. |
| Registro | IBM Plex Mono 400 y 500 | Número de registro, fechas, ficha técnica, códigos |

### Lo que cambió en v2.2 y por qué
1. **Tamaño óptico automático en Fraunces** (`font-optical-sizing: auto`). Fraunces trae varios "cortes" dentro del mismo archivo: a 100 px usa el de cartel (contraste alto, remates finos, se ve de museo); a 20 px usa el de texto (más robusto, se lee en un celular). Antes cargábamos un solo corte para todo.
2. **Peso 560, no 500 ni 600.** La fuente es variable: 500 se veía débil en el hero y 600 pesado en el nombre de la obra. 560 queda en medio.
3. **Escala de referencia:** display 48 a 104 px, h1 38 a 68, h2 28 a 40, h3 20 a 24, cuerpo 17, chico 14, registro 12. Las reglas de tipografía viven en `app/src/index.css`.
4. **Registro con cifras de ancho fijo y cero con diagonal** (`tabular-nums slashed-zero`): las columnas de la ficha cuadran y un 0 nunca se confunde con una O.
5. **Los códigos no usan 0, O, 1, I, L ni U.** Es tipografía y es seguridad: un comprador nunca va a dudar entre una O y un cero al escribir su código.
6. **Títulos con `text-wrap: balance`** (no quedan palabras sueltas en la última línea) y **sin guionado automático**: en español partía palabras feo ("ar-tista") en columnas angostas.
7. **Fuentes en nuestro servidor, no en Google Fonts.** Carga más rápido en el escaneo (una conexión menos), funciona si Google está bloqueado y no le avisamos a Google quién escanea qué obra.

### Lo que decidimos NO hacer
- **No cambiar de familia.** Pensamos en cambiar Fraunces por algo más sobrio. No: la marca v2 tiene 3 semanas, el kit y las piezas físicas ya la usan, y con el tamaño óptico bien puesto Fraunces se ve de museo, no de plantilla.
- **No cargar los ejes SOFT y WONK.** Pesan 121 KB contra 67 KB del eje de tamaño óptico. En un celular con datos, la página de la obra tiene que abrir en menos de 2 segundos frente al jurado. El cambio visual casi no se nota.

### Pesos reales (latín, woff2)
Fraunces 67 KB + Schibsted 47 KB + Plex Mono 30 KB = **~144 KB**. Se descarga una vez y queda en caché un año.

## 7. Las 3 piezas físicas (lo que toca el jurado)
1. **Sello NFC redondo** detrás del cuadro, antidesprendible (se rompe si lo despegas), con número de registro y QR al lado.
2. **Tarjeta de dueño** 85 × 55 mm: título, ficha, firma A MANO del artista y código bajo raspadita.
3. **Página de la obra** como cédula de museo: artista, título, ficha en monoespaciada, sello dorado "registrada por el artista", línea de tiempo de dueños.

## 8. Puntuación del copy
Sin guion largo, sin puntos suspensivos, sin barras entre palabras. Comas y puntos.

## 9. Las dos caras digitales

Brai tiene dos superficies y cada una tiene un dueño visual distinto. Confundirlas es el error más fácil de cometer.

| | **Landing de Brai** (`brai.art`) | **Página de la obra** (`brai.art/o/XXXX`) |
|---|---|---|
| Habla | Brai, al artista y al jurado | El artista, al comprador |
| Manda visualmente | La marca Brai completa | La obra y el color del artista |
| Logo arriba | Isotipo + "Brai" | El nombre del artista |
| Brai aparece | En todo | Solo en el sello chico "Registro Brai" abajo |
| Botón principal | "Ver una obra registrada" | "Reclamar mi obra" |
| Dirección de UI | EDITORIAL | EDITORIAL, con tema del artista |

**Tema del artista (white label):** cada artista elige UN color de acento y su nombre en Fraunces. Ese color pinta el marco de la obra y los botones. Todo lo demás (lienzo, tinta, tipografías, dorado del registro) es fijo: así toda obra en Brai se reconoce como Brai sin que Brai grite.

**El dorado es del registro, no del artista.** Ningún tema puede usar el dorado. Si el color del artista no da 4.5:1 sobre lienzo, el botón usa su versión oscurecida (la regla vive en el código, `app/src/lib/tema.ts`).

## 10. Frases que sí y frases que no (digital)

| Sí | No | Por qué |
|---|---|---|
| "Registrada por el artista" | "Verificado por Brai" | Brai no verifica la obra: guarda lo que el artista registró. |
| "Reclamar mi obra" | "Iniciar sesión" (para el comprador) | El comprador nunca crea cuenta. Raspa, escribe su código y su correo. |
| "Vendiste tu obra. ¿Sabes dónde está hoy?" | "Conectando artistas con sus compradores" | La segunda suena a marketplace. Brai no vende obra. |
| "Registro de propiedad y procedencia" | "Certificado de autenticidad infalible" | Ver `docs/SEGURIDAD_OBRA.md`. |
| "Acerca tu celular al sello" | "Escanea el tag NFC" | Habla como persona, no como manual. |

## 11. Movimiento

- **Una sola pieza "manipulable" por pantalla** (lo que cabe en el celular sin hacer scroll). En la landing es el teléfono que se inclina al arrastrarlo y muestra la página real de una obra. Todo lo demás solo aparece con fundidos de 600 ms.
- **3D con CSS** (`perspective` y `rotate`), nunca una librería de 3D: pesa cientos de KB y el 100% de los escaneos pasan en celulares de gama media con datos.
- **El único momento que brilla es el dorado** al reclamar una obra. Nada más tiene animación de celebración.
- Siempre respetar `prefers-reduced-motion`.

## 12. Mascota: Punto (v2)
Punto es el sello redondo con patitas: cuerpo terracota plano, el hueco del enso a las 2 en punto con el punto dorado encajado, ojos de bloque y sin boca. Por qué es así (principios de Michelin, Duolingo y Clawd de Claude Code, y el anti ejemplo de Clippy): `docs/MASCOTA.md`. Componente: `app/src/components/punto.tsx`. PNG: `visuales/punto/`.

- **Un solo color plano** (terracota, con patitas y brazos en terracota oscuro). Nada de degradados ni sombras duras.
- **Sin boca.** Toda la emoción va en los ojos. Cuatro estados: tranquilo, toque, feliz, duda. No se inventan más sin pasar por aquí.
- **El hueco va en el borde, nunca hasta el centro:** hasta el centro es Pac-Man (`memoria/silueta-propia.md`).
- **Una vez por pantalla, como mucho.** Nunca interrumpe, nunca tapa contenido, nunca en ventanas emergentes.
- **Nunca en la página de la obra ni en reclamar:** ahí manda el artista. Punto vive en la voz de Brai: landing, panel, recorrido, marca, página no encontrada.
- **Habla como Brai:** frases cortas, tú, sin signos de admiración.

## 13. Imagen para compartir
`app/public/og.png` (1200 × 630) es lo que se ve cuando alguien pega el link en WhatsApp o en redes. Se genera desde `app/scripts/og/plantilla.html` con `node app/scripts/og/generar.cjs`. Si cambia el titular de la landing, se regenera.

## 14. Historial
- **v2.4 (31 oct 2026):** Punto v2 con principios de Clawd: color plano, sin boca, patitas.
- **v2.3 (31 oct 2026):** mascota Punto (sección 12), imagen para compartir (13), kit vivo en `/marca`.
- **v2.2 (31 oct 2026):** sistema tipográfico: tamaño óptico, peso 560, cifras tabulares en el registro, fuentes autohospedadas. Ver sección 6.
- **v2.1 (31 oct 2026):** qué tiene que sentir cada quien (sección 0), las dos caras digitales y el tema del artista (9), frases digitales (10), reglas de movimiento (11). Sale "Verificado por Brai" y "Conectando artistas con sus compradores" de los drafts.
- **v2 (10 oct 2026):** isotipo enso (el anterior no cerraba y se leía como una "e"); Inter sale por Schibsted Grotesk; voz Registro en monoespaciada; verde `#6B7A5E` a `#5E6C52` y Ghost a `#A2563D` (no pasaban AA); tagline nuevo; piezas físicas diseñadas.
- **v1 (9 oct 2026):** nombre, paleta, Fraunces + Inter, botones con auditoría de contraste.
