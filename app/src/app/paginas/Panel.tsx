// Panel del artista. Dirección PRODUCTO: Schibsted sola, mono en IDs y fechas.
import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { renderSVG } from "uqr";
import { Plus, Printer, ExternalLink, LogOut } from "lucide-react";
import { obtenerDatos, fechaCorta, type ArtistaPanel, type Datos, type ObraPanel, type TipoSello } from "../datos/index.ts";
import { Enlace, navegar } from "../ruteo.tsx";
import { AvisoEjemplo, Esqueleto, Isotipo } from "../componentes/marca.tsx";

// Regla 4 de CLAUDE.md: los sellos SIEMPRE apuntan a brai.art, aunque estés en local.
const BASE_SELLOS = "https://brai.art";
const MAX_BYTES = 5 * 1024 * 1024;
const TIPOS_FOTO = ["image/jpeg", "image/png", "image/webp"];

export function Panel({ ruta }: { ruta: string }) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [sesion, setSesion] = useState<{ email: string } | null | undefined>(undefined);
  const [artista, setArtista] = useState<ArtistaPanel | null | undefined>(undefined);

  const cargar = useCallback(async () => {
    const d = await obtenerDatos();
    setDatos(d);
    const s = await d.sesion();
    setSesion(s);
    setArtista(s ? await d.miArtista() : null);
  }, []);

  useEffect(() => {
    document.title = "Panel del artista · Brai";
    cargar();
  }, [cargar]);

  if (!datos || sesion === undefined || (sesion && artista === undefined)) {
    return <Marco><div className="space-y-3"><Esqueleto className="h-8 w-48" /><Esqueleto className="h-40 w-full" /></div></Marco>;
  }
  if (!sesion) return <Marco ejemplo={datos.modo === "ejemplo"}><Entrar datos={datos} alEntrar={cargar} /></Marco>;
  if (!artista) {
    return (
      <Marco>
        <h1 className="text-h3">Tu cuenta todavía no está ligada a un artista</h1>
        <p className="mt-3 text-verde">Entraste como <span className="registro">{sesion.email}</span>. El equipo de Brai liga tu cuenta en la sesión de arranque.</p>
        <button type="button" className="btn btn-secundario mt-6" onClick={async () => { await datos.salir(); cargar(); }}>Salir</button>
      </Marco>
    );
  }

  const salir = async () => { await datos.salir(); navegar("/panel", true); cargar(); };
  const sub = ruta.replace(/^\/panel\/?/, "");
  let contenido: ReactNode;
  if (sub === "nueva") contenido = <RegistrarObra datos={datos} artista={artista} />;
  else if (sub.startsWith("tarjeta/")) contenido = <Tarjeta datos={datos} obraId={sub.slice(8)} artista={artista} />;
  else contenido = <ListaObras datos={datos} artista={artista} />;

  return <Marco ejemplo={artista.es_demo} artista={artista} alSalir={salir}>{contenido}</Marco>;
}

