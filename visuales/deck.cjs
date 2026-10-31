// Arma visuales/Brai-visuales.pptx con los PNG que saca generar.cjs.
// Se abre en PowerPoint, Keynote y Google Slides (Chromebook).
//
// Uso:
//   node visuales/generar.cjs http://localhost:4173     (primero, para tener los PNG)
//   NODE_PATH=<carpeta con pptxgenjs>/node_modules node visuales/deck.cjs
// pptxgenjs NO es dependencia de la app: instálalo aparte con pnpm en otra carpeta.

const pptxgen = require('pptxgenjs')
const path = require('node:path')
const fs = require('node:fs')
const { imageSize } = (() => {
  // Tamaño de un PNG leyendo su cabecera (sin dependencias)
  return {
    imageSize: (f) => {
      const b = fs.readFileSync(f)
      return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
    },
  }
})()

const V = (...p) => path.join(__dirname, ...p)
const SALIDA = V('Brai-visuales.pptx')

// Tema de Brai (brand/BRAND.md). Hex sin '#'.
const THEME = {
  name: 'Brai',
  headFontFace: 'Fraunces',
  bodyFontFace: 'Schibsted Grotesk',
  colors: {
    dk1: '2B2622', // tinta
    lt1: 'F6F1EA', // lienzo
    dk2: '5E6C52', // verde sabio
    lt2: 'E9E1D4', // arena
    accent1: 'A2563D', // terracota botón
    accent2: 'C06E52', // terracota
    accent3: 'C9A24B', // dorado
    accent4: '5E6C52',
    accent5: '8C4932',
    accent6: 'E5DDCF', // línea
    hlink: 'A2563D',
    folHlink: '8C4932',
  },
}
const MONO = 'IBM Plex Mono'
const W = 13.333
const H = 7.5

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE'
pres.author = 'Equipo Brai'
pres.company = 'Brai'
pres.title = 'Brai, visuales de marca y prototipo'
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace }
const C = pres.SchemeColor

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: 'PORTADA',
  background: { color: THEME.colors.dk1 },
  objects: [
    { image: { path: V('logos', 'isotipo-claro.png'), x: 0.8, y: 0.7, w: 0.75, h: 0.75 } },
    {
      placeholder: {
        options: { name: 'title', type: 'title', x: 0.8, y: 2.4, w: 9.5, h: 2.2, fontSize: 54, bold: true, color: C.background1, valign: 'top', margin: 0, align: 'left' },
        text: 'Título',
      },
    },
    {
      placeholder: {
        options: { name: 'body', type: 'body', x: 0.8, y: 4.9, w: 9.5, h: 1.2, fontSize: 18, color: C.background2, valign: 'top', margin: 0, align: 'left' },
        text: 'Subtítulo',
      },
    },
  ],
})

pres.defineSlideMaster({
  title: 'CONTENIDO',
  background: { color: THEME.colors.lt1 },
  margin: [0.5, 0.6, 0.6, 0.6],
  objects: [
    { image: { path: V('logos', 'isotipo-color.png'), x: 0.6, y: 6.92, w: 0.28, h: 0.28 } },
    { text: { text: 'Brai · visuales', options: { x: 0.95, y: 6.9, w: 3, h: 0.32, fontFace: MONO, fontSize: 10, color: C.text2, margin: 0, valign: 'middle' } } },
    {
      placeholder: {
        options: { name: 'etiqueta', type: 'body', x: 0.6, y: 0.45, w: 8, h: 0.3, fontFace: MONO, fontSize: 11, color: C.text2, margin: 0, charSpacing: 2, align: 'left' },
        text: 'ETIQUETA',
      },
    },
    {
      placeholder: {
        options: { name: 'title', type: 'title', x: 0.6, y: 0.78, w: 12.1, h: 0.85, fontSize: 34, bold: true, color: C.text1, margin: 0, valign: 'top', align: 'left' },
        text: 'Título',
      },
    },
  ],
  slideNumber: { x: 12.25, y: 6.9, w: 0.5, h: 0.32, fontFace: MONO, fontSize: 10, color: THEME.colors.dk2, align: 'right' },
})

