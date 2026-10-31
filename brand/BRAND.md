# Brai, manual de marca v2

*Cada obra sabe de dónde viene.*

Kit visual: `brand/kit.html` (ábrelo en el navegador). Logos: `brand/isotipo*.svg`.

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

## 6. Tipografía: tres voces (sistema v2.1, 31 oct 2026)
| Voz | Fuente | Uso |
|---|---|---|
| Galería | Fraunces, eje de tamaño óptico, peso 560 | Títulos y nombres de obra |
| Taller | Schibsted Grotesk variable, 400 a 600 | Texto e interfaz. Única fuente del panel. |
| Registro | IBM Plex Mono 400 y 500 | Número de registro, fechas, ficha técnica, códigos |

### Lo que cambió en v2.1 y por qué
1. **Tamaño óptico automático en Fraunces** (`font-optical-sizing: auto`). Fraunces trae varios "cortes" dentro del mismo archivo: a 100 px usa el de cartel (contraste alto, remates finos, se ve de museo); a 20 px usa el de texto (más robusto, se lee en un celular). Antes cargábamos un solo corte para todo.
2. **Peso 560, no 500 ni 600.** La fuente es variable: 500 se veía débil en el hero y 600 pesado en el nombre de la obra. 560 queda en medio.
3. **Escala fluida** (crece con la pantalla, sin saltos): display 48 a 104 px, h1 38 a 68, h2 28 a 40, h3 20 a 24, cuerpo 17, chico 14, registro 12. Los tokens viven en `app/src/estilos/base.css`.
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

## 9. Historial
- **v2.1 (31 oct 2026):** sistema tipográfico: tamaño óptico, peso 560, escala fluida, cifras tabulares en el registro, fuentes autohospedadas. Ver sección 6.
- **v2 (10 oct 2026):** isotipo enso (el anterior no cerraba y se leía como una "e"); Inter sale por Schibsted Grotesk; voz Registro en monoespaciada; verde `#6B7A5E` a `#5E6C52` y Ghost a `#A2563D` (no pasaban AA); tagline nuevo; piezas físicas diseñadas.
- **v1 (9 oct 2026):** nombre, paleta, Fraunces + Inter, botones con auditoría de contraste.
