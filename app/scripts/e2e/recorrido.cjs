// Recorrido de la demo en un iPhone 13 emulado: aviso de DEMO, CTA, raspadita
// con teclado, reclamo con correo real rechazado y con @example.com simulado,
// panel, /entrar, /demo, reiniciar, modo José Luis, sin scroll horizontal y
// cero peticiones a otros dominios. NO es parte de pnpm test (necesita Playwright).
// Uso: cd app && pnpm build && pnpm preview, y en otra terminal:
//   node app/scripts/e2e/recorrido.cjs <carpeta-para-capturas>
const { chromium, devices } = require('playwright')
const B = 'http://localhost:4173'
const OUT = process.argv[2]
const ve = (l) => l.first().waitFor({ state: 'visible', timeout: 6000 }).then(() => true, () => false)
const ok = (c, m) => { if (!c) { console.log('FALLA:', m); process.exitCode = 1 } else console.log('ok:', m) }
;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const page = await ctx.newPage()
  const externas = [], errores = []
  page.on('request', (r) => { const u = new URL(r.url()); if (u.host !== 'localhost:4173' && !u.protocol.startsWith('data')) externas.push(r.url()) })
  page.on('pageerror', (e) => errores.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errores.push(m.text()))
  page.on('dialog', (d) => d.accept())

  await page.goto(B + '/')
  ok(await page.getByText('Prototipo con personas, obras y correos ficticios').first().isVisible(), 'aviso DEMO visible en portada')
  await page.screenshot({ path: OUT + '/01-portada.png' })
  ok(await page.getByRole('link', { name: /Recorrer la demo en 5 minutos/ }).first().isVisible(), 'CTA principal al recorrido')
  ok((await page.getByText('Entrar', { exact: true }).count()) === 0, 'no hay botón Entrar')

  await page.getByRole('link', { name: /Recorrer la demo en 5 minutos/ }).first().click()
  await page.waitForURL('**/recorrido')
  ok(await ve(page.getByText('Paso 1 de 5')), 'recorrido abre')
  // raspadita con teclado
  const canvas = page.getByRole('button', { name: /Raspadita/ })
  await canvas.focus(); await page.keyboard.press('Enter')
  ok(await page.getByRole('link', { name: /con este código/ }).isVisible(), 'raspadita se revela con Enter')
  ok(await page.getByText('Precio publicado, sin validar').count() === 1 && await page.getByText('Alternativa en prueba').count() === 1, 'estado del precio en calculadora')
  ok((await page.getByText(/Se paga con/).count()) === 0, 'sin "Se paga con"')
  await page.getByText('Alternativa en prueba').scrollIntoViewIfNeeded()
  await page.screenshot({ path: OUT + '/02-calculadora.png' })

  await page.getByRole('link', { name: /con este código/ }).click()
  await page.waitForURL('**/reclamar**')
  const correo = page.getByLabel('Correo de prueba')
  ok((await correo.inputValue()).endsWith('@example.com'), 'correo de prueba ya escrito')
  await correo.fill('persona.real@gmail.com')
  await page.getByRole('button', { name: 'Simular reclamo' }).click()
  ok(await page.getByRole('alert').filter({ hasText: 'example.com' }).isVisible(), 'correo real rechazado')
  await page.screenshot({ path: OUT + '/03-reclamar-rechazo.png' })
  await correo.fill('ana.lopez@example.com')
  await page.getByRole('button', { name: 'Simular reclamo' }).click()
  ok(await page.getByText(/No se registró nada en ningún servidor/).isVisible(), 'éxito dice simulación')
  await page.screenshot({ path: OUT + '/04-reclamo-simulado.png' })

  await page.getByRole('link', { name: 'Ver lo que ve el artista' }).click()
  await page.waitForURL('**/panel')
  ok(await ve(page.getByText('ana.lopez@example.com')), 'el panel muestra el correo de prueba')
  await page.getByRole('button', { name: /Avisarles/ }).click()
  await page.getByRole('button', { name: 'Simular envío' }).click()
  ok(await page.getByText(/no se mandó ningún correo/).isVisible(), 'aviso a coleccionistas dice simulación')
  await page.screenshot({ path: OUT + '/05-panel.png', fullPage: false })

  await page.goto(B + '/o/7KQ2X')
  ok(await page.getByText(/artista ficticia/).first().isVisible(), 'obra dice artista ficticia')
  ok(await page.getByText(/huella de muestra/).count() === 1, 'huella marcada como muestra')
  await page.screenshot({ path: OUT + '/06-obra.png' })

  await page.goto(B + '/entrar')
  ok(await page.getByText('Todavía no hay cuentas.').isVisible(), '/entrar dice la verdad')
  await page.goto(B + '/demo')
  ok(await page.getByText('Lo que todavía no existe').isVisible(), '/demo abre')
  await page.screenshot({ path: OUT + '/07-demo.png', fullPage: true })
  await page.goto(B + '/privacidad')
  ok(await page.getByText(/sin servidor/).isVisible(), 'privacidad honesta')

  // reiniciar desde el aviso
  await page.goto(B + '/panel')
  await page.getByRole('button', { name: 'Reiniciar demo' }).first().click()
  await page.waitForLoadState('load')
  ok((await page.getByText('ana.lopez@example.com').count()) === 0, 'Reiniciar demo borra el reclamo')

  // modo José Luis
  await page.goto(B + '/jose-luis')
  await page.waitForURL('**/recorrido')
  ok(await page.getByText(/sin su revisión ni aprobación/).isVisible(), 'modo José Luis avisa que no lo aprobó')
  await page.goto(B + '/o/TQ4RC')
  await page.screenshot({ path: OUT + '/08-jose-luis-obra.png' })
  await page.goto(B + '/?salir-demo')

  // sin scroll horizontal en 390 px
  for (const r of ['/', '/recorrido', '/o/7KQ2X', '/panel', '/demo', '/imprimir/7KQ2X']) {
    await page.goto(B + r)
    const ancho = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    ok(ancho <= 0, `sin scroll horizontal en ${r} (${ancho})`)
  }
  ok(externas.length === 0, 'cero peticiones a otros dominios: ' + externas.slice(0, 5).join(', '))
  ok(errores.length === 0, 'cero errores de consola: ' + errores.slice(0, 5).join(' | '))
  await browser.close()
})()
