// Panel del artista, versión DEMO (sin Supabase todavía). Dirección PRODUCTO
// (skill ui-frontend-brai): Schibsted sola, monoespaciada en registros y fechas.
// Es la pantalla que le vende Brai al artista: aquí ve quién tiene cada obra.
import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Check, Mail, Plus, Printer } from 'lucide-react'
import { Logo } from '../components/marca'
import { Punto } from '../components/punto'
import { ARTISTA, CODIGO_DEMO, MODO_JOSE_LUIS, fecha, panel, registrarObra, reiniciarDemo, type Obra } from '../data/demo'

/** Achica la foto en el navegador para que quepa en la demo (máx. 900 px, JPG). */
async function achicar(archivo: File): Promise<string> {
  const url = URL.createObjectURL(archivo)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    const k = Math.min(1, 900 / Math.max(img.width, img.height))
    const c = document.createElement('canvas')
    c.width = Math.round(img.width * k)
    c.height = Math.round(img.height * k)
    c.getContext('2d')?.drawImage(img, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.82)
  } finally {
    URL.revokeObjectURL(url)
  }
}

function Cifra({ valor, nombre, nota }: { valor: number; nombre: string; nota?: string }) {
  return (
    <div className="py-5 pr-4">
      <dt className="text-sm text-tinta/70">{nombre}</dt>
      <dd className="mt-1 font-mono text-3xl tabular-nums">{valor}</dd>
      {nota && <dd className="mt-1 font-mono text-[10px] text-verde">{nota}</dd>}
    </div>
  )
}

