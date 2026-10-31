import type { ReactNode } from "react";
import { reiniciarEjemplo } from "../datos/ejemplo.ts";

export function Isotipo({ tam = 28, variante = "color" }: { tam?: number; variante?: "color" | "claro" | "tinta" }) {
  const src = variante === "color" ? "/isotipo.svg" : variante === "claro" ? "/isotipo_claro.svg" : "/isotipo_tinta.svg";
  return <img src={src} width={tam} height={tam} alt="" aria-hidden="true" className="block flex-none" />;
}

// El sello chico que da la autoridad: registro externo, no la página del artista.
export function SelloRegistroBrai({ escaneos }: { escaneos?: number }) {
  return (
    <footer className="mt-16 border-t border-linea pt-6 pb-10">
      <a href="/" className="flex items-center gap-3 no-underline text-tinta w-fit">
        <Isotipo tam={30} />
        <span>
          <span className="block text-chico font-semibold">Registro Brai</span>
          <span className="block text-registro registro text-verde">Registro externo, independiente del artista</span>
        </span>
      </a>
      {typeof escaneos === "number" && escaneos > 0 && (
        <p className="mt-4 text-registro registro text-verde">
          Esta obra se ha tocado {escaneos} {escaneos === 1 ? "vez" : "veces"}.
        </p>
      )}
    </footer>
  );
}

export function AvisoEjemplo({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-tinta text-lienzo">
      <div className="mx-auto max-w-2xl px-4 py-2.5 flex items-center justify-between gap-3 text-chico">
        <span>{children ?? "Página de ejemplo. Los datos no son reales."}</span>
        <button
          type="button"
          className="underline underline-offset-4 text-lienzo/90 hover:text-lienzo flex-none cursor-pointer"
          onClick={() => {
            reiniciarEjemplo();
            location.reload();
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export function Esqueleto({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-lienzo-hondo ${className}`} aria-hidden="true" />;
}

export function Contenedor({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-2xl px-4 ${className}`}>{children}</div>;
}
