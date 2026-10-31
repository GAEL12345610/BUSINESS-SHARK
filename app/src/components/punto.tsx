// Punto, la mascota de Brai (docs/MASCOTA.md). Es el sello redondo con cara:
// cuerpo de lienzo, contorno = el isotipo REAL (nunca redibujado), y el punto
// dorado del logo queda como su chapita. Toda la emoción va en los ojos.
//
// Reglas (brand/BRAND.md, sección 13): nunca interrumpe, nunca tapa contenido,
// una vez por pantalla, nunca en la página de la obra (esa es del artista).
import { useEffect, useRef, useState } from 'react'

export type EstadoPunto = 'tranquilo' | 'toque' | 'feliz' | 'duda'

function sinMovimiento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type Props = {
  tam?: number
  estado?: EstadoPunto
  /** Sus ojos siguen al cursor o al dedo. */
  mira?: boolean
  /** Al tocarlo hace ondas NFC. */
  interactivo?: boolean
  /** Lo que dice al tocarlo (frases cortas, voz de Brai). */
  frases?: string[]
  className?: string
  etiqueta?: string
}

export function Punto({ tam = 120, estado = 'tranquilo', mira = false, interactivo = false, frases, className = '', etiqueta }: Props) {
  const ref = useRef<SVGSVGElement>(null)
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
      const dx = ultimo.x - (r.left + r.width / 2)
      const dy = ultimo.y - (r.top + r.height / 2)
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(1, d / 260) * 3.2
      setOjo({ x: (dx / d) * k, y: (dy / d) * k })
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
  const ojosCerrados = actual === 'feliz'
  const sorpresa = actual === 'toque'
  const duda = actual === 'duda'
  const ox = duda ? -2.6 : ojo.x
  const oy = duda ? -1.2 : ojo.y

  const svg = (
    <svg
      ref={ref}
      viewBox="0 0 100 108"
      width={tam}
      height={tam * 1.08}
      role={etiqueta ? 'img' : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
      className={`overflow-visible ${actual === 'feliz' ? 'punto-salta' : ''} ${duda ? 'punto-ladea' : ''}`}
    >
      {/* ondas NFC cuando lo tocas */}
      {sorpresa &&
        [0, 1, 2].map((i) => (
          <circle key={i} cx="50" cy="53" r="40" fill="none" stroke="#C06E52" strokeWidth="1.5" className="punto-onda" style={{ animationDelay: `${i * 0.28}s` }} />
        ))}
      {/* sombra en el piso */}
      <ellipse cx="50" cy="104" rx="24" ry="3" fill="#2B2622" opacity="0.08" className="punto-sombra" />
      {/* cuerpo: el sello */}
      <circle cx="50" cy="53" r="35" fill="#F6F1EA" />
      <circle cx="50" cy="53" r="35" fill="none" stroke="#D8CDBB" strokeWidth="0.8" />
      {/* contorno: el isotipo real, con su punto dorado a las 2 */}
      <image href="/brand/isotipo.svg" x="0" y="3" width="100" height="100" />
      {/* chapetes */}
      <ellipse cx="33" cy="62" rx="5" ry="3" fill="#C06E52" opacity="0.22" />
      <ellipse cx="67" cy="62" rx="5" ry="3" fill="#C06E52" opacity="0.22" />
      {/* ojos */}
      <g className={ojosCerrados || sorpresa ? '' : 'punto-parpadea'} style={{ transform: `translate(${ox}px, ${oy}px)`, transition: 'transform 120ms ease-out' }}>
        {ojosCerrados ? (
          <>
            <path d="M36 52 q5 -6 10 0" stroke="#2B2622" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <path d="M54 52 q5 -6 10 0" stroke="#2B2622" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="41" cy="51" rx={sorpresa ? 4.6 : 3.6} ry={sorpresa ? 5.6 : 4.8} fill="#2B2622" />
            <ellipse cx="59" cy="51" rx={sorpresa ? 4.6 : 3.6} ry={sorpresa ? 5.6 : 4.8} fill="#2B2622" />
            <circle cx="42.3" cy="49.2" r="1.2" fill="#F6F1EA" />
            <circle cx="60.3" cy="49.2" r="1.2" fill="#F6F1EA" />
          </>
        )}
      </g>
      {/* boca */}
      {sorpresa ? (
        <ellipse cx="50" cy="65" rx="3" ry="3.6" fill="#2B2622" />
      ) : ojosCerrados ? (
        <path d="M43 62 q7 8 14 0 z" fill="#2B2622" />
      ) : duda ? (
        <path d="M44 66 q6 -3 12 0" stroke="#2B2622" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M44.5 63 q5.5 5 11 0" stroke="#2B2622" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      )}
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
