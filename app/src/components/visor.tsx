import { useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import { Check, Share2, X, ZoomIn } from 'lucide-react'

/** Capa a pantalla completa. Cierra con Escape, con la X o tocando el fondo. */
export function Capa({ abierta, alCerrar, titulo, children }: { abierta: boolean; alCerrar: () => void; titulo: string; children: ReactNode }) {
  useEffect(() => {
    if (!abierta) return
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && alCerrar()
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', tecla)
    return () => {
      document.body.style.overflow = antes
      window.removeEventListener('keydown', tecla)
    }
  }, [abierta, alCerrar])

  if (!abierta) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={titulo} className="capa fixed inset-0 z-50 flex flex-col bg-tinta/95 text-lienzo" onClick={alCerrar}>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-lienzo/70">{titulo}</p>
        <button type="button" onClick={alCerrar} aria-label="Cerrar" className="grid size-10 place-items-center rounded-full bg-lienzo/10 hover:bg-lienzo/20">
          <X size={20} />
        </button>
      </div>
      <div className="min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

/** Ver la obra en grande: toca para acercar, arrastra para recorrerla. */
export function VisorObra({ imagen, alt }: { imagen: string; alt: string }) {
  const [zoom, setZoom] = useState(false)
  const [origen, setOrigen] = useState({ x: 50, y: 50 })

  const posicion = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 pb-6">
      <div
        className={`relative max-h-full overflow-hidden ${zoom ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'}`}
        onPointerDown={(e) => {
          if (!zoom) {
            setOrigen(posicion(e))
            setZoom(true)
          }
        }}
        onPointerMove={(e) => zoom && (e.pointerType === 'mouse' || e.buttons) && setOrigen(posicion(e))}
        onDoubleClick={() => setZoom(false)}
      >
        <img
          src={imagen}
          alt={alt}
          draggable={false}
          className="block max-h-[78dvh] w-auto select-none transition-transform duration-300 ease-out"
          style={{ transform: zoom ? 'scale(2.6)' : 'none', transformOrigin: `${origen.x}% ${origen.y}%` }}
        />
      </div>
      <button type="button" onClick={() => setZoom((z) => !z)} className="inline-flex items-center gap-2 text-sm text-lienzo/80 hover:text-lienzo">
        <ZoomIn size={16} /> {zoom ? 'Alejar' : 'Toca la obra para acercarte'}
      </button>
    </div>
  )
}

/**
 * Comparar una foto huella: el cuadro completo con el detalle marcado y el detalle en grande.
 * La huella se muestra con background-size 480% en un cuadro; aquí se calcula qué parte es.
 */
export function CompararHuella({ imagen, x, y, nota }: { imagen: string; x: number; y: number; nota: string }) {
  const ancho = 100 / 4.8
  const alto = 100 / 6.4 // la obra es 3:4, así que a lo alto cabe menos
  const izq = (x / 100) * (100 - ancho)
  const arriba = (y / 100) * (100 - alto)
  return (
    <div className="mx-auto grid h-full max-w-4xl content-center gap-6 overflow-y-auto px-4 pb-8 sm:grid-cols-2">
      <div>
        <div className="relative mx-auto w-[min(100%,340px)] overflow-hidden">
          <img src={imagen} alt="" className="block aspect-[3/4] w-full object-cover" />
          <span
            className="marca-huella absolute border-2 border-lienzo shadow-[0_0_0_9999px_rgba(43,38,34,.55)]"
            style={{ left: `${izq}%`, top: `${arriba}%`, width: `${ancho}%`, height: `${alto}%` }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-lienzo/70">Dónde está en el cuadro</p>
      </div>
      <div>
        <div
          className="mx-auto aspect-square w-[min(100%,340px)] bg-no-repeat"
          style={{ backgroundImage: `url(${imagen})`, backgroundSize: '480%', backgroundPosition: `${x}% ${y}%` }}
          role="img"
          aria-label={`Detalle: ${nota}`}
        />
        <p className="mx-auto mt-3 max-w-[340px] text-center text-sm text-lienzo/90">{nota}</p>
      </div>
    </div>
  )
}

/** Compartir: el menú nativo del celular, o copia el link en computadora. */
export function Compartir({ titulo, texto }: { titulo: string; texto: string }) {
  const [copiado, setCopiado] = useState(false)
  const compartir = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url })
      } catch {
        // la persona cerró el menú: no pasa nada
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch {
      window.prompt('Copia el enlace de la obra', url)
    }
  }
  return (
    <button
      type="button"
      onClick={compartir}
      className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-tinta/80 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-tinta/5"
    >
      {copiado ? <Check size={16} /> : <Share2 size={16} />}
      {copiado ? 'Enlace copiado' : 'Compartir'}
    </button>
  )
}
