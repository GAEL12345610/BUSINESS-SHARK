// Punto v2, la mascota de Brai (docs/MASCOTA.md).
// Ingeniería inversa de los PRINCIPIOS de Clawd (la mascota de Claude Code),
// no de su dibujo: un solo color plano que se lee chiquito, sin boca (toda la
// expresión en los ojos), patitas cortas que lo vuelven "alguien" y hecho de lo
// que es la marca. Punto es el sello redondo: cuerpo terracota, la muesca del
// enso a las 2 en punto y el punto dorado que la cierra.
//
// Reglas (brand/BRAND.md, sección 12): nunca interrumpe, nunca tapa contenido,
// una vez por pantalla, nunca en la página de la obra ni en reclamar.
import { useEffect, useId, useRef, useState } from 'react'

export type EstadoPunto = 'tranquilo' | 'toque' | 'feliz' | 'duda'

const TERRACOTA = '#C06E52'
const TERRACOTA_OSCURO = '#8C4932'
const TINTA = '#2B2622'
const DORADO = '#C9A24B'
const LIENZO = '#F6F1EA'

function sinMovimiento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Props = {
  tam?: number
  estado?: EstadoPunto
  /** Sus ojos siguen al cursor o al dedo. */
  mira?: boolean
  /** Al tocarlo saluda y hace ondas NFC. */
  interactivo?: boolean
  /** Lo que dice al tocarlo (frases cortas, voz de Brai). */
  frases?: string[]
  className?: string
  etiqueta?: string
}

// Geometría (viewBox 0 0 100 110)
const CX = 50
const CY = 54
const R = 33
// El hueco del enso a las 2 en punto: un corte chico EN EL BORDE (no un gajo
// hasta el centro, que lo volvería Pac-Man), con el punto dorado encajado.
const rad = (g: number) => (g * Math.PI) / 180
const punto = (g: number, r: number) => [CX + r * Math.cos(rad(g)), CY + r * Math.sin(rad(g))] as const
const [hx, hy] = punto(-34, R - 1)
const [dx, dy] = punto(-34, R + 1.5)