pres.defineSlideMaster({
  title: 'CIERRE',
  background: { color: THEME.colors.dk1 },
  objects: [
    {
      placeholder: {
        options: { name: 'title', type: 'title', x: 0.8, y: 0.9, w: 11.7, h: 1.4, fontSize: 40, bold: true, color: C.background1, margin: 0, valign: 'top', align: 'left' },
        text: 'Título',
      },
    },
  ],
})

// ---------- Ayudas ----------
let n = 0
const obj = (s) => `${s}-${++n}`

/** Imagen que cabe en una caja sin deformarse; devuelve dónde quedó. */
function imagenEnCaja(slide, archivo, x, y, w, h, alinear = 'center') {
  const { w: iw, h: ih } = imageSize(archivo)
  const k = Math.min(w / iw, h / ih)
  const rw = iw * k
  const rh = ih * k
  const rx = alinear === 'left' ? x : x + (w - rw) / 2
  const ry = y + (h - rh) / 2
  slide.addImage({ path: archivo, x: rx, y: ry, w: rw, h: rh, objectName: obj('imagen'), altText: path.basename(archivo) })
  return { x: rx, y: ry, w: rw, h: rh }
}

/** Celular: marco tinta con la captura adentro. */
function celular(slide, archivo, x, y, alto) {
  const { w: iw, h: ih } = imageSize(archivo)
  const ancho = (alto * iw) / ih
  const borde = 0.09
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: x - borde, y: y - borde, w: ancho + borde * 2, h: alto + borde * 2,
    fill: { color: THEME.colors.dk1 }, line: { color: THEME.colors.dk1 }, rectRadius: 0.22, objectName: obj('marco'),
    shadow: { type: 'outer', color: '2B2622', opacity: 0.18, blur: 12, offset: 4, angle: 90 },
  })
  slide.addImage({ path: archivo, x, y, w: ancho, h: alto, objectName: obj('pantalla'), altText: path.basename(archivo) })
  return ancho + borde * 2
}

function texto(slide, t, opciones) {
  slide.addText(t, { isTextBox: true, margin: 0, color: C.text1, fontSize: 15, valign: 'top', objectName: obj('texto'), ...opciones })
}

function contenido(seccion, etiqueta, titulo) {
  const s = pres.addSlide({ masterName: 'CONTENIDO', sectionTitle: seccion })
  s.addText(etiqueta.toUpperCase(), { placeholder: 'etiqueta' })
  s.addText(titulo, { placeholder: 'title' })
  return s
}

// ---------- 1. Portada ----------
pres.addSection({ title: 'Portada' })
{
  const s = pres.addSlide({ masterName: 'PORTADA', sectionTitle: 'Portada' })
  s.addText('Cada obra sabe\nde dónde viene', { placeholder: 'title' })
  s.addText('Visuales de marca y del prototipo de Brai. 31 de octubre de 2026.', { placeholder: 'body' })
  s.addImage({ path: V('punto', 'punto-tranquilo.png'), x: 10.1, y: 2.9, w: 2.4, h: 2.4 * (960 / 880), objectName: 'punto-portada', altText: 'Punto, la mascota de Brai' })
  s.addNotes('Todas las imágenes de esta presentación están también como PNG en la carpeta visuales/ del repositorio.')
}

