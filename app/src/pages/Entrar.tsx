import { Link } from 'react-router'
import { Logo } from '../components/marca'

// Panel del artista: siguiente pantalla del prototipo (docs/PROTOTIPO.md, punto 4).
export default function Entrar() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-4 sm:px-6">
      <Logo />
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-verde">Panel del artista</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">Muy pronto.</h1>
      <p className="mt-4 leading-relaxed text-tinta/80">
        Aquí vas a registrar tus obras, ver quién tiene cada una e imprimir tus tarjetas de dueño.
      </p>
      <Link to="/" className="mt-8 text-terracota-btn hover:underline">
        Volver al inicio
      </Link>
    </main>
  )
}
