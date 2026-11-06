// Animatic del infomercial: una tarjeta por escena de pitch/infomercial_guion.md
// (qué se graba, qué se dice, qué texto sale), con capturas reales de la demo y el
// clip del sello. Es una GUÍA PARA GRABAR, no el infomercial: el video final lo
// graba y edita el equipo (docs/CONCURSO.md).
//
// Uso (necesita Playwright, ffmpeg y la demo corriendo en otra terminal):
//   cd app && pnpm build && pnpm preview
//   node pitch/clips/animatic.cjs http://localhost:4173
// Sale pitch/clips/animatic-infomercial.mp4 (1920 × 1080, con el .srt como pista).
const { chromium, devices } = require('playwright')
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const APP = process.argv[2] || 'http://localhost:4173'
const RAIZ = path.join(__dirname, '../..')
const TMP = path.join(__dirname, 'video', 'animatic')
fs.mkdirSync(TMP, { recursive: true })
const fuentes = path.join(RAIZ, 'pitch/reunion-jose-luis/fuentes')
const url = (p) => 'file://' + path.join(RAIZ, p)

// Tiempos, tomas, voz y texto en pantalla: copiados de pitch/infomercial_guion.md.
// Si cambia el guion, se cambia aquí y se vuelve a generar.
const ESCENAS = [
  { n: 1, ini: 0, fin: 5, toma: 'Primerísimo plano: una mano acerca un celular a la parte de atrás de un cuadro. El celular vibra. Corte a negro.', voz: '', pantalla: '' },
  { n: 2, ini: 5, fin: 12, toma: 'Manos del artista terminando un cuadro: última pincelada, firma en la esquina. Luz de tarde.', voz: 'Pinté este cuadro durante tres meses.', pantalla: 'Dramatización', nota: 'La voz es de un integrante actuando de artista: rotularlo como dramatización.' },
  { n: 3, ini: 12, fin: 20, toma: 'Las mismas manos envuelven el cuadro y lo entregan en una puerta. La puerta se cierra. Plano quieto, 1 segundo.', voz: 'Lo vendí. Y nunca volví a saber de él.', pantalla: '¿Sabes dónde está tu obra hoy?' },
  { n: 4, ini: 20, fin: 28, toma: 'Reverso del cuadro, sobre el bastidor. Una mano pega el sello redondo y el QR al lado.', voz: 'Ahora cada obra lleva un sello.', pantalla: 'Un sello detrás de cada obra' },
  { n: 5, ini: 28, fin: 38, toma: 'Alguien acerca su celular al cuadro colgado y se abre la página de la obra. Grabación de pantalla real.', voz: 'Acercas tu celular y la obra te cuenta su historia.', pantalla: 'Registrada por el artista', clip: true },
  { n: 6, ini: 38, fin: 50, toma: 'La tarjeta de dueño firmada. Una moneda raspa el código. Se teclea y aparece la pantalla de obra reclamada.', voz: 'Raspas tu tarjeta, y la obra queda a tu nombre.', pantalla: '', captura: 'reclamo.png' },
  { n: 7, ini: 50, fin: 58, toma: 'La línea de tiempo de la obra en pantalla. Corte a las manos del artista limpiando un pincel.', voz: 'Y quien la pintó sabe quién la tiene.', pantalla: 'Registro de propiedad y procedencia', captura: 'linea.png' },
  { n: 8, ini: 58, fin: 68, toma: 'Un integrante acerca un iPhone al sello (abre por NFC) y luego un Android apunta al QR (abre igual).', voz: '', pantalla: 'Con NFC o con QR. Cualquier celular.', qr: true },
  { n: 9, ini: 68, fin: 75, toma: 'Fondo lienzo. Aparece el isotipo; el punto dorado cierra el círculo. Debajo, Brai y la dirección web.', voz: 'Brai. Cada obra sabe de dónde viene.', pantalla: 'Prototipo de estudiantes · braiart.vercel.app', fin9: true },
]

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
const CSS = `
@font-face{font-family:Fraunces;src:url(file://${fuentes}/fraunces-latin-opsz-normal.woff2)}
@font-face{font-family:Schibsted;src:url(file://${fuentes}/schibsted-grotesk-latin-wght-normal.woff2);font-weight:400 900}
@font-face{font-family:Plex;src:url(file://${fuentes}/ibm-plex-mono-latin-400-normal.woff2)}
*{box-sizing:border-box}body{margin:0;width:1920px;height:1080px;background:#F6F1EA;color:#2B2622;font-family:Schibsted,sans-serif;overflow:hidden;position:relative}
.tag{position:absolute;top:56px;left:80px;font:22px Plex,monospace;letter-spacing:.12em;background:#2B2622;color:#F6F1EA;padding:8px 16px;border-radius:6px}
.tag b{background:#C9A24B;color:#2B2622;padding:0 8px;margin-right:10px;border-radius:3px}
.tiempo{position:absolute;top:60px;right:80px;font:26px Plex,monospace;color:#5E6C52}
.izq{position:absolute;left:80px;top:180px;width:840px}
.k{font:22px Plex,monospace;letter-spacing:.14em;text-transform:uppercase;color:#5E6C52;margin:0 0 12px}
h1{font:600 92px/1 Fraunces,Georgia,serif;margin:0 0 36px;color:#A2563D}
.toma{font-size:38px;line-height:1.35;margin:0 0 40px}
.pant{font:600 44px/1.2 Fraunces,Georgia,serif;margin:0}
.nota{font-size:26px;color:#7A3F2B;margin-top:28px}
.sub{position:absolute;left:0;right:0;bottom:70px;text-align:center}
.sub span{display:inline-block;background:rgba(43,38,34,.92);color:#F6F1EA;font:500 46px/1.3 Schibsted,sans-serif;padding:14px 32px;border-radius:10px;max-width:1500px}
.tel{position:absolute;right:170px;top:120px;width:400px;border:14px solid #2B2622;border-radius:56px;overflow:hidden;background:#2B2622}
.tel img{display:block;width:100%}
.qr{position:absolute;right:240px;top:230px;width:420px;height:420px;background:#fff;padding:20px;border-radius:16px}
.fin{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px}
.fin img{width:220px}.fin p{font:600 120px Fraunces,Georgia,serif;margin:0}
`
function html(e) {
  if (e.fin9)
    return `<div class="tag"><b>ANIMATIC</b>guía para grabar, no es el infomercial</div><div class="tiempo">Escena 9 · ${mmss(e.ini)} a ${mmss(e.fin)}</div><div class="fin"><img src="${url('brand/isotipo.svg')}"><p>Brai</p><div class="k" style="font-size:28px">${e.pantalla}</div></div><div class="sub"><span>${e.voz}</span></div>`
  const derecha = e.captura
    ? `<div class="tel"><img src="file://${path.join(TMP, e.captura)}"></div>`
    : e.qr
      ? `<img class="qr" src="${url('pitch/jurado-26nov/qr-demo.svg')}">`
      : ''
  return `<div class="tag"><b>ANIMATIC</b>guía para grabar, no es el infomercial</div>
<div class="tiempo">Escena ${e.n} · ${mmss(e.ini)} a ${mmss(e.fin)}</div>
<div class="izq" style="${derecha || e.clip ? '' : 'width:1500px'}"><h1>${e.n}</h1><p class="k">Toma</p><p class="toma">${e.toma}</p>
${e.pantalla ? `<p class="k">Texto en pantalla</p><p class="pant">${e.pantalla}</p>` : ''}${e.nota ? `<p class="nota">${e.nota}</p>` : ''}</div>
${derecha}${e.voz ? `<div class="sub"><span>${e.voz}</span></div>` : ''}`
}

