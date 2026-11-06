// Saca las dos gráficas del deck del jurado como PNG (para la Chromebook).
// Uso, desde la raíz del repo: node visuales/viabilidad/graficas.cjs
// Necesita Playwright con Chromium. La fuente de verdad es pitch/jurado-26nov/deck.html.
const { chromium } = require('playwright')
const path = require('node:path')
const RAIZ = path.join(__dirname, '../..')
const NOMBRES = ['canales-de-compra-directa.png', 'costo-como-porcentaje-de-ventas.png']

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 })
  await p.goto('file://' + path.join(RAIZ, 'pitch/jurado-26nov/deck.html'))
  await p.evaluate(() => document.fonts.ready)
  for (let i = 0; i < NOMBRES.length; i++) {
    await p.evaluate((i) => {
      const el = document.querySelectorAll('svg.grafica')[i]
      document.querySelectorAll('.slide').forEach((s) => s.classList.toggle('activa', s.contains(el)))
    }, i)
    await p.locator('svg.grafica').nth(i).screenshot({ path: path.join(__dirname, NOMBRES[i]) })
  }
  await b.close()
  console.log('listo: ' + NOMBRES.join(', '))
})()
