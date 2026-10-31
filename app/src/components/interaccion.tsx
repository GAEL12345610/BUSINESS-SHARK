import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Isotipo } from './marca'

function sinMovimiento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ------------------------------------------------------------------ */
/* Escena del sello: el gesto que vende Brai, guiado por el scroll.     */
/* ------------------------------------------------------------------ */

const PASOS_ESCENA = [
  { titulo: 'Acerca tu celular', texto: 'Detrás del cuadro hay un sello. No hace falta abrir ninguna app.' },
  { titulo: 'Se abre su historia', texto: 'La obra te cuenta quién la pintó, cuándo y cómo nació.' },
  { titulo: 'Sabes que es de verdad', texto: 'Ves que la registró el propio artista, y quién es su dueño hoy.' },
]

export function EscenaSello({ titulo, artista, registro, imagen }: { titulo: string; artista: string; registro: string; imagen: string }) {
  const ref = useRef<HTMLElement>(null)
  const [p, setP] = useState(0)
  const [quieta, setQuieta] = useState(false)

  useEffect(() => {
    if (sinMovimiento()) {
      setQuieta(true)
      setP(1)
      return
    }
    let pendiente = false
    const medir = () => {
      pendiente = false
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const recorrido = r.height - window.innerHeight
      setP(Math.min(1, Math.max(0, -r.top / recorrido)))
    }
    const pedir = () => {
      if (!pendiente) {
        pendiente = true
        requestAnimationFrame(medir)
      }
    }
    medir()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir, { passive: true })
    return () => {
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [])

  // 0 a 0.45: el celular se acerca. 0.45: toca el sello. Después se abre la obra.
  const acercar = Math.min(1, p / 0.45)
  const facil = 1 - (1 - acercar) ** 3
  const toco = p >= 0.45
  const paso = p < 0.45 ? 0 : p < 0.72 ? 1 : 2

  return (
    <section ref={ref} aria-label="Cómo se usa el sello" className={quieta ? 'py-20' : 'h-[260vh]'}>
      <div className={`${quieta ? '' : 'sticky top-0 h-[100dvh]'} overflow-hidden`}>
        <div className="mx-auto grid h-full max-w-6xl content-center gap-6 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-14">
          {/* Escenario: la parte de atrás del cuadro */}
          <div className="relative order-1 mx-auto aspect-[4/5] h-[46dvh] max-h-[560px] md:order-2 md:h-[70dvh]">
            <div className="absolute inset-0 rounded-sm bg-[#E8DCC8] shadow-[inset_0_0_0_10px_#C9AE8A,inset_0_0_0_11px_#B39570]">
              {/* travesaños del bastidor */}
              <div className="absolute inset-x-[10px] top-1/2 h-4 -translate-y-1/2 bg-[#C9AE8A]" />
              <div className="absolute inset-y-[10px] left-1/2 w-4 -translate-x-1/2 bg-[#C9AE8A]" />
              <p className="absolute bottom-5 left-5 font-mono text-[10px] text-tinta/50">Reverso de la obra</p>
            </div>
            {/* el sello, con ondas cuando el celular lo toca */}
            <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
              {toco &&
                [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="onda absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-terracota"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                ))}
              <div className="relative flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-lienzo shadow-[inset_0_0_0_1px_#d8cdbb]">
                <Isotipo size={34} />
                <span className="font-mono text-[8px] text-verde">{registro}</span>
              </div>
            </div>
            {/* el celular que se acerca */}
            <div
              className="absolute left-1/2 top-[30%] w-[44%] will-change-transform"
              style={{
                transform: `translate(${(-50 + (1 - facil) * 95).toFixed(1)}%, ${(-18 + (1 - facil) * 70).toFixed(1)}%) rotate(${((1 - facil) * 14).toFixed(1)}deg)`,
              }}
            >
              <div className="rounded-[22px] bg-tinta p-[5px]">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[17px] bg-[#1d1a17]">
                  {/* pantalla bloqueada */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 text-lienzo/80 transition-opacity duration-500 ${toco ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="font-display text-2xl">9:41</span>
                    <span className="font-mono text-[8px]">Acerca al sello</span>
                  </div>
                  {/* la obra se abre */}
                  <div className={`absolute inset-0 bg-lienzo transition-all duration-700 ${toco ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    <div className="bg-[#2F5D62] p-1.5">
                      <img src={imagen} alt="" className="aspect-[3/4] w-full object-cover" />
                    </div>
                    <div className="px-2 pt-1.5">
                      <p className="text-[6px] font-semibold uppercase tracking-wider text-verde">{artista}</p>
                      <p className="font-display text-[11px] font-semibold leading-tight">{titulo}</p>
                      <p
                        className={`mt-1 inline-flex items-center gap-1 rounded-full bg-dorado-suave px-1.5 py-0.5 text-[6px] font-semibold transition-all duration-500 ${
                          paso === 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                        }`}
                      >
                        <i className="size-1 rounded-full bg-dorado" /> Registrada por el artista
                      </p>
                      <div className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-2 border-t border-linea pt-1 font-mono text-[5.5px] leading-[1.6]">
                        <span className="text-verde">Registro</span>
                        <span>{registro}</span>
                        <span className="text-verde">Técnica</span>
                        <span>Óleo sobre tela</span>
                        <span className="text-verde">Dueño</span>
                        <span>Sin reclamar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Texto: los tres momentos */}
          <div className="order-2 md:order-1">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">En la vida real</p>
            <ol className="mt-4 space-y-4 md:mt-6 md:space-y-7">
              {PASOS_ESCENA.map((s, i) => (
                <li key={s.titulo} className={`border-l-2 pl-4 transition-all duration-500 ${i === paso ? 'border-terracota opacity-100' : 'border-linea opacity-40'}`}>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl md:text-3xl">{s.titulo}</h3>
                  <p className={`mt-1 leading-relaxed text-tinta/80 ${i === paso ? 'block' : 'hidden md:block'}`}>{s.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Raspadita: el ritual de la tarjeta de dueño, con el dedo.            */
/* ------------------------------------------------------------------ */

export function Raspadita({ codigo, alRevelar }: { codigo: string; alRevelar?: () => void }) {
  const lienzo = useRef<HTMLCanvasElement>(null)
  const [revelado, setRevelado] = useState(false)
  const raspando = useRef(false)
  const toques = useRef(0)

  useEffect(() => {
    const c = lienzo.current
    if (!c) return
    const r = c.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    c.width = r.width * dpr
    c.height = r.height * dpr
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    const g = ctx.createLinearGradient(0, 0, r.width, r.height)
    g.addColorStop(0, '#bdb3a4')
    g.addColorStop(0.4, '#d6ccbd')
    g.addColorStop(1, '#b3a998')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, r.width, r.height)
    ctx.fillStyle = '#2B2622'
    ctx.font = '500 11px "IBM Plex Mono", monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('RASPA AQUÍ CON EL DEDO', r.width / 2, r.height / 2)
  }, [])

  const raspar = (x: number, y: number) => {
    const c = lienzo.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || revelado) return
    const r = c.getBoundingClientRect()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x - r.left, y - r.top, 16, 0, Math.PI * 2)
    ctx.fill()
    // cada 8 toques medimos cuánto se ha raspado
    if (++toques.current % 8 !== 0) return
    const datos = ctx.getImageData(0, 0, c.width, c.height).data
    let vacios = 0
    let total = 0
    for (let i = 3; i < datos.length; i += 64) {
      total++
      if (datos[i] === 0) vacios++
    }
    if (vacios / total > 0.5) {
      setRevelado(true)
      alRevelar?.()
    }
  }

  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="bg-white/70 px-2.5 py-2 text-center font-mono text-[15px] font-medium tracking-[0.2em]">{codigo}</div>
      <canvas
        ref={lienzo}
        aria-label="Raspadita: arrastra el dedo para ver el código"
        onPointerDown={(e) => {
          raspando.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          raspar(e.clientX, e.clientY)
        }}
        onPointerMove={(e) => raspando.current && raspar(e.clientX, e.clientY)}
        onPointerUp={() => (raspando.current = false)}
        className={`absolute inset-0 size-full cursor-pointer touch-none transition-opacity duration-500 ${revelado ? 'pointer-events-none opacity-0' : ''}`}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cifra que cuenta al aparecer.                                        */
/* ------------------------------------------------------------------ */

export function Cifra({ valor, prefijo = '', sufijo = '' }: { valor: number; prefijo?: string; sufijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(valor)

  useEffect(() => {
    const el = ref.current
    if (!el || sinMovimiento()) return
    setN(0)
    let cuadro = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const inicio = performance.now()
        const paso = (t: number) => {
          const k = Math.min(1, (t - inicio) / 1300)
          setN(Math.round(valor * (1 - (1 - k) ** 3)))
          if (k < 1) cuadro = requestAnimationFrame(paso)
        }
        cuadro = requestAnimationFrame(paso)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(cuadro)
    }
  }, [valor])

  return (
    <span ref={ref} className="tabular-nums">
      {prefijo}
      {n.toLocaleString('es-MX')}
      {sufijo}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Pregunta frecuente: <details> nativo, funciona sin JavaScript.       */
/* ------------------------------------------------------------------ */

export function Pregunta({ pregunta, children }: { pregunta: string; children: ReactNode }) {
  return (
    <details className="pregunta group border-b border-linea py-5">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        {pregunta}
        <span aria-hidden="true" className="mt-1.5 grid size-5 shrink-0 place-items-center">
          <span className="absolute h-0.5 w-3.5 bg-tinta" />
          <span className="absolute h-3.5 w-0.5 bg-tinta transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
        </span>
      </summary>
      <div className="pregunta-cuerpo mt-3 max-w-2xl leading-relaxed text-tinta/80">{children}</div>
    </details>
  )
}

export function LinkReclamarDemo({ codigoObra, codigo, titulo }: { codigoObra: string; codigo: string; titulo: string }) {
  return (
    <Link
      to={`/o/${codigoObra}/reclamar?codigo=${encodeURIComponent(codigo)}`}
      className="inline-flex items-center gap-2 font-semibold text-terracota-btn hover:underline"
    >
      Reclama {titulo} con este código
    </Link>
  )
}
