// Genera public/og.png (1200x630, para WhatsApp y redes) y public/apple-touch-icon.png.
// Uso (necesita Playwright con Chromium): node scripts/og/generar.cjs
// Si cambias la plantilla, vuelve a correrlo y sube las dos imágenes.
const { chromium } = require('playwright')
const path = require('node:path')
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
  await p.goto('file://' + path.join(__dirname, 'plantilla.html'))
  await p.evaluate(() => document.fonts.ready)
  await p.screenshot({ path: path.join(__dirname, '../../public/og.png') })
  await p.setViewportSize({ width: 180, height: 180 })
  await p.goto('file://' + path.join(__dirname, 'icono.html'))
  await p.screenshot({ path: path.join(__dirname, '../../public/apple-touch-icon.png') })
  await b.close()
  console.log('listo: public/og.png y public/apple-touch-icon.png')
})()