// ---------- 2. Marca ----------
pres.addSection({ title: 'Marca' })
{
  const s = contenido('Marca', 'Isotipo', 'El enso: un trazo que casi se cierra')
  const cajas = [
    ['isotipo-color.png', 'FFFFFF', 'Color'],
    ['isotipo-claro.png', THEME.colors.dk1, 'Una tinta, fondo oscuro'],
    ['isotipo-tinta.png', THEME.colors.lt2, 'Una tinta, impresión barata'],
  ]
  cajas.forEach(([f, fondo, nombre], i) => {
    const x = 0.6 + i * 4.1
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.9, w: 3.8, h: 3.3, fill: { color: fondo }, line: { color: THEME.colors.accent6 }, rectRadius: 0.15, objectName: obj('panel') })
    imagenEnCaja(s, V('logos', f), x + 0.9, 2.25, 2, 2)
    texto(s, nombre, { x: x + 0.3, y: 4.55, w: 3.2, h: 0.4, fontSize: 13, align: 'center', color: fondo === THEME.colors.dk1 ? C.background1 : C.text2 })
  })
  texto(s, 'El hueco va siempre a las 2 en punto. El punto dorado lo cierra: es el último gesto, el que verifica. Mínimo 8 mm.', { x: 0.6, y: 5.55, w: 11.5, h: 0.8, fontSize: 16 })
}
{
  const s = contenido('Marca', 'Color', 'Seis colores, un solo acento')
  const colores = [
    ['Terracota', 'C06E52', 'Logo y superficies grandes', '2B2622'],
    ['Terracota botón', 'A2563D', 'Botones, links, texto chico', 'F6F1EA'],
    ['Tinta carbón', '2B2622', 'Texto y fondos oscuros', 'F6F1EA'],
    ['Dorado', 'C9A24B', 'Solo "obra registrada", nunca texto', '2B2622'],
    ['Lienzo', 'F6F1EA', 'Fondos', '2B2622'],
    ['Verde sabio', '5E6C52', 'Texto secundario y etiquetas', 'F6F1EA'],
  ]
  colores.forEach(([nombre, hex, uso, tinta], i) => {
    const col = i % 3
    const fila = Math.floor(i / 3)
    const x = 0.6 + col * 4.1
    const y = 1.9 + fila * 2.35
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.8, h: 2.1, fill: { color: hex }, line: { color: hex === 'F6F1EA' ? 'E5DDCF' : hex }, rectRadius: 0.15, objectName: obj('color') })
    texto(s, [
      { text: nombre, options: { bold: true, fontSize: 17, breakLine: true } },
      { text: `#${hex}`, options: { fontFace: MONO, fontSize: 13, breakLine: true } },
    ], { x: x + 0.3, y: y + 0.25, w: 3.2, h: 0.8, color: tinta })
    texto(s, uso, { x: x + 0.3, y: y + 1.35, w: 3.2, h: 0.5, fontSize: 13, color: tinta })
  })
}
{
  const s = contenido('Marca', 'Tipografía', 'Tres voces')
  const filas = [
    ['GALERÍA · FRAUNCES', 'Obras con historia', { fontFace: 'Fraunces', fontSize: 40, bold: true }, 'Títulos y nombres de obra'],
    ['TALLER · SCHIBSTED GROTESK', 'Cada obra lleva su historia, su artista y su dueño.', { fontSize: 22 }, 'Texto e interfaz'],
    ['REGISTRO · IBM PLEX MONO', 'BRAI-0007 · Óleo sobre tela · 60 × 80 cm · 2026', { fontFace: MONO, fontSize: 20 }, 'Registro, fechas, ficha y códigos'],
  ]
  filas.forEach(([etq, muestra, estilo, uso], i) => {
    const y = 1.95 + i * 1.55
    s.addShape(pres.shapes.LINE, { x: 0.6, y, w: 12.1, h: 0, line: { color: THEME.colors.accent6, width: 1 }, objectName: obj('linea') })
    texto(s, etq, { x: 0.6, y: y + 0.25, w: 3.4, h: 0.3, fontFace: MONO, fontSize: 11, color: C.text2 })
    texto(s, uso, { x: 0.6, y: y + 0.6, w: 3.4, h: 0.5, fontSize: 13, color: C.text2 })
    texto(s, muestra, { x: 4.2, y: y + 0.2, w: 8.5, h: 1.15, valign: 'middle', ...estilo })
  })
}
{
  const s = contenido('Marca', 'Mascota', 'Punto, el sello que todo lo recuerda')
  const estados = [
    ['punto-tranquilo.png', 'Tranquilo', 'Parpadea y te sigue con los ojos'],
    ['punto-toque.png', 'Toque', 'Al tocarlo salen las ondas del NFC'],
    ['punto-feliz.png', 'Feliz', 'Cuando registras una obra'],
    ['punto-duda.png', 'Duda', 'Página no encontrada'],
  ]
  estados.forEach(([f, nombre, cuando], i) => {
    const x = 0.6 + i * 3.1
    imagenEnCaja(s, V('punto', f), x + 0.35, 1.85, 2.2, 2.3)
    texto(s, nombre, { x, y: 4.3, w: 2.9, h: 0.4, bold: true, fontSize: 17, align: 'center' })
    texto(s, cuando, { x, y: 4.72, w: 2.9, h: 0.6, fontSize: 13, align: 'center', color: C.text2 })
  })
  texto(s, 'Hecho del producto, como el muñeco de Michelin está hecho de llantas: es el sello que va detrás del cuadro. Su contorno es el logo real y su chapita es el punto dorado. Nunca interrumpe y nunca sale en la página de la obra.',
    { x: 0.6, y: 5.55, w: 12.1, h: 0.9, fontSize: 15 })
}
{
  const s = contenido('Marca', 'Piezas físicas', 'Lo que toca el comprador')
  imagenEnCaja(s, V('imprimir', 'piezas-BRAI-0001.png'), 0.6, 1.8, 7.6, 4.85, 'left')
  texto(s, [
    { text: 'Tarjeta de dueño. ', options: { bold: true } },
    { text: '85 × 55 mm, firmada a mano, con el código bajo raspadita.', options: { breakLine: true } },
    { text: ' ', options: { breakLine: true, fontSize: 8 } },
    { text: 'Sello NFC. ', options: { bold: true } },
    { text: '30 mm, detrás del cuadro. Se rompe si lo despegan.', options: { breakLine: true } },
    { text: ' ', options: { breakLine: true, fontSize: 8 } },
    { text: 'QR. ', options: { bold: true } },
    { text: 'Junto al sello, para celulares sin NFC.' },
  ], { x: 8.6, y: 2.0, w: 4.1, h: 3.2, fontSize: 15 })
  texto(s, 'Para imprimir en tamaño real: visuales/imprimir/piezas-BRAI-0001-carta.pdf', { x: 8.6, y: 5.6, w: 4.1, h: 0.7, fontFace: MONO, fontSize: 10, color: C.text2 })
}

