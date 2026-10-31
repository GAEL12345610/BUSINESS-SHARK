import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router'
import { useEffect } from 'react'
import App from './App'
import { NOMBRE_PARA } from './data/demo'
import './index.css'

function ArribaAlCambiar() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const arbol = (
  <StrictMode>
    <BrowserRouter>
      <ArribaAlCambiar />
      <App />
    </BrowserRouter>
  </StrictMode>
)

const raiz = document.getElementById('root')!
// La landing llega prerenderizada (memoria/contenido-en-html-crudo.md): se hidrata.
// Cualquier otra ruta se pinta desde cero.
// Con ?para= el nombre cambia respecto al HTML prerenderizado: se pinta desde cero.
if (location.pathname === '/' && raiz.firstElementChild && !NOMBRE_PARA) hydrateRoot(raiz, arbol)
else {
  raiz.textContent = ''
  createRoot(raiz).render(arbol)
}
