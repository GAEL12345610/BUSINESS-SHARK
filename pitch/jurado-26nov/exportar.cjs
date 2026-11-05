// PDF del deck del jurado (una slide por página) y Lean Canvas en PDF y PNG.
// Uso, desde la raíz del repo: node pitch/jurado-26nov/exportar.cjs
// Necesita Playwright con Chromium. Las capturas de pantalla salen de visuales/.
const { chromium } = require('playwright')
const path = require('node:path')
const A = (f) => path.join(__dirname, f)

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.goto('file://' + A('deck.html'))
  await p.evaluate(() => document.fonts.ready)
  await p.pdf({ path: A('deck.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })

  const c = await b.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 2 })
  await c.goto('file://' + A('lean-canvas.html'))
  await c.evaluate(() => document.fonts.ready)
  await c.pdf({ path: A('lean-canvas.pdf'), width: '11in', height: '8.5in', printBackground: true, preferCSSPageSize: true })
  await c.locator('.hoja').screenshot({ path: path.join(__dirname, '../../visuales/viabilidad/lean-canvas.png') })
  await b.close()
  console.log('listo: deck.pdf, lean-canvas.pdf y visuales/viabilidad/lean-canvas.png')
})()
