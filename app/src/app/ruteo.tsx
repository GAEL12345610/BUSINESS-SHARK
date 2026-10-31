// Ruteo mínimo (4 rutas). Sin librería: la página de la obra tiene que cargar
// rápido en un celular con datos, y cada KB cuenta.
import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

const escuchar = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};
const leer = () => location.pathname + location.search;

export function useRuta() {
  const completa = useSyncExternalStore(escuchar, leer);
  const [ruta, query = ""] = completa.split("?");
  return { ruta, query: new URLSearchParams(query) };
}

export function navegar(a: string, reemplazar = false) {
  if (reemplazar) history.replaceState(null, "", a);
  else history.pushState(null, "", a);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function Enlace({ href, onClick, ...resto }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const alClic = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!href.startsWith("/") || /^\/($|privacidad)/.test(href)) return; // landing y privacidad son otra página
    e.preventDefault();
    navegar(href);
  };
  return <a href={href} onClick={alClic} {...resto} />;
}
