// Exporta TODOS los visuales de Brai a PNG, PDF y GIF (formatos que abre una
// Chromebook sin problema). Lee la app real, así que siempre sale lo vigente.
//
// Uso (necesita Playwright con Chromium y ffmpeg):
//   cd app && pnpm build && pnpm preview          (deja corriendo, puerto 4173)
//   node visuales/generar.cjs http://localhost:4173
// Después: node visuales/deck.cjs  (arma la presentación PPTX con estos PNG)

const { chromium } = require('playwright')
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const BASE = process.argv[2] || 'http://localhost:4173'
const AQUI = __dirname
const RAIZ = path.join(AQUI, '..')
const APP = path.join(RAIZ, 'app')
// Las fuentes van incrustadas: una página hecha con setContent no puede leer archivos del disco.
const fuente = (rel) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(APP, 'node_modules', rel)).toString('base64')
const dir = (d) => {
  const p = path.join(AQUI, d)
  fs.mkdirSync(p, { recursive: true })
  return p
}

const RUTAS = [
  ['landing', '/'],
  ['obra', '/o/7KQ2X'],
  ['reclamar', '/o/7KQ2X/reclamar'],
  ['artista', '/a/ejemplo'],
  ['panel', '/panel'],
  ['recorrido', '/recorrido'],
  ['marca', '/marca'],
]

async function revelarTodo(p) {
  const alto = await p.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alto; y += 600) {
    await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y)
    await p.waitForTimeout(40)
  }
  await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await p.waitForTimeout(500)
}

