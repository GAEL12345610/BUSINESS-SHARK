import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { useRevela } from './components/movimiento'
import Landing from './pages/Landing'
import Obra from './pages/Obra'
import Reclamar from './pages/Reclamar'
import Artista from './pages/Artista'

// Solo el equipo la usa y trae el generador de QR: se carga aparte
const Imprimir = lazy(() => import('./pages/Imprimir'))
import NoEncontrada from './pages/NoEncontrada'
const Marca = lazy(() => import('./pages/Marca'))
const Panel = lazy(() => import('./pages/Panel'))
const Recorrido = lazy(() => import('./pages/Recorrido'))

export default function App() {
  useRevela()
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Los sellos NFC apuntan aquí, siempre en brai.art (docs/DECISIONES.md #12) */}
      <Route path="/o/:codigo" element={<Obra />} />
      <Route path="/o/:codigo/reclamar" element={<Reclamar />} />
      <Route path="/a/:slug" element={<Artista />} />
      <Route path="/entrar" element={<Navigate to="/panel" replace />} />
      {/* Demo para José Luis Malo (DECISIONES #42): activa su modo y abre el recorrido */}
      <Route path="/jose-luis" element={<Navigate to="/recorrido" replace />} />
      <Route
        path="/panel"
        element={
          <Suspense fallback={null}>
            <Panel />
          </Suspense>
        }
      />
      <Route
        path="/imprimir/:codigo"
        element={
          <Suspense fallback={null}>
            <Imprimir />
          </Suspense>
        }
      />
      <Route
        path="/recorrido"
        element={
          <Suspense fallback={null}>
            <Recorrido />
          </Suspense>
        }
      />
      <Route
        path="/marca"
        element={
          <Suspense fallback={null}>
            <Marca />
          </Suspense>
        }
      />
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  )
}
