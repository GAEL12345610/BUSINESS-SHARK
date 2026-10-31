import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "../estilos/base.css";
import "../estilos/impresion.css";
import { useRuta } from "./ruteo.tsx";
import { PaginaObra, Falla } from "./paginas/PaginaObra.tsx";
import { Reclamar } from "./paginas/Reclamar.tsx";
import { PaginaArtista } from "./paginas/PaginaArtista.tsx";
// El panel (formularios, QR) solo lo usa el artista: no se descarga en cada escaneo.
const Panel = lazy(() => import("./paginas/Panel.tsx").then((m) => ({ default: m.Panel })));

function App() {
  const { ruta, query } = useRuta();
  let m: RegExpMatchArray | null;
  if ((m = ruta.match(/^\/o\/([A-Za-z0-9]{5})\/reclamar\/?$/))) return <Reclamar codigo={m[1].toUpperCase()} />;
  if ((m = ruta.match(/^\/o\/([A-Za-z0-9]{5})\/?$/))) return <PaginaObra key={m[1]} codigo={m[1].toUpperCase()} query={query} />;
  if ((m = ruta.match(/^\/a\/([a-z0-9-]{3,40})\/?$/i))) return <PaginaArtista slug={m[1].toLowerCase()} />;
  if (/^\/panel(\/|$)/.test(ruta)) return <Suspense fallback={null}><Panel ruta={ruta} /></Suspense>;
  return <Falla titulo="Esta página no existe" mensaje="Si llegaste aquí tocando un sello, acércalo otra vez." />;
}

createRoot(document.getElementById("raiz")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
