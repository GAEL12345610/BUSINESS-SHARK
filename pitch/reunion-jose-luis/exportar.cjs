// Saca los PDF y las capturas del paquete de reunión.
// Uso (desde la raíz del repo, con la app corriendo en otra terminal):
//   cd app && pnpm build && pnpm preview        (deja http://localhost:4173)
//   node pitch/reunion-jose-luis/exportar.cjs http://localhost:4173
// Necesita Playwright con Chromium (el mismo que usa visuales/generar.cjs).
const { chromium, devices } = require('playwright')
const path = require('node:path')
const AQUI = __dirname
const APP = process.argv[2] || 'http://localhost:4173'

;(async () => {
  const b = await chromium.launch()

  // Capturas de la demo genérica (Lucía Arce, ficticia) para el deck
  const tel = await b.newContext({ ...devices['iPhone 13'] })
  const p = await tel.newPage()
  await p.goto(`${APP}/?salir-demo`)
  await p.evaluate(() => localStorage.clear())
  await p.goto(`${APP}/o/7KQ2X`)
  await p.waitForLoadState('networkidle')
  await p.screenshot({ path: path.join(AQUI, 'img/obra.png') })
  // reclamo simulado con correo de prueba, para que el panel enseñe el momento clave
  await p.goto(`${APP}/o/7KQ2X/reclamar?codigo=4K7P-9QX2`)
  await p.getByRole('button', { name: 'Simular reclamo' }).click()
  await p.goto(`${APP}/panel`)
  await p.getByText('comprador.demo@example.com').first().waitFor()
  await p.getByRole('heading', { name: 'Quién tiene tu obra' }).evaluate((e) => window.scrollTo({ top: e.getBoundingClientRect().top + scrollY - 24, behavior: 'instant' }))
  await p.screenshot({ path: path.join(AQUI, 'img/panel.png') })
  await p.evaluate(() => localStorage.clear())
  await tel.close()

  // PDF del one-pager (carta) y del deck (una slide por página)
  const pc = await b.newPage()
  await pc.goto('file://' + path.join(AQUI, 'one-pager.html'))
  await pc.evaluate(() => document.fonts.ready)
  await pc.pdf({ path: path.join(AQUI, 'one-pager.pdf'), format: 'Letter', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
  await pc.setViewportSize({ width: 1920, height: 1080 })
  await pc.goto('file://' + path.join(AQUI, 'deck.html'))
  await pc.evaluate(() => document.fonts.ready)
  await pc.pdf({ path: path.join(AQUI, 'deck.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
  await b.close()
  console.log('listo: img/obra.png, img/panel.png, one-pager.pdf, deck.pdf')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
