// PDF del deck del jurado (una slide por página). Uso, desde la raíz del repo:
//   node pitch/jurado-26nov/exportar.cjs
// Necesita Playwright con Chromium. Las capturas de pantalla salen de visuales/.
const { chromium } = require('playwright')
const path = require('node:path')
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.goto('file://' + path.join(__dirname, 'deck.html'))
  await p.evaluate(() => document.fonts.ready)
  await p.pdf({ path: path.join(__dirname, 'deck.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
  await b.close()
  console.log('listo: pitch/jurado-26nov/deck.pdf')
})()
