// "Qué hace esta demo y qué no" (docs/DEMO_HONESTA.md). Es la página a la que
// lleva el aviso de DEMO. Si algo cambia en la app (por ejemplo, se conecta
// Supabase), se cambia aquí en el mismo commit.
import { Link } from 'react-router'
import { ArrowRight, Check, X } from 'lucide-react'
import { Logo } from '../components/marca'
import { CODIGO_DEMO, CORREO_PRUEBA, OBRAS } from '../data/demo'

const SI = [
  'Ver la página de una obra: ficha, historia, fotos huella y línea de dueños.',
  `Raspar una tarjeta y reclamar una obra con el código ${CODIGO_DEMO} y un correo inventado como ${CORREO_PRUEBA}.`,
  'Ver ese reclamo en el panel del artista, en el mismo navegador.',
  'Registrar una obra de prueba en el panel y ver sus piezas para imprimir.',
  'Comparar las dos formas de precio con tus propios números.',
]

const NO = [
  'No hay cuentas ni contraseñas. El panel lo abre cualquiera: es un ejemplo.',
  'No hay servidor ni base de datos conectada. Lo que haces no sale de tu navegador.',
  'No se manda ningún correo. "Avisarles de tu obra nueva" es una simulación.',
  `El código ${CODIGO_DEMO} es público y sirve para todas las obras. No es seguro ni de un solo uso.`,
  'La huella del registro es de muestra. No prueba autenticidad ni quién es dueño legalmente.',
  'No hay sellos NFC funcionando. El QR de la hoja de impresión abre esta demo, nada más.',
  'No hay video del artista ni fotos reales de obras.',
]

const DATOS = [
  ['Lucía Arce', 'Artista ficticia. No existe.'],
  ['Mariana Ruiz, Andrés Gómez, M. R.', 'Dueños ficticios. Sus correos terminan en @example.com, un dominio que no llega a nadie.'],
  ['Obras de Lucía', 'Pinturas generadas por el equipo. No son de ningún artista.'],
  ['Registros BRAI-0001 y siguientes', 'Números de muestra. Ninguna obra está registrada de verdad.'],
  ['Toques al sello', 'Cifras de ejemplo, no medidas.'],
  ['José Luis Malo (solo en /jose-luis)', 'Persona real. Solo se usan datos públicos con su fuente, sin fotos, sin dueños y sin citas suyas. Él no ha revisado ni aprobado esta demo.'],
]

export default function Demo() {
  const obra = OBRAS[0]
  return (
    <>
      <header className="border-b border-linea">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Logo />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-verde">Sobre esta demo</span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">Prototipo de estudiantes</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-[-0.015em] sm:text-5xl">Qué hace esta demo y qué no.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-tinta/85">
          Brai es una idea en prueba: registrar la procedencia de cada obra que vende un artista y, cuando el comprador la reclama, que el artista
          pueda volver a escribirle. Esta página es un prototipo para enseñar cómo se vería. No es un servicio funcionando.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/recorrido" className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-terracota-btn px-6 py-3.5 font-semibold text-lienzo hover:bg-terracota-hover">
            Recorrer la demo en 5 minutos <ArrowRight size={18} />
          </Link>
          <Link to={`/o/${obra.codigo}`} className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-tinta px-6 py-3.5 font-semibold hover:bg-tinta/5">
            Ver una obra de ejemplo
          </Link>
        </div>

        <section className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Lo que sí puedes probar</h2>
            <ul className="mt-4 space-y-3 border-t border-tinta pt-4">
              {SI.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 shrink-0 text-verde" size={20} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Lo que todavía no existe</h2>
            <ul className="mt-4 space-y-3 border-t border-linea pt-4 text-tinta/85">
              {NO.map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">Qué guarda tu navegador</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-tinta/85">
            Los reclamos y las obras de prueba se guardan en el almacenamiento local de este navegador (localStorage). Siguen ahí aunque cierres la
            pestaña, hasta que toques <span className="font-semibold">Reiniciar demo</span> en el aviso de arriba o borres los datos del sitio. No
            se comparten entre celulares: lo que reclamas en uno no aparece en otro.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">Personas y datos ficticios</h2>
          <dl className="mt-4 divide-y divide-linea border-y border-linea">
            {DATOS.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-tinta/80">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">El precio</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-tinta/85">
            La Opción A (7,500 MXN de arranque y 990 MXN al mes) es el precio publicado, todavía sin validar con ningún artista. La Opción B (2,500
            MXN de arranque y 450 MXN por obra adicional) es una alternativa en prueba. Nadie ha pagado nada: no hay cobros en este sitio.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">Contacto</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-tinta/85">
            El correo del proyecto todavía no existe: lo está definiendo el equipo con un adulto. Por eso este sitio no tiene formulario de
            contacto ni pide tus datos.
          </p>
        </section>
      </main>
    </>
  )
}
