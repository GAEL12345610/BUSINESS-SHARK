// Página de la obra: la cédula de museo. Aquí llega TODO escaneo NFC y QR.
// Dirección EDITORIAL (skill ui-frontend-brai).
import { useEffect, useState } from "react";
import { Check, CircleDashed, TriangleAlert } from "lucide-react";
import { obtenerDatos, fechaCorta, type Datos, type EstadoSello, type ObraPublica, type Via } from "../datos/index.ts";
import { Enlace, navegar } from "../ruteo.tsx";
import { AvisoEjemplo, Contenedor, Esqueleto, SelloRegistroBrai } from "../componentes/marca.tsx";

const contados = new Set<string>(); // un escaneo por carga de página, aunque React monte dos veces

export function PaginaObra({ codigo, query }: { codigo: string; query: URLSearchParams }) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [obra, setObra] = useState<ObraPublica | null | undefined>(undefined);
  const [sello, setSello] = useState<EstadoSello | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let vivo = true;
    const e = query.get("e");
    const c = query.get("c");
    const v = query.get("v");
    const via: Via = v === "n" ? "nfc" : v === "q" ? "qr" : "link";

    obtenerDatos()
      .then(async (d) => {
        if (!vivo) return;
        setDatos(d);
        if (e && c) {
          // Se limpia la URL: el enlace firmado sirve una sola vez y no debe quedar para compartirse.
          history.replaceState(null, "", `/o/${codigo}`);
          const estado = await d.verificarSello(codigo, e, c);
          if (vivo) setSello(estado);
        } else if (!contados.has(codigo)) {
          contados.add(codigo);
          d.registrarEscaneo(codigo, via).catch(() => {});
        }
        const o = await d.obraPublica(codigo);
        if (vivo) setObra(o);
      })
      .catch(() => vivo && setError(true));
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo]);

  useEffect(() => {
    if (obra) document.title = `${obra.titulo}, ${obra.artista.nombre} · Brai`;
  }, [obra]);

  if (error) return <Falla mensaje="No pudimos cargar la obra. Revisa tu conexión y vuelve a tocar el sello." />;
  if (obra === undefined || !datos) return <CargandoObra />;
  if (obra === null) return <ObraNoEncontrada codigo={codigo} />;

  const foto = obra.fotos[0] ? datos.urlFoto(obra.fotos[0]) : null;
  const sinDueno = obra.codigo_vivo && !obra.reclamada;
  const enTransferencia = obra.codigo_vivo && obra.reclamada;

  return (
    <div className="min-h-[100dvh] bg-lienzo">
      {obra.artista.es_demo && <AvisoEjemplo />}

      <header className="border-b border-linea">
        <Contenedor className="flex items-center justify-between py-3">
          <Enlace href={`/a/${obra.artista.slug}`} className="text-chico font-semibold text-tinta no-underline">
            {obra.artista.nombre}
          </Enlace>
          <span className="etiqueta">{obra.registro}</span>
        </Contenedor>
      </header>

      <main>
        {foto && (
          <div className="mx-auto max-w-2xl md:px-4 md:pt-8">
            <img
              src={foto}
              alt={`${obra.titulo}, obra de ${obra.artista.nombre}`}
              className="block w-full aspect-[4/5] object-cover md:rounded-sm"
              fetchPriority="high"
            />
          </div>
        )}

        <Contenedor className="pt-7">
          <p className="etiqueta">{obra.artista.nombre}</p>
          <h1 className="mt-2 text-h2">{obra.titulo}</h1>

          <dl className="registro mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-linea pt-4 text-chico">
            <dt className="text-verde">Registro</dt>
            <dd>{obra.registro}</dd>
            {obra.tecnica && (<><dt className="text-verde">Técnica</dt><dd>{obra.tecnica}</dd></>)}
            {obra.medidas && (<><dt className="text-verde">Medidas</dt><dd>{obra.medidas}</dd></>)}
            {obra.anio && (<><dt className="text-verde">Año</dt><dd>{obra.anio}</dd></>)}
          </dl>

          <Verificacion obra={obra} sello={sello} />

          {(sinDueno || enTransferencia) && (
            <section className="mt-8 border-t border-linea pt-6">
              <h2 className="text-h3">{sinDueno ? "¿Esta obra es tuya?" : "¿La acabas de recibir?"}</h2>
              <p className="mt-2 text-verde">
                Raspa el código de tu tarjeta de dueño y la obra queda a tu nombre. En esta página solo se verán tus iniciales.
              </p>
              <button type="button" className="btn btn-primario mt-5 w-full sm:w-auto" onClick={() => navegar(`/o/${obra.codigo}/reclamar`)}>
                Reclamar esta obra
              </button>
            </section>
          )}

          {obra.historia && (
            <section className="mt-10">
              <h2 className="etiqueta">Historia</h2>
              <p className="mt-3 text-cuerpo leading-relaxed">{obra.historia}</p>
            </section>
          )}

          {obra.fotos_huella.length > 0 && (
            <section className="mt-10">
              <h2 className="etiqueta">Fotos huella</h2>
              <p className="mt-3 text-chico text-verde">
                Detalles que solo tiene esta obra, fotografiados por el artista al registrarla. Compáralos con el cuadro que tienes enfrente.
              </p>
              <ul className="mt-4 grid grid-cols-3 gap-2">
                {obra.fotos_huella.map((f, i) => (
                  <li key={i}>
                    <img src={datos.urlFoto(f)} alt={`Detalle ${i + 1} de la obra`} loading="lazy" className="block w-full aspect-square object-cover rounded-sm" />
                    <span className="registro mt-1 block text-registro text-verde">Detalle {i + 1}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h2 className="etiqueta">Línea de tiempo</h2>
            <ol className="mt-4 border-l-2 border-terracota pl-5 space-y-4">
              {obra.eventos.map((ev, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-[7px] h-2.5 w-2.5 rounded-full bg-lienzo border-2 border-terracota" aria-hidden="true" />
                  <span className="registro block text-registro text-verde">{fechaCorta(ev.fecha)}</span>
                  <span className="block">{textoEvento(ev, obra.artista.nombre)}</span>
                </li>
              ))}
            </ol>
          </section>

          <SelloRegistroBrai escaneos={obra.escaneos} />
        </Contenedor>
      </main>
    </div>
  );
}

function textoEvento(ev: ObraPublica["eventos"][number], artista: string) {
  switch (ev.tipo) {
    case "registro": return `Registrada por ${artista}`;
    case "reclamo": return `Primer dueño: ${ev.dueno ?? "registrado"}`;
    case "transferencia": return `Cambió de dueño: ${ev.dueno ?? "registrado"}`;
    case "nota": return ev.nota ?? "";
  }
}

type Capa = { estado: "si" | "no" | "alerta"; titulo: string; detalle?: string };

function capas(obra: ObraPublica, sello: EstadoSello | null): Capa[] {
  const lista: Capa[] = [];
  if (obra.sello === "ntag424") {
    if (sello === "original") lista.push({ estado: "si", titulo: "Sello original", detalle: "Comprobado en este toque. Este sello no se puede copiar." });
    else if (sello === "enlace_repetido") lista.push({ estado: "alerta", titulo: "Este enlace ya se usó", detalle: "Cada toque al sello genera un enlace nuevo. Acerca tu celular al sello otra vez para comprobarlo." });
    else if (sello && sello !== "sin_verificar") lista.push({ estado: "alerta", titulo: "Este enlace no viene del sello de la obra", detalle: "Si tienes la obra enfrente, acerca tu celular al sello. Si el aviso sigue, escríbele al artista." });
    else lista.push({ estado: "no", titulo: "Sello seguro sin comprobar", detalle: "Acerca tu celular al sello de la obra para comprobar que es el original." });
  } else if (obra.sello === "ntag213") {
    lista.push({ estado: "si", titulo: "Sello NFC con número de registro" });
  }
  lista.push(
    obra.fotos_huella.length > 0
      ? { estado: "si", titulo: `${obra.fotos_huella.length} fotos huella`, detalle: "Para comparar con el cuadro." }
      : { estado: "no", titulo: "Sin fotos huella" },
  );
  lista.push(
    obra.reclamada
      ? { estado: "si", titulo: "Dueño registrado", detalle: "El dueño reclamó la obra con su código de un solo uso." }
      : { estado: "no", titulo: "Todavía sin dueño registrado" },
  );
  return lista;
}

function Verificacion({ obra, sello }: { obra: ObraPublica; sello: EstadoSello | null }) {
  return (
    <section className="mt-7" aria-label="Verificación">
      <div className="flex items-start gap-3 rounded-lg bg-dorado-fondo px-4 py-3.5">
        <span className="punto-dorado mt-[7px]" aria-hidden="true" />
        <p className="font-semibold leading-snug">
          Registrada por {obra.artista.nombre}
          <span className="registro block text-registro font-normal text-verde mt-0.5">el {fechaCorta(obra.registrada_en)}</span>
        </p>
      </div>
      <ul className="mt-4 space-y-3">
        {capas(obra, sello).map((c) => (
          <li key={c.titulo} className="flex gap-3">
            {c.estado === "si" && <Check size={18} strokeWidth={2.25} className="mt-[3px] flex-none text-verde" aria-label="Sí" />}
            {c.estado === "no" && <CircleDashed size={18} className="mt-[3px] flex-none text-verde/70" aria-label="Pendiente" />}
            {c.estado === "alerta" && <TriangleAlert size={18} className="mt-[3px] flex-none text-terracota-btn" aria-label="Atención" />}
            <span>
              <span className={`block ${c.estado === "alerta" ? "font-semibold text-terracota-active" : ""}`}>{c.titulo}</span>
              {c.detalle && <span className="block text-chico text-verde">{c.detalle}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CargandoObra() {
  return (
    <div className="min-h-[100dvh] bg-lienzo" aria-busy="true" aria-label="Cargando la obra">
      <div className="mx-auto max-w-2xl md:px-4 md:pt-8"><Esqueleto className="w-full aspect-[4/5] rounded-none md:rounded-sm" /></div>
      <Contenedor className="pt-7 space-y-3">
        <Esqueleto className="h-3 w-32" />
        <Esqueleto className="h-8 w-3/4" />
        <Esqueleto className="h-24 w-full mt-5" />
      </Contenedor>
    </div>
  );
}

function ObraNoEncontrada({ codigo }: { codigo: string }) {
  return (
    <Falla
      titulo="No encontramos esta obra"
      mensaje={`El código ${codigo.toUpperCase()} no está en el registro. Revisa que esté bien escrito, o acerca tu celular al sello otra vez.`}
    />
  );
}

export function Falla({ titulo = "Algo salió mal", mensaje }: { titulo?: string; mensaje: string }) {
  return (
    <div className="min-h-[100dvh] bg-lienzo">
      <Contenedor className="pt-16">
        <p className="etiqueta">Registro Brai</p>
        <h1 className="mt-3 text-h2">{titulo}</h1>
        <p className="mt-4 text-verde">{mensaje}</p>
        <a href="/" className="btn btn-secundario mt-8">Ir a Brai</a>
      </Contenedor>
    </div>
  );
}
