// Aviso de DEMO en todas las páginas (docs/DEMO_HONESTA.md). Existe porque la app
// publicada no tiene backend: nada se envía, todo es local y las personas son
// ficticias. Si algún día se conecta Supabase, este aviso se cambia, no se borra.
import { Link } from 'react-router'
import { MODO_JOSE_LUIS, reiniciarDemo } from '../data/demo'

export function AvisoDemo() {
  return (
    <div role="note" aria-label="Aviso de demostración" className="border-b border-tinta/15 bg-tinta text-lienzo print:hidden">
      <p className="mx-auto max-w-6xl px-4 py-2 text-[12.5px] leading-snug sm:px-6">
        <span className="mr-1.5 rounded-sm bg-dorado px-1.5 py-px font-mono text-[10.5px] font-semibold tracking-[0.12em] text-tinta">DEMO</span>
        {MODO_JOSE_LUIS
          ? 'Versión para platicar con José Luis Malo, sin su revisión ni aprobación.'
          : 'Prototipo con personas, obras y correos ficticios.'}{' '}
        Nada se envía a ningún servidor: lo que hagas se guarda solo en este navegador.{' '}
        <Link to="/demo" className="font-semibold underline underline-offset-2">
          Qué es real
        </Link>
        {' · '}
        <button
          type="button"
          onClick={() => {
            if (confirm('¿Borrar todo lo que se reclamó y registró en esta demo, en este navegador?')) {
              reiniciarDemo()
              location.reload()
            }
          }}
          className="underline underline-offset-2"
        >
          Reiniciar demo
        </button>
      </p>
    </div>
  )
}

/** Etiqueta chica para marcar algo inventado junto a un nombre o un dato. */
export function Ficticio({ children = 'Ficticio' }: { children?: string }) {
  return (
    <span className="ml-2 inline-block rounded-sm border border-tinta/30 px-1.5 py-px align-middle font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-tinta/75">
      {children}
    </span>
  )
}
