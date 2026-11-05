import { Link } from 'react-router'
import { Logo } from '../components/marca'

// Antes /entrar redirigía al panel sin pedir nada, como si fuera un login.
// Las cuentas de artista no existen todavía (TODO.md, sección 3): se dice.
export default function Entrar() {
  return (
    <main className="mx-auto flex min-h-[80dvh] max-w-md flex-col justify-center px-4 sm:px-6">
      <Logo />
      <h1 className="mt-10 font-display text-4xl font-semibold leading-tight">Todavía no hay cuentas.</h1>
      <p className="mt-4 leading-relaxed text-tinta/80">
        Brai es un prototipo. No existe un acceso para artistas ni contraseñas. Puedes ver el panel de ejemplo, con una artista y unos dueños
        ficticios.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link to="/panel" className="inline-flex items-center justify-center rounded-[10px] bg-terracota-btn px-6 py-3.5 font-semibold text-lienzo hover:bg-terracota-hover">
          Ver el panel de ejemplo
        </Link>
        <Link to="/demo" className="text-center text-terracota-btn hover:underline">
          Qué hace esta demo y qué no
        </Link>
      </div>
    </main>
  )
}