// ---------- 3. Prototipo ----------
pres.addSection({ title: 'Prototipo' })
{
  const s = contenido('Prototipo', 'Landing', 'Vendiste tu obra. ¿Sabes dónde está hoy?')
  imagenEnCaja(s, V('pantallas', 'escritorio', 'landing.png'), 0.6, 1.85, 8.6, 4.8, 'left')
  celular(s, V('pantallas', 'celular', 'landing.png'), 10.2, 1.85, 4.75)
}
{
  const s = contenido('Prototipo', 'Lo que ve el comprador', 'La página de la obra, como una cédula de museo')
  const pantallas = [
    ['obra.png', 'Toca el sello y se abre la obra'],
    ['reclamar.png', 'Raspa su código y la reclama'],
    ['artista.png', 'Ve las demás obras del artista'],
  ]
  pantallas.forEach(([f, pie], i) => {
    const x = 0.75 + i * 3.0
    celular(s, V('pantallas', 'celular', f), x, 1.85, 4.3)
    texto(s, pie, { x: x - 0.35, y: 6.3, w: 2.7, h: 0.45, fontSize: 12, align: 'center', color: C.text2 })
  })
  texto(s, 'Del lado del comprador manda el artista: su nombre, su color, su historia. Brai solo firma abajo con el sello Registro Brai.', { x: 9.75, y: 2.1, w: 3.0, h: 2.8, fontSize: 15 })
}
{
  const s = contenido('Prototipo', 'Lo que ve el artista', 'Tu panel te dice quién tiene cada obra')
  celular(s, V('pantallas', 'celular', 'panel.png'), 0.9, 1.85, 4.75)
  imagenEnCaja(s, V('pantallas', 'escritorio', 'panel.png'), 4.0, 1.85, 5.6, 3.5)
  texto(s, [
    { text: 'Quién tiene tu obra, con su correo.', options: { bullet: true, breakLine: true } },
    { text: 'Avisar a tus coleccionistas de tu obra nueva.', options: { bullet: true, breakLine: true } },
    { text: 'Registrar una obra con foto.', options: { bullet: true } },
  ], { x: 9.95, y: 2.0, w: 2.8, h: 2.6, fontSize: 15, paraSpaceAfter: 8 })
  texto(s, 'En la demo, si alguien reclama una obra, su correo aparece aquí al momento.', { x: 4.0, y: 5.6, w: 8.7, h: 0.6, fontSize: 15, bold: true })
}
{
  const s = contenido('Prototipo', 'Para la reunión con un artista', 'Brai en 5 minutos, con su nombre')
  celular(s, V('pantallas', 'celular', 'recorrido.png'), 0.9, 1.85, 4.75)
  const pasos = ['Tu obra lleva un sello', 'Tu comprador la pone a su nombre', 'Tú sabes quién la tiene', 'Cuánto cuesta, con tus números', 'Queremos que seas fundador']
  pasos.forEach((p, i) => {
    const y = 1.95 + i * 0.72
    s.addShape(pres.shapes.OVAL, { x: 4.0, y, w: 0.46, h: 0.46, fill: { color: THEME.colors.accent1 }, line: { color: THEME.colors.accent1 }, objectName: obj('numero') })
    texto(s, String(i + 1), { x: 4.0, y, w: 0.46, h: 0.46, align: 'center', valign: 'middle', color: C.background1, bold: true, fontSize: 14 })
    texto(s, p, { x: 4.65, y, w: 7.5, h: 0.46, valign: 'middle', fontSize: 17 })
  })
  texto(s, [
    { text: 'Link: ', options: { bold: true } },
    { text: '/recorrido?para=Nombre del artista', options: { fontFace: MONO } },
    { text: '. El nombre vive solo en esa pestaña: no se publica.', options: {} },
  ], { x: 4.0, y: 5.75, w: 8.7, h: 0.6, fontSize: 14 })
}
{
  const s = contenido('Prototipo', 'Para compartir', 'Lo que se ve en WhatsApp y en redes')
  const caja = imagenEnCaja(s, V('compartir', 'imagen-para-compartir.png'), 0.6, 1.95, 7.6, 4.0, 'left')
  texto(s, 'Imagen al pegar el link (1200 × 630)', { x: 0.6, y: caja.y + caja.h + 0.15, w: 7.6, h: 0.35, fontSize: 12, color: C.text2 })
  celular(s, V('clips', 'escena-sello-cuadro.png'), 9.4, 1.85, 4.6)
  texto(s, 'Clip vertical de 10 s para el infomercial o un Reel', { x: 8.7, y: 6.55, w: 3.9, h: 0.35, fontSize: 12, align: 'center', color: C.text2 })
}

