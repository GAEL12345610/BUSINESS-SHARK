import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { useRevela } from './components/movimiento'
import Landing from './pages/Landing'
import Obra from './pages/Obra'
import Reclamar from './pages/Reclamar'
import Entrar from './pages/Entrar'
import Artista from './pages/Artista'

// Solo el equipo la usa y trae el generador de QR: se carga aparte
const Imprimir = lazy(() => import('./pages/Imprimir'))
import NoEncontrada from './pages/NoEncontrada'

export default function App() {
  useRevela()
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Los sellos NFC apuntan aquí, siempre en brai.art (docs/DECISIONES.md #12) */}
      <Route path="/o/:codigo" element={<Obra />} />
      <Route path="/o/:codigo/reclamar" element={<Reclamar />} />
      <Route path="/a/:slug" element={<Artista />} />
      <Route path="/entrar" element={<Entrar />} />
      <Route
        path="/imprimir/:codigo"
        element={
          <Suspense fallback={null}>
            <Imprimir />
          </Suspense>
        }
      />
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  )
}
