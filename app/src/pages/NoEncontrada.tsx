import { Link } from 'react-router'
import { Logo } from '../components/marca'

export default function NoEncontrada() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-4 sm:px-6">
      <Logo />
      <h1 className="mt-10 font-display text-4xl font-semibold leading-tight">No encontramos esta obra.</h1>
      <p className="mt-4 leading-relaxed text-tinta/80">
        Revisa que el enlace esté completo. Si acercaste el celular a un sello y llegaste aquí, avísale al artista: puede que el sello
        tenga un error.
      </p>
      <Link to="/" className="mt-8 text-terracota-btn hover:underline">
        Ir al inicio de Brai
      </Link>
    </main>
  )
}
