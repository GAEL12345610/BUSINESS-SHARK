# Análisis de Brai, sin suavizar

Fecha: 10 oct 2026. Faltan **47 días** para la propuesta final (26 nov).
Fuentes al final. Donde un dato no está confirmado, lo digo.

> **Ojo:** este análisis es la foto de ANTES de decidir. Critica cosas que ya cambiaron (precio, álbum, titular). Lo vigente está en `DECISIONES.md`.

---

## Veredicto en 3 líneas

1. **La idea gana el concurso, pero el negocio como está escrito no se sostiene.** El cliente que paga (el pintor) es el que menos dinero tiene en toda la cadena.
2. **El titular está mal elegido.** "Autenticar" es el dolor de Picasso, no del pintor local. El dolor real del pintor independiente es *no saber quién tiene su obra*.
3. **Hicieron la marca antes de hablar con un solo cliente.** 6 prospectos, los 6 en "Por contactar". Eso es lo primero que se arregla, esta semana.

---

## Lo que está BIEN (y por qué)

| Qué | Por qué vale | Dato |
|---|---|---|
| Copiar lo probado + toque local | Es exactamente cómo se arma un negocio con poco riesgo | Verisart ya tiene +50,000 creadores con este modelo |
| El canal "directo del artista" crece | El comprador ya le compra al pintor sin galería: ahí vive Brai | 69% de los coleccionistas compró directo al artista, ~19-20% de su gasto (Art Basel/UBS 2025 y 2026) |
| Tarjeta con código de activación | Barata, automática y defendible. Resuelve "quién es el dueño" sin fotos ni revisión manual | Mismo patrón que Prada/EON ("Claim Ownership") |
| Modelo B2B (paga el pintor) | Separaron bien usuario (comprador) y cliente (pintor) | |
| Demo física en la Expo | Un jurado acercando su celular a un cuadro real se acuerda de ti. Pesa directo en Innovación | |
| Marca de Brai | Consistente, con auditoría de contraste AA hecha. Mejor que el 95% de equipos de secundaria | |
| "Pasaporte digital" es palabra del futuro | La UE lo vuelve obligatorio por ley, empezando por baterías | Feb 2027 en baterías (EU 2023/1542); textiles y muebles después |

---

## Lo que está MAL (ordenado por gravedad)

### 1. Cero validación, mucha marca
El manual de marca tiene auditoría de contraste del 9 de octubre. El pipeline de pintores tiene 0 entrevistas. Están puliendo la pintura de una casa sin cimientos.
**Arreglo:** esta semana, la entrevista con José Luis Malo. Antes del 26 nov: 3 pintores y 5 compradores entrevistados. Sin eso, todo lo demás es opinión.

