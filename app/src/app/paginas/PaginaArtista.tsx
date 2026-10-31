// Página del artista: su obra registrada, con su nombre al frente y el sello Brai abajo.
import { useEffect, useState } from "react";
import { obtenerDatos, type ArtistaPublico, type Datos } from "../datos/index.ts";
import { Enlace } from "../ruteo.tsx";
import { AvisoEjemplo, Contenedor, Esqueleto, SelloRegistroBrai } from "../componentes/marca.tsx";
import { Falla } from "./PaginaObra.tsx";

export function PaginaArtista({ slug }: { slug: string }) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [artista, setArtista] = useState<ArtistaPublico | null | undefined>(undefined);

  useEffect(() => {
    obtenerDatos().then(async (d) => {
      setDatos(d);
      setArtista(await d.artistaPublico(slug));
    }).catch(() => setArtista(null));
  }, [slug]);

  useEffect(() => {
    if (artista) document.title = `${artista.nombre}, obra registrada · Brai`;
  }, [artista]);

  if (artista === undefined || !datos) {
    return <Contenedor className="pt-16 space-y-4"><Esqueleto className="h-10 w-1/2" /><Esqueleto className="h-24 w-full" /></Contenedor>;
  }
  if (artista === null) return <Falla titulo="No encontramos a este artista" mensaje="Revisa la dirección o acerca tu celular al sello de una de sus obras." />;

  return (
    <div className="min-h-[100dvh] bg-lienzo">
      {artista.es_demo && <AvisoEjemplo />}
      <Contenedor className="pt-12">
        <p className="etiqueta">Obra registrada</p>
        <h1 className="mt-3 text-h1">{artista.nombre}</h1>
        {artista.ciudad && <p className="registro mt-3 text-chico text-verde">{artista.ciudad}</p>}
        {artista.bio && <p className="mt-6 max-w-prose">{artista.bio}</p>}
        {artista.instagram && (
          <a className="enlace mt-4 inline-block" href={`https://instagram.com/${artista.instagram}`} rel="noopener" target="_blank">
            Instagram de {artista.nombre}
          </a>
        )}

        <h2 className="etiqueta mt-12 border-t border-linea pt-6">{artista.obras.length} {artista.obras.length === 1 ? "obra" : "obras"}</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {artista.obras.map((o) => (
            <li key={o.codigo}>
              <Enlace href={`/o/${o.codigo}`} className="group block no-underline text-tinta">
                {o.foto
                  ? <img src={datos.urlFoto(o.foto)} alt="" loading="lazy" className="block w-full aspect-[4/5] object-cover rounded-sm" />
                  : <div className="w-full aspect-[4/5] rounded-sm bg-lienzo-hondo" />}
                <span className="galeria mt-3 block text-[1.0625rem] leading-snug group-hover:underline underline-offset-4">{o.titulo}</span>
                <span className="registro mt-1 block text-registro text-verde">
                  {o.registro}{o.anio ? ` · ${o.anio}` : ""}{o.reclamada ? " · con dueño" : ""}
                </span>
              </Enlace>
            </li>
          ))}
        </ul>
        <SelloRegistroBrai />
      </Contenedor>
    </div>
  );
}