// ---------- 4. Cierre ----------
pres.addSection({ title: 'Cierre' })
{
  const s = pres.addSlide({ masterName: 'CIERRE', sectionTitle: 'Cierre' })
  s.addText('Todo vive en el mismo link de Vercel', { placeholder: 'title' })
  const rutas = [
    ['/', 'Landing'],
    ['/o/7KQ2X', 'Página de una obra (código de dueño 4K7P-9QX2)'],
    ['/panel', 'Panel del artista'],
    ['/recorrido?para=Nombre', 'Recorrido de 5 minutos'],
    ['/marca', 'Kit de marca y Punto'],
    ['/imprimir/7KQ2X', 'Piezas en tamaño real'],
  ]
  rutas.forEach(([r, q], i) => {
    const y = 2.6 + i * 0.6
    texto(s, r, { x: 0.8, y, w: 4.4, h: 0.45, fontFace: MONO, fontSize: 16, color: C.accent3 })
    texto(s, q, { x: 5.3, y, w: 7.2, h: 0.45, fontSize: 16, color: C.background1 })
  })
  s.addImage({ path: V('punto', 'punto-feliz.png'), x: 11.1, y: 5.3, w: 1.5, h: 1.5 * (960 / 880), objectName: 'punto-cierre', altText: 'Punto feliz' })
}

;(async () => {
  await pres.writeFile({ fileName: SALIDA })
  const tema = process.env.APLICAR_TEMA
  if (tema) {
    const { applyTheme } = require(tema)
    await applyTheme(SALIDA, THEME)
  }
  console.log('listo:', path.relative(process.cwd(), SALIDA))
})()
