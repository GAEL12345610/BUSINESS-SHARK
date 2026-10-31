import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react'
import { useLocation } from 'react-router'

/**
 * Revela los elementos .revela con un BARRIDO en cada scroll: todo lo que entró
 * o ya pasó. Solo IntersectionObserver deja secciones invisibles si alguien
 * salta al final (memoria/animacion-de-entrada-con-barrido.md).
 */
export function useRevela() {
  const { pathname } = useLocation()
  useEffect(() => {
    let pendiente = false
    const barrer = () => {
      pendiente = false
      const limite = window.innerHeight * 0.92
      document.querySelectorAll<HTMLElement>('.revela:not(.visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < limite) el.classList.add('visible')
      })
    }
    const pedir = () => {
      if (!pendiente) {
        pendiente = true
        requestAnimationFrame(barrer)
      }
    }
    barrer()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir, { passive: true })
    return () => {
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [pathname])
}

/** Línea de progreso de lectura (pedida en el draft de la web). */
export function BarraProgreso() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const pintar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    pintar()
    window.addEventListener('scroll', pintar, { passive: true })
    window.addEventListener('resize', pintar, { passive: true })
    return () => {
      window.removeEventListener('scroll', pintar)
      window.removeEventListener('resize', pintar)
    }
  }, [])
  return (
    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linea" aria-hidden="true">
      <div ref={ref} className="h-full origin-left bg-terracota" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

/** Tarjeta que se inclina siguiendo el dedo o el mouse. 3D con CSS, sin librería. */
export function TarjetaTilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${x * 14}deg`)
    el.style.setProperty('--rx', `${-y * 14}deg`)
    el.style.setProperty('--brillo-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--brillo-y', `${(y + 0.5) * 100}%`)
  }
  const soltar = () => {
    ref.current?.style.setProperty('--ry', '0deg')
    ref.current?.style.setProperty('--rx', '0deg')
  }
  return (
    <div className="[perspective:900px]">
      <div
        ref={ref}
        onPointerMove={mover}
        onPointerLeave={soltar}
        onPointerUp={soltar}
        className={`group relative h-full touch-pan-y transition-transform duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] ${className}`}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle at var(--brillo-x,50%) var(--brillo-y,50%), rgba(255,255,255,.35), transparent 55%)' }}
        />
      </div>
    </div>
  )
}

const REPOSO = { x: 8, y: -18 }

/**
 * Teléfono que se gira al arrastrarlo. Adentro corre la página REAL de una obra
 * (iframe), así lo que ve el jurado es exactamente lo que abre el sello.
 */
export function Telefono3D({ src, titulo }: { src: string; titulo: string }) {
  const [giro, setGiro] = useState(REPOSO)
  const [arrastrando, setArrastrando] = useState(false)
  const [explorando, setExplorando] = useState(false)
  const inicio = useRef<{ px: number; py: number; x: number; y: number; movio: boolean } | null>(null)

  const bajar = (e: PointerEvent<HTMLDivElement>) => {
    if (explorando) return
    e.currentTarget.setPointerCapture(e.pointerId)
    inicio.current = { px: e.clientX, py: e.clientY, x: giro.x, y: giro.y, movio: false }
    setArrastrando(true)
  }
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const i = inicio.current
    if (!i) return
    const dx = e.clientX - i.px
    const dy = e.clientY - i.py
    if (Math.abs(dx) + Math.abs(dy) > 4) i.movio = true
    setGiro({
      x: Math.max(-28, Math.min(28, i.x - dy * 0.25)),
      y: Math.max(-45, Math.min(45, i.y + dx * 0.35)),
    })
  }
  const subir = () => {
    // un toque sin arrastre entra a explorar la página
    if (inicio.current && !inicio.current.movio) setExplorando(true)
    inicio.current = null
    setArrastrando(false)
    setGiro(REPOSO)
  }

  const plano = explorando ? { x: 0, y: 0 } : giro
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="[perspective:1400px]">
        <div
          onPointerDown={bajar}
          onPointerMove={mover}
          onPointerUp={subir}
          onPointerCancel={subir}
          className={`relative w-[272px] select-none [transform-style:preserve-3d] sm:w-[300px] ${
            explorando ? '' : 'cursor-grab touch-pan-y active:cursor-grabbing'
          } ${arrastrando ? '' : 'transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]'}`}
          style={{ transform: `rotateX(${plano.x}deg) rotateY(${plano.y}deg)` }}
        >
          {/* canto del teléfono: una capa detrás da el grosor */}
          <div aria-hidden="true" className="absolute inset-0 rounded-[46px] bg-[#1a1714] [transform:translateZ(-14px)]" />
          <div className="relative rounded-[46px] bg-tinta p-[10px] [transform:translateZ(0)]">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[36px] bg-arena pt-7 [--escala:0.6462] sm:[--escala:0.7179]">
              <iframe
                src={src}
                title={titulo}
                loading="lazy"
                className="absolute left-0 top-7 h-[800px] w-[390px] origin-top-left border-0 bg-lienzo"
                style={{ transform: 'scale(var(--escala))' }}
                tabIndex={explorando ? 0 : -1}
              />
              {/* mientras no se explora, una capa encima recibe el arrastre */}
              {!explorando && <div className="absolute inset-0" aria-hidden="true" />}
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2 h-[18px] w-20 -translate-x-1/2 rounded-full bg-tinta" />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="-mt-3 h-4 w-48 rounded-[50%] bg-tinta/10 blur-md" />
      <button
        type="button"
        onClick={() => setExplorando((v) => !v)}
        className="font-mono text-xs uppercase tracking-[0.14em] text-verde underline-offset-4 hover:text-terracota-btn hover:underline"
      >
        {explorando ? 'Volver a girarlo' : 'Arrástralo para girarlo, tócalo para explorar'}
      </button>
    </div>
  )
}
