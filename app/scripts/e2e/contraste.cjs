// Modo ?para=Nombre y contraste aproximado (WCAG AA: 4.5 texto normal, 3 grande)
// en 8 rutas. Convierte cada color CSS con un canvas (Tailwind 4 devuelve
// color(srgb ...) con opacidad): memoria/color-css-se-convierte-con-canvas.md.
// Aproximado: no reemplaza una auditoría formal ni un lector de pantalla.
// Uso: con pnpm preview corriendo, node app/scripts/e2e/contraste.cjs
const { chromium, devices } = require('playwright')
const B = 'http://localhost:4173'
const ok = (c, m) => { console.log((c ? 'ok: ' : 'FALLA: ') + m); if (!c) process.exitCode = 1 }
;(async () => {
  const b = await chromium.launch()
  const ctx = await b.newContext({ ...devices['iPhone 13'] })
  const p = await ctx.newPage()
  await p.goto(B + '/?salir-demo')
  await p.goto(B + '/recorrido?para=Ana%20Prueba')
  await p.getByText('Hola, Ana.').waitFor()
  await p.goto(B + '/o/7KQ2X')
  await p.getByText(/Demo personalizada con el nombre de Ana Prueba/).waitFor({ timeout: 5000 }).then(() => ok(true, '?para= muestra "demo personalizada"'), () => ok(false, '?para= aviso'))
  ok((await p.getByText(/es una artista ficticia/).count()) === 0, '?para= no dice que la persona es ficticia')
  ok((await p.getByText('Ficticia', { exact: true }).count()) === 0, '?para= sin chip Ficticia')
  await p.goto(B + '/recorrido?para=')

  // Contraste aproximado (WCAG): texto normal < 4.5 o grande < 3
  const rutas = ['/', '/recorrido', '/o/7KQ2X', '/o/7KQ2X/reclamar', '/panel', '/demo', '/entrar', '/a/ejemplo']
  for (const r of rutas) {
    await p.goto(B + r)
    await p.waitForLoadState('networkidle')
    await p.evaluate(() => { document.querySelectorAll('.revela').forEach((e) => e.classList.add('visible')) })
    const malos = await p.evaluate(() => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true })
      const rgba = (s) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 } }
      const mezcla = (f, bg) => ({ r: f.r * f.a + bg.r * (1 - f.a), g: f.g * f.a + bg.g * (1 - f.a), b: f.b * f.a + bg.b * (1 - f.a), a: 1 })
      const fondo = (el) => {
        const capas = []
        for (let e = el; e; e = e.parentElement) {
          const c = rgba(getComputedStyle(e).backgroundColor)
          if (getComputedStyle(e).backgroundImage !== 'none') return null
          if (c.a > 0) { capas.push(c); if (c.a >= 1) break }
        }
        let bg = { r: 255, g: 255, b: 255, a: 1 }
        for (const c of capas.reverse()) bg = mezcla(c, bg)
        return bg
      }
      const L = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b) }
      const out = []
      for (const el of document.querySelectorAll('body *')) {
        const t = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('')
        if (!t || el.closest('[aria-hidden="true"],svg,canvas')) continue
        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || +cs.opacity < 0.5 || el.getClientRects().length === 0) continue
        const bg = fondo(el); if (!bg) continue
        const fg = mezcla(rgba(cs.color), bg)
        const [a, b2] = [L(fg), L(bg)].sort((x, y) => y - x)
        const ratio = (a + 0.05) / (b2 + 0.05)
        const px = parseFloat(cs.fontSize), grande = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700)
        if (ratio < (grande ? 3 : 4.5)) out.push(`${ratio.toFixed(2)} "${t.slice(0, 50)}"`)
      }
      return [...new Set(out)]
    })
    ok(malos.length === 0, `contraste en ${r}${malos.length ? ': ' + malos.slice(0, 6).join(' | ') : ''}`)
  }
  await b.close()
})()
