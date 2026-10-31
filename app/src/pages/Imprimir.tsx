import { Link, useParams } from 'react-router'
import { Printer } from 'lucide-react'
import QRCode from 'qrcode'
import { Isotipo } from '../components/marca'
import { ARTISTA, CODIGO_DEMO, anioTexto, getObra } from '../data/demo'
import NoEncontrada from './NoEncontrada'

// Hoja de piezas físicas en tamaño real (brand/BRAND.md, sección 7).
// Los sellos REALES siempre apuntan a brai.art (DECISIONES #12): el tag
// bloqueado es para siempre. Mientras brai.art no exista, el QR de la DEMO
// apunta a donde corre la app, para que al escanearlo abra (DECISIONES #43).
// Ese QR es solo para enseñar: nunca se graba en un sello bloqueado.
const DOMINIO_REAL = 'https://brai.art'
const DOMINIO = typeof window !== 'undefined' && !window.location.hostname.endsWith('brai.art') ? window.location.origin : DOMINIO_REAL

function QR({ texto, mm }: { texto: string; mm: number }) {
  const q = QRCode.create(texto, { errorCorrectionLevel: 'M' })
  const n = q.modules.size
  const celdas: string[] = []
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.modules.get(y, x)) celdas.push(`M${x} ${y}h1v1h-1z`)
  return (
    <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} style={{ width: `${mm}mm`, height: `${mm}mm` }} role="img" aria-label={`Código QR a ${texto}`}>
      <path d={celdas.join('')} fill="#2B2622" shapeRendering="crispEdges" />
    </svg>
  )
}

function Corte({ children, nota }: { children: React.ReactNode; nota: string }) {
  return (
    <figure className="flex flex-col items-start gap-2 break-inside-avoid">
      <div className="outline-1 outline-offset-[3mm] outline-dashed outline-tinta/40">{children}</div>
      <figcaption className="mt-[3mm] font-mono text-[9px] text-verde">{nota}</figcaption>
    </figure>
  )
}

export default function Imprimir() {
  const { codigo = '' } = useParams()
  const obra = getObra(codigo)
  if (!obra) return <NoEncontrada />
  const url = `${DOMINIO}/o/${obra.codigo}`
  // En la demo, todas las obras aceptan el mismo código de prueba.
  const codigoDueno = CODIGO_DEMO
  const urlCorta = url.replace(/^https?:\/\//, '')

  return (
    <div className="min-h-[100dvh] bg-white">
      <div className="border-b border-linea bg-lienzo print:hidden">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-verde">Piezas para imprimir</p>
            <h1 className="font-display text-2xl font-semibold">{obra.titulo}</h1>
            {DOMINIO !== DOMINIO_REAL && (
              <p className="mt-2 max-w-xl rounded-md bg-dorado-suave px-3 py-2 text-xs leading-snug">
                QR de demostración: apunta a {DOMINIO.replace(/^https?:\/\//, '')} para que abra al escanearlo. Los sellos reales siempre apuntan a
                brai.art. No grabes ni bloquees un sello NFC con esta dirección.
              </p>
            )}
            <p className="mt-1 max-w-xl text-sm text-tinta/75">
              Imprime al 100% (sin "ajustar a la página") en papel opalina o adhesivo. Recorta por la línea punteada. Cubre el código con
              una etiqueta de raspadita antes de entregar la tarjeta.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to={`/o/${obra.codigo}`} className="rounded-[10px] px-4 py-2.5 text-sm font-semibold text-terracota-btn hover:underline">
              Volver a la obra
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-[10px] bg-terracota-btn px-5 py-2.5 text-sm font-semibold text-lienzo hover:bg-terracota-hover"
            >
              <Printer size={16} /> Imprimir
            </button>
          </div>
        </div>
      </div>

      <main className="hoja mx-auto flex max-w-4xl flex-wrap items-start gap-[12mm] px-4 py-10 sm:px-6 print:p-[5mm]">
        {/* Tarjeta de dueño, frente: 85 × 55 mm */}
        <Corte nota="Tarjeta de dueño, frente. 85 × 55 mm">
          <div className="flex h-[55mm] w-[85mm] flex-col justify-between bg-lienzo px-[5mm] py-[4mm] text-tinta">
            <div className="flex items-start justify-between gap-[3mm]">
              <div>
                <p className="font-display text-[13pt] font-semibold leading-tight">{obra.titulo}</p>
                <p className="mt-[1mm] font-mono text-[6.5pt] text-verde">
                  {obra.registro} · {obra.tecnica} · {obra.medidas} · {anioTexto(obra)}
                </p>
              </div>
              <Isotipo size={26} />
            </div>
            <div className="rounded-[1.5mm] border border-dashed border-tinta/40 px-[2mm] py-[2mm] text-center">
              <p className="font-mono text-[5.5pt] uppercase tracking-[0.12em] text-verde">Tu código de dueño</p>
              <p className="font-mono text-[12pt] font-medium tracking-[0.2em]">{codigoDueno}</p>
            </div>
            <div className="flex items-end justify-between">
              <div className="w-[38mm] border-t border-tinta pt-[0.5mm] font-display text-[7pt] italic">Firma de {ARTISTA.nombre}</div>
              <p className="font-mono text-[5.5pt] text-verde">{urlCorta}</p>
            </div>
          </div>
        </Corte>

        {/* Tarjeta de dueño, reverso */}
        <Corte nota="Tarjeta de dueño, reverso">
          <div className="flex h-[55mm] w-[85mm] items-center gap-[5mm] bg-tinta px-[6mm] text-lienzo">
            <div className="rounded-[1mm] bg-lienzo p-[1.5mm]">
              <QR texto={`${url}/reclamar`} mm={24} />
            </div>
            <div>
              <p className="font-display text-[11pt] font-semibold leading-tight">Esta obra tiene historia.</p>
              <p className="mt-[1.5mm] text-[7pt] leading-snug text-lienzo/85">
                Escanea, raspa tu código y la obra queda a tu nombre. Es de un solo uso.
              </p>
              <p className="mt-[2mm] flex items-center gap-[1.5mm] font-mono text-[6pt] text-lienzo/70">
                <Isotipo size={12} variante="_claro" /> Registro Brai
              </p>
            </div>
          </div>
        </Corte>

        {/* Cara del sello NFC: 30 mm */}
        <Corte nota="Cara del sello NFC. 30 mm, va sobre el sticker">
          <div className="flex size-[30mm] flex-col items-center justify-center gap-[1mm] rounded-full bg-lienzo text-center">
            <Isotipo size={30} />
            <span className="text-[5.5pt] font-semibold leading-none">Acerca tu celular</span>
            <span className="font-mono text-[5pt] text-verde">{obra.registro}</span>
          </div>
        </Corte>

        {/* QR que va al lado del sello */}
        <Corte nota="QR junto al sello, para celulares sin NFC. 30 mm">
          <div className="flex w-[30mm] flex-col items-center gap-[1mm] bg-white">
            <QR texto={url} mm={26} />
            <span className="font-mono text-[5pt]">{urlCorta}</span>
          </div>
        </Corte>
      </main>

      <p className="mx-auto max-w-4xl px-4 pb-10 text-xs text-tinta/60 sm:px-6 print:hidden">
        El sello y el QR abren {url}. Antes de bloquear un sello, pruébalo en un iPhone y en un Android (memoria/tag-nfc-bloqueado-es-para-siempre.md).
      </p>
    </div>
  )
}