export function Punto({ tam = 120, estado = 'tranquilo', mira = false, interactivo = false, frases, className = '', etiqueta }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const id = useId().replace(/:/g, '')
  const [ojo, setOjo] = useState({ x: 0, y: 0 })
  const [tocado, setTocado] = useState(false)
  const [frase, setFrase] = useState<string | null>(null)
  const n = useRef(0)

  useEffect(() => {
    if (!mira || sinMovimiento()) return
    let pendiente = false
    let ultimo = { x: 0, y: 0 }
    const pintar = () => {
      pendiente = false
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const ddx = ultimo.x - (r.left + r.width / 2)
      const ddy = ultimo.y - (r.top + r.height / 2)
      const d = Math.hypot(ddx, ddy) || 1
      const k = Math.min(1, d / 260) * 3.4
      setOjo({ x: (ddx / d) * k, y: (ddy / d) * k })
    }
    const mover = (e: PointerEvent) => {
      ultimo = { x: e.clientX, y: e.clientY }
      if (!pendiente) {
        pendiente = true
        requestAnimationFrame(pintar)
      }
    }
    window.addEventListener('pointermove', mover, { passive: true })
    return () => window.removeEventListener('pointermove', mover)
  }, [mira])

  const tocar = () => {
    if (!interactivo) return
    setTocado(true)
    if (frases?.length) setFrase(frases[n.current++ % frases.length])
    window.setTimeout(() => setTocado(false), 1400)
  }

  const actual: EstadoPunto = tocado ? 'toque' : estado
  const feliz = actual === 'feliz'
  const toque = actual === 'toque'
  const duda = actual === 'duda'
  const ox = duda ? -2.5 : ojo.x
  const oy = duda ? -1.5 : ojo.y

  // Ojos de bloque: rectángulos redondeados, como pixeles grandes.
  const alto = toque ? 13 : 11
  const ojos = feliz ? (
    <>
      <path d="M35 53 l5 -6 l5 6" stroke={TINTA} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 53 l5 -6 l5 6" stroke={TINTA} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ) : duda ? (
    <>
      <rect x="37" y={50 - alto / 2} width="6.5" height={alto} rx="2" fill={TINTA} />
      <rect x="56" y="49.5" width="8" height="3.6" rx="1.8" fill={TINTA} />
    </>
  ) : (
    <>
      <rect x="37" y={50 - alto / 2} width="6.5" height={alto} rx="2" fill={TINTA} />
      <rect x="56.5" y={50 - alto / 2} width="6.5" height={alto} rx="2" fill={TINTA} />
    </>
  )

  const svg = (
    <svg
      ref={ref}
      viewBox="0 0 100 110"
      width={tam}
      height={tam * 1.1}
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
      className={`overflow-visible ${feliz ? 'punto-salta' : ''} ${toque ? 'punto-brinca' : ''}`}
    >
      <defs>
        <mask id={`muesca-${id}`}>
          <rect x="-20" y="-20" width="140" height="150" fill="white" />
          <circle cx={hx} cy={hy} r="8.5" fill="black" />
        </mask>
      </defs>

      {/* ondas NFC cuando lo tocas */}
      {toque &&
        [0, 1, 2].map((i) => (
          <circle key={i} cx={CX} cy={CY} r="38" fill="none" stroke={TERRACOTA} strokeWidth="1.5" className="punto-onda" style={{ animationDelay: `${i * 0.28}s` }} />
        ))}

      {/* sombra */}
      <ellipse cx="50" cy="104" rx="22" ry="2.8" fill={TINTA} opacity="0.1" className="punto-sombra" />

      <g className={duda ? 'punto-ladea' : ''} style={{ transformOrigin: '50px 90px' }}>
        {/* patitas */}
        <rect x="37" y="80" width="7.5" height="17" rx="3.5" fill={TERRACOTA_OSCURO} className={toque ? 'punto-pata-a' : ''} />
        <rect x="55.5" y="80" width="7.5" height="17" rx="3.5" fill={TERRACOTA_OSCURO} className={toque ? 'punto-pata-b' : ''} />

        {/* bracitos: arriba cuando está feliz, uno saluda cuando lo tocas */}
        <rect
          x="11" y="56" width="10" height="7" rx="3.5" fill={TERRACOTA_OSCURO}
          style={{ transformBox: 'fill-box', transformOrigin: '100% 50%', transform: feliz ? 'rotate(45deg)' : 'none', transition: 'transform 300ms' }}
        />
        <rect
          x="79" y="56" width="10" height="7" rx="3.5" fill={TERRACOTA_OSCURO}
          className={toque ? 'punto-saluda' : ''}
          style={{ transformBox: 'fill-box', transformOrigin: '0% 50%', transform: feliz ? 'rotate(-45deg)' : 'none', transition: 'transform 300ms' }}
        />

        {/* cuerpo: el sello, con la muesca del enso a las 2 */}
        <circle cx={CX} cy={CY} r={R} fill={TERRACOTA} mask={`url(#muesca-${id})`} />
        {/* brillo apenas: le da volumen sin romper el color plano */}
        <path d={`M${CX - 22} ${CY - 14} a26 26 0 0 1 14 -14`} stroke={LIENZO} strokeOpacity="0.28" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* el punto dorado que cierra el enso */}
        <circle cx={dx} cy={dy} r="5.2" fill={DORADO} />

        {/* ojos */}
        <g className={feliz || toque ? '' : 'punto-parpadea'} style={{ transform: `translate(${ox}px, ${oy}px)`, transition: 'transform 120ms ease-out' }}>
          {ojos}
        </g>

        {duda && (
          <text x="78" y="20" fontFamily="ui-monospace, monospace" fontSize="16" fontWeight="600" fill="#5E6C52" className="punto-flota">
            ?
          </text>
        )}
      </g>
    </svg>
  )

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      {interactivo ? (
        <button
          type="button"
          onClick={tocar}
          className="cursor-pointer rounded-full transition-transform duration-200 hover:-translate-y-1 active:scale-95"
          aria-label={etiqueta ?? 'Punto, el sello de Brai. Tócalo.'}
        >
          {svg}
        </button>
      ) : (
        svg
      )}
      {frase && (
        <p key={frase} role="status" className="entra max-w-[16rem] rounded-2xl bg-white px-4 py-2.5 text-center text-sm shadow-[inset_0_0_0_1px_var(--color-linea)]">
          {frase}
        </p>
      )}
    </div>
  )
}