export default function Panel() {
  const [version, setVersion] = useState(0)
  const filas = useMemo(() => panel(), [version])
  const coleccionistas = filas.filter((f) => f.dueno)
  const toques = filas.reduce((s, f) => s + f.toques, 0)
  const primerNombre = ARTISTA.nombre.split(' ')[0]

  const [escribiendo, setEscribiendo] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [mensaje, setMensaje] = useState(
    `Hola. Soy ${ARTISTA.nombre}. Como tienes una de mis obras, quería que fueras de los primeros en ver la nueva antes de que salga a la venta. Si quieres pasar al taller a verla, respóndeme este correo.`,
  )

  const [registrando, setRegistrando] = useState(false)
  const [nueva, setNueva] = useState<Obra | null>(null)

  return (
    <div className="min-h-[100dvh] bg-white">
      <header className="border-b border-linea bg-lienzo">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden font-mono text-xs uppercase tracking-[0.14em] text-verde sm:inline">Panel</span>
          </div>
          <Link to={`/a/${ARTISTA.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-terracota-btn hover:underline">
            Mi página <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>
      <p className="bg-arena px-4 py-2 text-center text-[12px] leading-snug text-tinta/80">
        {MODO_JOSE_LUIS
          ? 'Demostración para José Luis. Sus obras salen de fuentes públicas y ninguna está registrada todavía.'
          : 'Así se ve tu panel. Los datos son de ejemplo.'}{' '}
        Lo que hagas aquí se guarda solo en este navegador.{' '}
        <button
          type="button"
          onClick={() => {
            if (confirm('¿Borrar lo que se reclamó y registró en esta demo?')) {
              reiniciarDemo()
              setVersion((v) => v + 1)
              setNueva(null)
            }
          }}
          className="underline underline-offset-2"
        >
          Reiniciar demo
        </button>
      </p>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-[-0.01em] sm:text-4xl">Hola, {primerNombre}.</h1>
        <p className="mt-2 text-tinta/75">Esto es lo que pasa con tus obras.</p>

        <dl className="mt-8 grid grid-cols-3 border-y border-linea">
          <Cifra valor={filas.length} nombre="Obras registradas" />
          <Cifra valor={coleccionistas.length} nombre="Con dueño" />
          <Cifra valor={toques} nombre="Toques al sello" nota="ejemplo" />
        </dl>

        {/* Coleccionistas: el corazón de Brai para el artista */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Quién tiene tu obra</h2>
              <p className="mt-1 text-sm text-tinta/70">En la página pública solo salen sus iniciales. Su correo lo ves solo tú.</p>
            </div>
            {coleccionistas.length > 0 && !escribiendo && (
              <button
                type="button"
                onClick={() => {
                  setEscribiendo(true)
                  setEnviado(false)
                }}
                className="inline-flex items-center gap-2 rounded-[10px] bg-terracota-btn px-4 py-2.5 text-sm font-semibold text-lienzo hover:bg-terracota-hover"
              >
                <Mail size={16} /> Avisarles de tu obra nueva
              </button>
            )}
          </div>

          {coleccionistas.length === 0 ? (
            <p className="mt-6 rounded-xl bg-lienzo px-5 py-4 text-sm text-tinta/80">
              Cuando alguien reclame una de tus obras, aparece aquí con su correo.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-linea border-y border-linea">
              {coleccionistas.map(({ obra, dueno }) => (
                <li key={obra.codigo} className="grid gap-1 py-4 sm:grid-cols-[1.2fr_1.4fr_1fr] sm:items-center sm:gap-4">
                  <span className="font-semibold">{dueno!.nombre}</span>
                  <span className="font-mono text-sm text-tinta/80">{dueno!.correo}</span>
                  <span className="text-sm text-tinta/70">
                    <span className="font-medium text-tinta">{obra.titulo}</span> · desde <span className="font-mono">{fecha(dueno!.desde)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {escribiendo && (
            <div className="entra mt-5 rounded-2xl bg-lienzo p-5">
              {enviado ? (
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 shrink-0 text-verde" size={20} />
                  <p className="text-sm leading-relaxed">
                    En la versión real, a {coleccionistas.length === 1 ? 'tu coleccionista le llega' : `tus ${coleccionistas.length} coleccionistas les llega`} este
                    correo de tu parte. Hoy es una demostración: no se mandó nada.
                  </p>
                </div>
              ) : (
                <>
                  <label htmlFor="mensaje" className="block text-sm font-semibold">
                    Mensaje para {coleccionistas.length} {coleccionistas.length === 1 ? 'coleccionista' : 'coleccionistas'}
                  </label>
                  <textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-[10px] border border-tinta/20 bg-white px-3.5 py-3 text-[15px] leading-relaxed focus:border-tinta focus:outline-none"
                  />
                  <div className="mt-3 flex gap-3">
                    <button type="button" onClick={() => setEnviado(true)} className="rounded-[10px] bg-terracota-btn px-4 py-2.5 text-sm font-semibold text-lienzo hover:bg-terracota-hover">
                      Mandar
                    </button>
                    <button type="button" onClick={() => setEscribiendo(false)} className="rounded-[10px] px-3 py-2.5 text-sm text-tinta/70 hover:text-tinta">
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <p className="mt-4 text-[13px] text-tinta/65">
            Pruébalo: abre una obra sin dueño, reclámala con el código <span className="font-mono text-tinta">{CODIGO_DEMO}</span> y tu correo, y vuelve aquí.
          </p>
        </section>

        {/* Obras */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-xl font-semibold">Tus obras</h2>
            {!registrando && (
              <button
                type="button"
                onClick={() => {
                  setRegistrando(true)
                  setNueva(null)
                }}
                className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-tinta px-4 py-2 text-sm font-semibold hover:bg-tinta/5"
              >
                <Plus size={16} /> Registrar obra
              </button>
            )}
          </div>

          {registrando && (
            <Registrar
              alTerminar={(o) => {
                setNueva(o)
                setRegistrando(false)
                setVersion((v) => v + 1)
              }}
              alCancelar={() => setRegistrando(false)}
            />
          )}

          {nueva && (
            <div className="entra mt-5 flex flex-col items-start gap-5 rounded-2xl bg-lienzo p-6 sm:flex-row sm:items-center">
              <Punto tam={84} estado="feliz" />
              <div>
                <p className="font-mono text-xs text-verde">{nueva.registro} · brai.art/o/{nueva.codigo}</p>
                <p className="mt-1 text-lg font-semibold">{nueva.titulo} quedó registrada.</p>
                <p className="mt-1 text-sm text-tinta/75">Ahora imprime su tarjeta y su sello, y entrégala firmada.</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
                  <Link to={`/imprimir/${nueva.codigo}`} className="inline-flex items-center gap-1.5 text-terracota-btn hover:underline">
                    <Printer size={16} /> Piezas para imprimir
                  </Link>
                  <Link to={`/o/${nueva.codigo}`} className="inline-flex items-center gap-1.5 text-terracota-btn hover:underline">
                    Ver su página <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <ul className="mt-5 divide-y divide-linea border-y border-linea">
            {filas.map(({ obra, dueno, toques: t }) => (
              <li key={obra.codigo} className="flex gap-4 py-4">
                <img src={obra.imagen} alt="" className="h-20 w-16 shrink-0 rounded-sm object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] text-verde">
                    {obra.registro} · {obra.codigo} · {t} toques
                  </p>
                  <p className="mt-0.5 font-semibold leading-snug">{obra.titulo}</p>
                  <p className="mt-1 text-sm">
                    {dueno ? (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="size-2 rounded-full bg-dorado" /> Con dueño: {dueno.nombre}
                      </span>
                    ) : (
                      <span className="text-tinta/65">Esperando a su dueño</span>
                    )}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
                    <Link to={`/o/${obra.codigo}`} className="text-terracota-btn hover:underline">
                      Ver página
                    </Link>
                    <Link to={`/imprimir/${obra.codigo}`} className="text-terracota-btn hover:underline">
                      Imprimir piezas
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

function Registrar({ alTerminar, alCancelar }: { alTerminar: (o: Obra) => void; alCancelar: () => void }) {
  const [f, setF] = useState({ titulo: '', tecnica: '', medidas: '', anio: String(new Date().getFullYear()), historia: '' })
  const [imagen, setImagen] = useState('')
  const [error, setError] = useState<string | null>(null)
  const campo = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const clase = 'mt-1.5 w-full rounded-[10px] border border-tinta/20 bg-white px-3.5 py-3 focus:border-tinta focus:outline-none'

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const anio = Number(f.anio)
    if (!f.titulo.trim()) return setError('Ponle título a la obra.')
    if (!Number.isInteger(anio) || anio < 1900 || anio > 2100) return setError('El año no parece correcto.')
    alTerminar(registrarObra({ ...f, titulo: f.titulo.trim(), anio, imagen }))
  }

  return (
    <form onSubmit={enviar} className="entra mt-5 grid gap-4 rounded-2xl bg-lienzo p-5 sm:grid-cols-2">
      <label className="text-sm font-semibold sm:col-span-2">
        Título
        <input value={f.titulo} onChange={campo('titulo')} maxLength={120} className={clase} autoFocus />
      </label>
      <label className="text-sm font-semibold">
        Técnica
        <input value={f.tecnica} onChange={campo('tecnica')} placeholder="Óleo sobre tela" className={clase} />
      </label>
      <label className="text-sm font-semibold">
        Medidas
        <input value={f.medidas} onChange={campo('medidas')} placeholder="60 × 80 cm" className={clase} />
      </label>
      <label className="text-sm font-semibold">
        Año
        <input value={f.anio} onChange={campo('anio')} inputMode="numeric" maxLength={4} className={`${clase} font-mono`} />
      </label>
      <label className="text-sm font-semibold">
        Foto de la obra
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={async (e) => {
            const a = e.target.files?.[0]
            if (a) setImagen(await achicar(a))
          }}
          className="mt-2.5 block w-full text-sm font-normal"
        />
      </label>
      <label className="text-sm font-semibold sm:col-span-2">
        Historia
        <textarea value={f.historia} onChange={campo('historia')} rows={3} placeholder="Cómo nació la obra. Esto lo lee quien toque el sello." className={clase} />
      </label>
      {error && <p role="alert" className="text-sm text-terracota-active sm:col-span-2">{error}</p>}
      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" className="rounded-[10px] bg-terracota-btn px-5 py-3 font-semibold text-lienzo hover:bg-terracota-hover">
          Registrar
        </button>
        <button type="button" onClick={alCancelar} className="rounded-[10px] px-3 py-3 text-tinta/70 hover:text-tinta">
          Cancelar
        </button>
      </div>
    </form>
  )
}
