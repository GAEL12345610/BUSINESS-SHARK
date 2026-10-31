# Brai, manual de marca v2.1

*Cada obra sabe de dónde viene.*

Kit visual: `brand/kit.html` (ábrelo en el navegador). Logos: `brand/isotipo*.svg`.

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

## 6. Tipografía: tres voces
| Voz | Fuente | Uso |
|---|---|---|
| Galería | Fraunces 500 y 600 | Títulos |
| Taller | Schibsted Grotesk 400 a 600 | Texto e interfaz |
| Registro | IBM Plex Mono 400 | Número de registro, fechas, ficha técnica |

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

- **Una sola pieza "manipulable" por página.** En la landing es el teléfono que se inclina al arrastrarlo y muestra la página real de una obra. Todo lo demás solo aparece con fundidos de 600 ms.
- **3D con CSS** (`perspective` y `rotate`), nunca una librería de 3D: pesa cientos de KB y el 100% de los escaneos pasan en celulares de gama media con datos.
- **El único momento que brilla es el dorado** al reclamar una obra. Nada más tiene animación de celebración.
- Siempre respetar `prefers-reduced-motion`.

## 12. Historial
- **v2.1 (31 oct 2026):** qué tiene que sentir cada quien (sección 0), las dos caras digitales y el tema del artista (9), frases digitales (10), reglas de movimiento (11). Sale "Verificado por Brai" y "Conectando artistas con sus compradores" de los drafts.
- **v2 (10 oct 2026):** isotipo enso (el anterior no cerraba y se leía como una "e"); Inter sale por Schibsted Grotesk; voz Registro en monoespaciada; verde `#6B7A5E` a `#5E6C52` y Ghost a `#A2563D` (no pasaban AA); tagline nuevo; piezas físicas diseñadas.
- **v1 (9 oct 2026):** nombre, paleta, Fraunces + Inter, botones con auditoría de contraste.