function Marco({ children, ejemplo, artista, alSalir }: { children: ReactNode; ejemplo?: boolean; artista?: ArtistaPanel; alSalir?: () => void }) {
  return (
    <div className="min-h-[100dvh] bg-blanco">
      {ejemplo && <div className="no-imprimir"><AvisoEjemplo>Panel de ejemplo. Lo que registres aquí vive solo en este navegador.</AvisoEjemplo></div>}
      <header className="no-imprimir border-b border-linea bg-lienzo">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <Enlace href="/panel" className="flex items-center gap-2 font-semibold text-tinta no-underline">
            <Isotipo tam={24} /> Brai <span className="font-normal text-verde">· panel</span>
          </Enlace>
          {artista && (
            <div className="flex items-center gap-3 text-chico">
              <span className="hidden sm:inline text-verde">{artista.nombre}</span>
              <button type="button" onClick={alSalir} className="inline-flex items-center gap-1.5 text-verde hover:text-tinta cursor-pointer min-h-11">
                <LogOut size={16} /> Salir
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}

function Entrar({ datos, alEntrar }: { datos: Datos; alEntrar: () => void }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; mensaje: string } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const ejemplo = datos.modo === "ejemplo";

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    const r = await datos.entrar(email.trim());
    setEnviando(false);
    setMsg(r);
    if (r.ok && ejemplo) alEntrar();
  };

  return (
    <div className="max-w-sm">
      <h1 className="text-h3">Entra a tu panel</h1>
      <p className="mt-2 text-verde">Te mandamos un enlace a tu correo. Sin contraseñas.</p>
      {ejemplo ? (
        <button type="button" className="btn btn-primario mt-6 w-full" onClick={enviar} disabled={enviando}>Entrar al panel de ejemplo</button>
      ) : (
        <form onSubmit={enviar} className="mt-6 space-y-4">
          <div>
            <label htmlFor="correo" className="block font-semibold">Tu correo</label>
            <input id="correo" type="email" className="campo mt-2" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </div>
          <button type="submit" className="btn btn-primario w-full" disabled={enviando || !email.includes("@")}>Mandarme el enlace</button>
        </form>
      )}
      {msg && <p role="status" className={`mt-4 text-chico ${msg.ok ? "text-verde" : "text-terracota-active"}`}>{msg.mensaje}</p>}
    </div>
  );
}

function ListaObras({ datos, artista }: { datos: Datos; artista: ArtistaPanel }) {
  const [obras, setObras] = useState<ObraPanel[] | null>(null);
  useEffect(() => { datos.panelObras().then(setObras); }, [datos]);

  const resumen = useMemo(() => {
    if (!obras) return null;
    return {
      total: obras.length,
      conDueno: obras.filter((o) => o.dueno).length,
      toques: obras.reduce((s, o) => s + o.escaneos, 0),
    };
  }, [obras]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h3">Tus obras</h1>
          <Enlace href={`/a/${artista.slug}`} className="enlace text-chico">Ver tu página pública</Enlace>
        </div>
        <button type="button" className="btn btn-primario" onClick={() => navegar("/panel/nueva")}><Plus size={18} /> Registrar obra</button>
      </div>

      {resumen && (
        <dl className="mt-8 grid grid-cols-3 border-y border-linea">
          {[["Obras", resumen.total], ["Con dueño", resumen.conDueno], ["Toques al sello", resumen.toques]].map(([k, v]) => (
            <div key={k} className="py-4 pr-3">
              <dt className="text-chico text-verde">{k}</dt>
              <dd className="registro mt-1 text-h3">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {!obras && <div className="mt-6 space-y-3">{[0, 1, 2].map((i) => <Esqueleto key={i} className="h-20 w-full" />)}</div>}
      {obras && obras.length === 0 && (
        <p className="mt-10 text-verde">Todavía no registras ninguna obra. Empieza por la que vas a entregar primero.</p>
      )}
      {obras && obras.length > 0 && (
        <ul className="mt-2 divide-y divide-linea">
          {obras.map((o) => (
            <li key={o.id} className="flex gap-4 py-5">
              {o.foto
                ? <img src={datos.urlFoto(o.foto)} alt="" className="h-20 w-16 flex-none rounded-sm object-cover" loading="lazy" />
                : <div className="h-20 w-16 flex-none rounded-sm bg-lienzo-hondo" />}
              <div className="min-w-0 flex-1">
                <p className="registro text-registro text-verde">{o.registro} · {o.codigo} · {etiquetaSello(o.sello)}</p>
                <p className="mt-0.5 font-semibold leading-snug">{o.titulo}</p>
                <p className="mt-1 text-chico">
                  {o.dueno
                    ? <>Dueño: {o.dueno.nombre} <span className="registro text-verde">{o.dueno.email}</span> <span className="text-verde">desde {fechaCorta(o.dueno.desde)}</span></>
                    : <span className="text-verde">{o.codigo_vivo ? "Tarjeta lista, esperando a su dueño" : "Sin tarjeta todavía"}</span>}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-chico">
                  <button type="button" className="btn-fantasma inline-flex items-center gap-1.5 cursor-pointer" onClick={() => navegar(`/panel/tarjeta/${o.id}`)}>
                    <Printer size={16} /> {o.codigo_vivo || o.dueno ? "Tarjeta nueva" : "Imprimir tarjeta"}
                  </button>
                  <Enlace href={`/o/${o.codigo}`} className="btn-fantasma inline-flex items-center gap-1.5"><ExternalLink size={16} /> Ver página</Enlace>
                  <span className="registro self-center text-registro text-verde">{o.escaneos} toques</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function etiquetaSello(s: TipoSello) {
  return s === "ntag424" ? "424 DNA" : s === "ntag213" ? "NFC" : "solo QR";
}

function validarFotos(archivos: File[], max: number): string | null {
  if (archivos.length > max) return `Máximo ${max} fotos.`;
  for (const f of archivos) {
    if (!TIPOS_FOTO.includes(f.type)) return `${f.name}: solo JPG, PNG o WebP.`;
    if (f.size > MAX_BYTES) return `${f.name} pesa más de 5 MB. Bájale la calidad o mándala por WhatsApp a ti mismo.`;
  }
  return null;
}

function RegistrarObra({ datos, artista }: { datos: Datos; artista: ArtistaPanel }) {
  const [f, setF] = useState({ titulo: "", tecnica: "", medidas: "", anio: String(new Date().getFullYear()), historia: "", sello: "ntag213" as TipoSello });
  const [fotos, setFotos] = useState<File[]>([]);
  const [huellas, setHuellas] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const cambiar = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    const err = validarFotos(fotos, 1) ?? validarFotos(huellas, 3);
    if (err) return setError(err);
    const anio = f.anio ? Number(f.anio) : null;
    if (anio !== null && (!Number.isInteger(anio) || anio < 1900 || anio > 2100)) return setError("El año no parece correcto.");
    setError(null);
    setEnviando(true);
    try {
      const r = await datos.registrarObra(artista.id, { ...f, anio, fotos, fotos_huella: huellas });
      navegar(`/panel/tarjeta/${r.id}`, true);
    } catch (x) {
      setError(x instanceof Error ? x.message : "No se pudo registrar. Intenta otra vez.");
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviar} className="max-w-xl space-y-6">
      <div>
        <Enlace href="/panel" className="btn-fantasma -ml-1">Volver</Enlace>
        <h1 className="mt-2 text-h3">Registrar una obra</h1>
        <p className="mt-1 text-chico text-verde">El número de registro y el código de la URL salen solos. El registro no se puede borrar después.</p>
      </div>
      <Campo id="titulo" etiqueta="Título" requerido><input id="titulo" className="campo" value={f.titulo} onChange={cambiar("titulo")} maxLength={140} required /></Campo>
      <div className="grid gap-6 sm:grid-cols-2">
        <Campo id="tecnica" etiqueta="Técnica"><input id="tecnica" className="campo" value={f.tecnica} onChange={cambiar("tecnica")} placeholder="Óleo sobre tela" maxLength={140} /></Campo>
        <Campo id="medidas" etiqueta="Medidas"><input id="medidas" className="campo" value={f.medidas} onChange={cambiar("medidas")} placeholder="60 × 80 cm" maxLength={60} /></Campo>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Campo id="anio" etiqueta="Año"><input id="anio" className="campo registro" value={f.anio} onChange={cambiar("anio")} inputMode="numeric" maxLength={4} /></Campo>
        <Campo id="sello" etiqueta="Sello">
          <select id="sello" className="campo" value={f.sello} onChange={cambiar("sello")}>
            <option value="ntag213">NFC normal (NTAG213)</option>
            <option value="ntag424">NFC seguro (NTAG 424 DNA)</option>
            <option value="solo_qr">Solo QR</option>
          </select>
        </Campo>
      </div>
      <Campo id="historia" etiqueta="Historia" ayuda="Cómo nació la obra, qué la hace única. Esto lo lee quien toque el sello.">
        <textarea id="historia" className="campo min-h-32" value={f.historia} onChange={cambiar("historia")} maxLength={4000} />
      </Campo>
      <Campo id="foto" etiqueta="Foto de la obra completa" ayuda="De frente, con luz de día, sin marco si se puede.">
        <input id="foto" type="file" accept="image/jpeg,image/png,image/webp" className="block text-chico" onChange={(e) => setFotos(Array.from(e.target.files ?? []).slice(0, 1))} />
      </Campo>
      <Campo id="huellas" etiqueta="3 fotos huella" ayuda="Muy de cerca: una pincelada, una esquina, la firma. Detalles que nadie puede copiar igual.">
        <input id="huellas" type="file" accept="image/jpeg,image/png,image/webp" multiple className="block text-chico" onChange={(e) => setHuellas(Array.from(e.target.files ?? []).slice(0, 3))} />
      </Campo>
      {error && <p role="alert" className="text-chico text-terracota-active">{error}</p>}
      <button type="submit" className="btn btn-primario w-full sm:w-auto" disabled={enviando || !f.titulo.trim()}>
        {enviando ? "Registrando" : "Registrar y preparar tarjeta"}
      </button>
    </form>
  );
}

function Campo({ id, etiqueta, ayuda, requerido, children }: { id: string; etiqueta: string; ayuda?: string; requerido?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">{etiqueta}{requerido && <span className="text-verde font-normal"> (obligatorio)</span>}</label>
      <div className="mt-2">{children}</div>
      {ayuda && <p className="mt-1.5 text-chico text-verde">{ayuda}</p>}
    </div>
  );
}

function Tarjeta({ datos, obraId, artista }: { datos: Datos; obraId: string; artista: ArtistaPanel }) {
  const [obra, setObra] = useState<ObraPanel | null | undefined>(undefined);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    datos.panelObras().then((l) => setObra(l.find((o) => o.id === obraId) ?? null));
  }, [datos, obraId]);

  if (obra === undefined) return <Esqueleto className="h-60 w-full" />;
  if (obra === null) return <p>No encontramos esa obra en tu panel.</p>;

  const urlNfc = `${BASE_SELLOS}/o/${obra.codigo}?v=n`;
  const urlQr = `${BASE_SELLOS}/o/${obra.codigo}?v=q`;
  const qr = renderSVG(urlQr, { border: 1, blackColor: "#2B2622", whiteColor: "#FFFFFF" });

  const generar = async () => {
    if ((obra.codigo_vivo || obra.dueno) && !confirm("Si generas un código nuevo, el de la tarjeta anterior deja de servir. ¿Seguro?")) return;
    setGenerando(true);
    setCodigo(await datos.generarCodigoDueno(obra.id));
    setGenerando(false);
  };

  return (
    <div>
      <div className="no-imprimir">
        <Enlace href="/panel" className="btn-fantasma -ml-1">Volver</Enlace>
        <h1 className="mt-2 text-h3">Tarjeta y sello de {obra.titulo}</h1>
        <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 text-chico">
          <li>Genera el código de dueño. <strong>Solo se ve una vez</strong>: imprímelo antes de salir de esta pantalla.</li>
          <li>Imprime en cartulina, recorta la tarjeta y pega la raspadita encima del código.</li>
          <li>Firma la tarjeta a mano.</li>
          <li>
            Graba el sello con NFC Tools: Escribir, Agregar registro, URL, y pega exactamente esto:
            <CopiarUrl url={urlNfc} />
            Acerca el celular y confirma que abre esta obra. Solo entonces bloquéalo: <strong>es para siempre</strong>. Pégalo en el bastidor, nunca sobre metal.
          </li>
          <li>Pega el QR junto al sello.</li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primario" onClick={generar} disabled={generando}>
            {codigo ? "Generar otro código" : "Generar código de dueño"}
          </button>
          <button type="button" className="btn btn-secundario" onClick={() => print()} disabled={!codigo}><Printer size={18} /> Imprimir</button>
        </div>
      </div>

      <div className="imprimible mt-10 flex flex-wrap items-start gap-10">
        <div className="tarjeta-dueno relative flex flex-col justify-between bg-lienzo p-[4.5mm] text-tinta" style={{ width: "85mm", height: "55mm", boxShadow: "inset 0 0 0 0.3mm #D8CDBB", borderRadius: "3mm" }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="galeria text-[13pt] leading-tight">{obra.titulo}</p>
              <p className="registro mt-[1mm] text-[6.5pt] text-verde">{obra.registro}{obra.tecnica ? ` · ${obra.tecnica}` : ""}{obra.anio ? ` · ${obra.anio}` : ""}</p>
            </div>
            <Isotipo tam={22} />
          </div>
          <div>
            <p className="registro text-[5.5pt] tracking-[0.14em] text-verde">CÓDIGO DE DUEÑO, DEBAJO DE LA RASPADITA</p>
            <p className="registro mt-[0.8mm] inline-block rounded-[1.5mm] border border-dashed border-verde px-[2.5mm] py-[1mm] text-[13pt] tracking-[0.16em]">
              {codigo ?? "XXXX-XXXX"}
            </p>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="w-[38mm] border-t border-tinta pt-[0.6mm] text-[6pt] text-verde">Firma de {artista.nombre}</p>
            <p className="registro text-right text-[5.5pt] text-verde">brai.art/o/{obra.codigo}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[1.5mm]">
          <div style={{ width: "26mm", height: "26mm" }} dangerouslySetInnerHTML={{ __html: qr }} />
          <p className="registro text-[6pt] text-verde">{obra.registro}</p>
          <p className="text-[6pt]">Acerca tu celular o escanea</p>
        </div>
      </div>
    </div>
  );
}

function CopiarUrl({ url }: { url: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <span className="my-2 flex flex-wrap items-center gap-2">
      <code className="registro select-all rounded border border-linea bg-lienzo px-2 py-1.5 text-chico break-all">{url}</code>
      <button
        type="button"
        className="btn-fantasma cursor-pointer"
        onClick={async () => {
          try { await navigator.clipboard.writeText(url); setCopiado(true); } catch { setCopiado(false); }
        }}
      >
        {copiado ? "Copiada" : "Copiar"}
      </button>
    </span>
  );
}