### 2. El pintor no tiene dinero (el dato que más duele)
- En México hay **~127,000** pintores, dibujantes artísticos, escultores y escenógrafos. **8,870 en Jalisco.** Ingreso promedio: **~4,960 MXN al mes** (DataMéxico, ENOE 2025-T1).
- En Reino Unido, más de la mitad de los artistas visuales gana menos de £5,000 al año vendiendo obra (Artists' Livelihoods 2025).

Traducción: le estás vendiendo a la persona con menos dinero de la cadena. Galerías (cobran 40-50% de comisión, dato estándar de la industria) y coleccionistas tienen el dinero.

### 3. "Autenticidad" es el dolor equivocado para este cliente
Las falsificaciones persiguen nombres que valen millones: Banksy, Picasso, Warhol, Modigliani (red desmantelada en Italia, 2024). Nadie falsifica a un pintor local que vende en 8,000 pesos: no le sale la cuenta al falsificador.
El dolor que SÍ tiene el pintor independiente:
- **No sabe quién tiene sus obras** → no puede volver a venderle a quien ya le compró.
- **Pierde dinero en la reventa:** la Ley Federal del Derecho de Autor (art. 92 bis) le da al artista plástico derecho a cobrar una parte de cada reventa. Ese derecho es irrenunciable, pero casi nadie lo cobra porque **nadie sabe por dónde anda la obra.** Brai es justo esa trazabilidad. (El porcentaje lo fija INDAUTOR, art. 212: falta confirmarlo).

Eso es un ángulo que ningún otro equipo va a tener, y es ley, no opinión.

### 4. El NFC que eligieron se clona en 10 segundos
NTAG213 guarda una URL fija. Con la misma app gratis que piensan usar para grabarla (NFC Tools) cualquiera la copia a otro tag. Entonces **"autentificar" con NTAG213 es una promesa falsa.**
- La versión seria es **NTAG 424 DNA**: genera una firma nueva en cada toque (AES-128), copiarla no sirve. Cuesta **~2.50-5 USD por pieza** vs **~0.10 EUR** del NTAG213. Y configurarla no es plug-and-play.
- Para el concurso: digan **"registro de propiedad y procedencia"**, no "autenticación". Y pongan el 424 DNA como "versión 2" en la diapositiva de Viabilidad. Honesto y suena más pro.

### 5. El "álbum Panini" con un solo pintor está vacío
Quien le compra a un pintor independiente compra 1, quizá 2 obras. Un álbum con una estampa no es un juego. La colección solo funciona si hay **muchos artistas** en la plataforma (tipo "álbum de los artistas de Guadalajara"), y eso convierte a Brai en un marketplace de dos lados, que es mucho más difícil.
Además: no hay ni un dato público de que coleccionistas de arte quieran niveles. Arianee lo vende, pero no publica tasas de uso.
**Arreglo:** pregunten a los 5 compradores si les importa. Si no, los niveles se premian por *relación* (visitar el taller, ir a la expo del pintor, recibir la historia de la obra nueva), no por *cantidad* de obras.

### 6. El precio está calculado sobre el costo del tag, no sobre el valor
25-40 MXN por obra está anclado a lo que cuesta el sticker. Verisart cobra **29.99 USD al mes** (plan Growth). Si un pintor vende 12 obras al año, Brai le cobra ~480 MXN al año más mantenimiento. Para que 4 personas ganen algo necesitas cientos de pintores, y cada uno se vende en persona.
Eso es el peor cuadrante de Hormozi: **ticket bajo + venta uno a uno.**
**Arreglo para el pitch de Mate:** cobrar por porcentaje o como comparación contra la galería ("la galería se queda el 50%, Brai te cuesta el 2% de la obra y te deja al cliente"). Y que la mesa de costos tenga punto de equilibrio en número de pintores.

### 7. El 78% de México usa Android y no todos traen NFC prendido
Android 78% / iOS 22% en México (StatCounter, jul 2026). Muchos Android baratos no traen NFC o lo traen apagado. Si el jurado acerca su celular y no pasa nada, perdieron el momento.
**Arreglo:** cada obra lleva NFC **y QR** impreso. Cuesta cero.

### 8. Roles sin definir y riesgo de sobre-construir
La rúbrica premia Innovación (Arte y Español) y Viabilidad (Mate). **Nadie califica el backend.** El riesgo es que los 2 que programan se pasen 5 semanas en una app y nadie haga la mesa de costos ni el infomercial.
**Arreglo:** el prototipo es landing + página de una obra + flujo de "reclamar obra" con el código. Nada más hasta el 26 nov.

---

## Lo que haría yo en sus zapatos (en orden)

1. **Esta semana:** entrevista a José Luis Malo (con adulto presente). Pregunta clave nueva: *"¿sabes dónde están las obras que vendiste hace 3 años?"* y *"¿sabías que la ley te da una parte de cada reventa?"*.
2. **Cambiar el titular** de "autenticar" a "tu obra nunca se pierde de vista": historia + dueño + reventa.
3. **Repartir roles** con la rúbrica: 1 en costos (Mate), 1 en marca y pitch (Arte/Español), 2 en prototipo y video.
4. **Cotizar en México:** NTAG213 y NTAG 424 DNA en MercadoLibre, con envío.
5. **Mesa de costos** con 3 escenarios de precio y punto de equilibrio.
6. **Prototipo mínimo** desplegado con 3 obras reales.

---

## Datos que faltan (no inventar)
- % de reventa que fija INDAUTOR (art. 212 LFDA).
- Precio real de tags en MercadoLibre México.
- Cuántas obras vende al año y a qué precio José Luis Malo (y los demás).
- Si los compradores quieren niveles o no.

## Fuentes
- [Art Basel y UBS Art Market Report 2025](https://www.artbasel.com/news/the-art-basel-and-ubs-global-art-market-report-2025): mercado global 57.5 mil millones USD en 2024, online 10.5 mil millones, 22% de ventas de dealers.
- [Ocula, Survey of Global Collecting 2025](https://ocula.com/magazine/art-news/2025-art-basel-ubs-survey-global-collecting/) y [The Art Newspaper, oct 2026](https://www.theartnewspaper.com/2026/10/08/wealthy-gen-z-collectors-are-the-art-markets-biggest-spenders-survey-finds): 69% compra directo al artista, ~19-20% del gasto.
- [DataMéxico, subgrupo 216](https://www.economia.gob.mx/datamexico/es/profile/occupation/pintores-disenadores-y-dibujantes-artisticos-escultores-y-escenografos): 127 mil ocupados, 8.87 mil en Jalisco, ~4,960 MXN al mes (2025-T1).
- [Artists' Livelihoods Report 2025](https://visualartists.ie/wp-content/uploads/2026/01/2025.11.27-Artists-Livelihoods-Report_Final.pdf): más de la mitad gana menos de £5,000 al año en ventas.
- [LFDA art. 92 bis](https://mley.mx/LFDA/articulo/92-bis/): derecho de participación en reventa.
- [Verisart, planes](https://help.verisart.com/en/articles/9482973-new-verisart-pricing-plans-introduced-19-06-2024): Free, Growth 29.99 USD, Pro 99.99 USD al mes.
- [Wakdev, NTAG 424 DNA](https://www.wakdev.com/en/knowledge-base/nfc-chips/nxp-ntag424-dna.html) y [Elechouse](https://www.elechouse.com/product/ntag424-dna-13-56mhz-white-pvc-nfc-card-42x26mm/): SUN anti-clonación, 2.50-5 USD por pieza.
- [eBay, NTAG213 x50](https://www.ebay.de/itm/116812241108): ~4.99 EUR el paquete.
- [StatCounter México](https://gs.statcounter.com/os-market-share/mobile/mexico): Android ~78%, iOS ~22%.
- [ArtsHub, red de falsificación en Italia](https://www.artshub.com.au/news/news/italian-police-uncover-historys-largest-network-of-forged-artworks-2778181/): los falsificados son Banksy, Picasso, Warhol.
- [Renoon, calendario DPP UE](https://www.renoon.com/blog/the-timeline-of-digital-product-passport-regulation-in-eu-espr-from-product-groups-to-rollout-schedule).