;(async () => {
  const b = await chromium.launch()
  const listo = []

  // 1. Logos con fondo transparente
  {
    const d = dir('logos')
    const p = await b.newPage({ viewport: { width: 1024, height: 1024 } })
    for (const v of ['', '_claro', '_tinta']) {
      const svg = fs.readFileSync(path.join(RAIZ, 'brand', `isotipo${v}.svg`), 'utf8')
      await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', '<svg width="1024" height="1024" ')}</body></html>`)
      const nombre = { '': 'color', _claro: 'claro', _tinta: 'tinta' }[v]
      await p.locator('svg').screenshot({ path: path.join(d, `isotipo-${nombre}.png`), omitBackground: true })
    }
    const svg = fs.readFileSync(path.join(RAIZ, 'brand', 'isotipo.svg'), 'utf8')
    const svgClaro = fs.readFileSync(path.join(RAIZ, 'brand', 'isotipo_claro.svg'), 'utf8')
    const lockup = (s, color, fondo) => `<html><head><style>
      @font-face{font-family:F;src:url(${fuente('@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2')});font-weight:100 900}
      body{margin:0;background:${fondo}} .l{display:inline-flex;align-items:center;gap:40px;padding:60px 80px;font-family:F;font-weight:600;font-size:200px;color:${color};letter-spacing:-4px;font-optical-sizing:auto}
      </style></head><body><div class="l">${s.replace('<svg ', '<svg width="210" height="210" ')}<span>Brai</span></div></body></html>`
    await p.setViewportSize({ width: 1100, height: 400 })
    for (const [nombre, s, color, fondo, transparente] of [
      ['logo-horizontal', svg, '#2B2622', 'transparent', true],
      ['logo-horizontal-fondo-lienzo', svg, '#2B2622', '#F6F1EA', false],
      ['logo-horizontal-fondo-oscuro', svgClaro, '#F6F1EA', '#2B2622', false],
    ]) {
      await p.setContent(lockup(s, color, fondo))
      await p.evaluate(() => document.fonts.ready)
      await p.locator('.l').screenshot({ path: path.join(d, `${nombre}.png`), omitBackground: transparente })
    }
    await p.close()
    listo.push('logos')
  }

  // 2. Punto, paleta, tipografía y kit completo, desde /marca
  {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 8, reducedMotion: 'reduce' })
    const p = await ctx.newPage()
    await p.goto(BASE + '/marca')
    await revelarTodo(p)
    const dp = dir('punto')
    const seccionPunto = p.locator('section', { hasText: 'Punto, el sello que todo lo recuerda' })
    await p.evaluate(() => {
      document.documentElement.style.background = 'transparent'
      document.body.style.background = 'transparent'
    })
    const tarjetas = seccionPunto.locator('li')
    const nombres = ['tranquilo', 'toque', 'feliz', 'duda']
    for (let i = 0; i < 4; i++) {
      await tarjetas.nth(i).evaluate((el) => (el.style.background = 'transparent'))
      await tarjetas.nth(i).locator('svg').first().screenshot({ path: path.join(dp, `punto-${nombres[i]}.png`), omitBackground: true })
    }
    await ctx.close()

    const ctx2 = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
    const p2 = await ctx2.newPage()
    await p2.goto(BASE + '/marca')
    await revelarTodo(p2)
    const dm = dir('marca')
    await p2.locator('section', { hasText: 'Seis colores, un solo acento' }).screenshot({ path: path.join(dm, 'paleta.png') })
    await p2.locator('section', { hasText: 'Tres voces.' }).screenshot({ path: path.join(dm, 'tipografia.png') })
    await p2.locator('section', { hasText: 'Hablamos como el artista' }).screenshot({ path: path.join(dm, 'voz.png') })
    await p2.locator('section', { hasText: 'Lo que toca el comprador' }).screenshot({ path: path.join(dm, 'piezas-fisicas.png') })
    await p2.screenshot({ path: path.join(dm, 'kit-de-marca-completo.png'), fullPage: true })
    await ctx2.close()
    listo.push('punto', 'marca')
  }

  // 3. Pantallas: celular (390 px) y escritorio (1440 px), primera pantalla y página completa
  for (const [tipo, vw, vh, dpr] of [['celular', 390, 844, 2], ['escritorio', 1440, 900, 1]]) {
    const d = dir(`pantallas/${tipo}`)
    const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: dpr, reducedMotion: 'reduce' })
    const p = await ctx.newPage()
    for (const [nombre, ruta] of RUTAS) {
      await p.goto(BASE + ruta)
      await revelarTodo(p)
      await p.screenshot({ path: path.join(d, `${nombre}.png`) })
      await p.screenshot({ path: path.join(d, `${nombre}-completa.png`), fullPage: true })
    }
    await ctx.close()
  }
  // Demo de José Luis (se entra por /jose-luis para activar su modo)
  for (const [tipo, vw, vh, dpr] of [['celular', 390, 844, 2], ['escritorio', 1440, 900, 1]]) {
    const d = dir(`pantallas/${tipo}`)
    const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: dpr, reducedMotion: 'reduce' })
    const p = await ctx.newPage()
    await p.goto(BASE + '/jose-luis')
    await p.waitForTimeout(500)
    for (const [nombre, ruta] of [['jose-luis-recorrido', '/recorrido'], ['jose-luis-obra', '/o/TQ4RC'], ['jose-luis-artista', '/a/jose-luis-malo']]) {
      await p.goto(BASE + ruta)
      await revelarTodo(p)
      await p.screenshot({ path: path.join(d, `${nombre}.png`) })
      await p.screenshot({ path: path.join(d, `${nombre}-completa.png`), fullPage: true })
    }
    await ctx.close()
  }
  listo.push('pantallas')

  // 4. Piezas para imprimir: PDF tamaño carta y PNG
  {
    const d = dir('imprimir')
    const ctx = await b.newContext({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 3, reducedMotion: 'reduce' })
    const p = await ctx.newPage()
    await p.goto(BASE + '/imprimir/7KQ2X')
    await p.waitForTimeout(800)
    await p.emulateMedia({ media: 'print' })
    await p.pdf({ path: path.join(d, 'piezas-BRAI-0001-carta.pdf'), format: 'Letter', printBackground: true })
    // Solo el área con piezas, sin la hoja en blanco de abajo
    const caja = await p.evaluate(() => {
      const els = [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().height > 0)
      const b = els.reduce((m, e) => Math.max(m, e.getBoundingClientRect().bottom + scrollY), 0)
      return Math.ceil(b + 24)
    })
    await p.screenshot({ path: path.join(d, 'piezas-BRAI-0001.png'), clip: { x: 0, y: 0, width: 816, height: Math.min(caja, 1056) } })
    await ctx.close()
    listo.push('imprimir')
  }

  // 5. Obras de ejemplo en PNG
  {
    const d = dir('obras-ejemplo')
    const p = await b.newPage({ viewport: { width: 900, height: 1200 } })
    const obras = path.join(APP, 'public', 'obras')
    // Solo archivos .svg (las subcarpetas, como jose-luis/, se recorren aparte)
    const svgs = fs.readdirSync(obras, { recursive: true }).filter((f) => String(f).endsWith('.svg'))
    for (const f of svgs) {
      await p.goto(`${BASE}/obras/${String(f).split(path.sep).join('/')}`)
      await p.screenshot({ path: path.join(d, String(f).split(path.sep).join('-').replace('.svg', '.png')) })
    }
    await p.close()
    listo.push('obras-ejemplo')
  }

  await b.close()

  // 6. Imagen para compartir y GIF del clip
  {
    const d = dir('compartir')
    fs.copyFileSync(path.join(APP, 'public', 'og.png'), path.join(d, 'imagen-para-compartir.png'))
    fs.copyFileSync(path.join(APP, 'public', 'apple-touch-icon.png'), path.join(d, 'icono-celular.png'))
    const mp4 = path.join(RAIZ, 'pitch', 'clips', 'escena-sello-9x16.mp4')
    if (fs.existsSync(mp4)) {
      const gif = path.join(dir('clips'), 'escena-sello.gif')
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', mp4, '-vf',
        'fps=12,scale=360:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer', gif])
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', '6', '-i', mp4, '-frames:v', '1', path.join(dir('clips'), 'escena-sello-cuadro.png')])
    }
    listo.push('compartir', 'clips')
  }

  console.log('listo:', listo.join(', '))
})().catch((e) => {
  console.error('FALLO:', e.message)
  process.exit(1)
})