;(async () => {
  const b = await chromium.launch()
  // Capturas de la demo genérica (ficticia) para las escenas 6 y 7
  const tel = await b.newContext({ ...devices['iPhone 13'] })
  const t = await tel.newPage()
  await t.goto(`${APP}/?salir-demo`)
  await t.evaluate(() => localStorage.clear())
  await t.goto(`${APP}/o/7KQ2X/reclamar?codigo=4K7P-9QX2`)
  await t.getByRole('button', { name: 'Simular reclamo' }).click()
  await t.getByText(/Así se ve cuando la obra es tuya/).waitFor()
  await t.screenshot({ path: path.join(TMP, 'reclamo.png') })
  await t.goto(`${APP}/o/M3RT8`)
  await t.getByText('Línea de tiempo').evaluate((el) => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 40, behavior: 'instant' }))
  await t.evaluate(() => document.querySelectorAll('.revela').forEach((e) => e.classList.add('visible')))
  await t.waitForTimeout(600)
  await t.screenshot({ path: path.join(TMP, 'linea.png') })
  await t.evaluate(() => localStorage.clear())
  await tel.close()

  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  for (const e of ESCENAS) {
    // Como archivo, no con setContent: una página en blanco no puede cargar imágenes locales
    const f = path.join(TMP, `e${e.n}.html`)
    fs.writeFileSync(f, `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${html(e)}</body></html>`)
    await p.goto('file://' + f, { waitUntil: 'load' })
    await p.evaluate(() => document.fonts.ready)
    await p.screenshot({ path: path.join(TMP, `e${e.n}.png`) })
  }
  await b.close()

  // Un segmento por escena; la 5 lleva encima el clip real del sello
  const partes = []
  for (const e of ESCENAS) {
    const out = path.join(TMP, `e${e.n}.mp4`)
    const dur = String(e.fin - e.ini)
    const base = ['-y', '-loglevel', 'error', '-loop', '1', '-t', dur, '-i', path.join(TMP, `e${e.n}.png`)]
    if (e.clip) {
      execFileSync('ffmpeg', [...base, '-stream_loop', '-1', '-t', dur, '-i', path.join(__dirname, 'escena-sello-9x16.mp4'),
        '-filter_complex', '[1:v]scale=-2:760[c];[0:v][c]overlay=x=1300:y=110:shortest=1,format=yuv420p', '-r', '30', '-c:v', 'libx264', '-crf', '24', out])
    } else {
      execFileSync('ffmpeg', [...base, '-vf', 'format=yuv420p', '-r', '30', '-c:v', 'libx264', '-tune', 'stillimage', '-crf', '24', out])
    }
    partes.push(`file '${out}'`)
  }
  const lista = path.join(TMP, 'lista.txt')
  fs.writeFileSync(lista, partes.join('\n'))
  const final = path.join(__dirname, 'animatic-infomercial.mp4')
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lista, '-i', path.join(RAIZ, 'pitch/infomercial.srt'),
    '-map', '0:v', '-map', '1:s', '-c:v', 'copy', '-c:s', 'mov_text', '-metadata:s:s:0', 'language=spa', '-movflags', '+faststart', final])
  console.log('listo: pitch/clips/animatic-infomercial.mp4')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
