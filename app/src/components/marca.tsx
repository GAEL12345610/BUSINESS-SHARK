import { Link } from 'react-router'

/** Isotipo enso. Siempre el SVG de brand/, nunca redibujado. */
export function Isotipo({ size = 28, variante = '' }: { size?: number; variante?: '' | '_claro' | '_tinta' }) {
  return <img src={`/brand/isotipo${variante}.svg`} width={size} height={size} alt="" className="shrink-0" />
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Brai, inicio">
      <Isotipo size={30} variante={claro ? '_claro' : ''} />
      <span className={`font-display text-[1.6rem] font-semibold leading-none tracking-tight ${claro ? 'text-lienzo' : 'text-tinta'}`}>
        Brai
      </span>
    </Link>
  )
}

/** El sello chico que va abajo de cada página del artista: de aquí sale la autoridad. */
export function SelloRegistroBrai({ registro }: { registro?: string }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3 rounded-full border border-linea bg-white px-4 py-2.5 transition-colors hover:border-terracota"
    >
      <Isotipo size={22} />
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold">Registro Brai</span>
        <span className="font-mono text-[11px] text-verde">{registro ?? 'Propiedad y procedencia'}</span>
      </span>
    </Link>
  )
}

/** Pieza física 1: sello NFC redondo detrás del cuadro. */
export function SelloNFC({ registro = 'BRAI-0001' }: { registro?: string }) {
  return (
    <div className="flex size-44 flex-col items-center justify-center gap-1.5 rounded-full bg-lienzo text-center shadow-[inset_0_0_0_1px_#d8cdbb,0_1px_0_#d8cdbb]">
      <Isotipo size={52} />
      <span className="text-xs font-semibold">Acerca tu celular</span>
      <span className="font-mono text-[10px] text-verde">{registro}</span>
    </div>
  )
}

/** Pieza física 2: tarjeta de dueño, 85 × 55 mm, firmada a mano. */
export function TarjetaDueno({ titulo, artista, ficha }: { titulo: string; artista: string; ficha: string }) {
  return (
    <div className="flex aspect-[85/55] w-[320px] max-w-full flex-col justify-between rounded-[10px] bg-lienzo px-5 py-4 shadow-[inset_0_0_0_1px_#d8cdbb,0_1px_0_#d8cdbb]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg font-semibold leading-tight">{titulo}</div>
          <div className="font-mono text-[10.5px] text-verde">{ficha}</div>
        </div>
        <Isotipo size={28} />
      </div>
      <div className="raspadita rounded-md px-2.5 py-2 text-center font-mono text-[11px]">RASPA AQUÍ · TU CÓDIGO DE DUEÑO</div>
      <div className="w-36 border-t border-tinta pt-0.5 font-display text-[13px] italic">{artista}</div>
    </div>
  )
}
