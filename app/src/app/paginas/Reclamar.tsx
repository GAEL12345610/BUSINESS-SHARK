// Reclamar: el comprador raspa su tarjeta, escribe el código y la obra queda a su nombre.
import { useEffect, useState, type FormEvent } from "react";
import { obtenerDatos, formatearCodigoDueno, type ObraPublica, type ResultadoReclamo } from "../datos/index.ts";
import { Enlace } from "../ruteo.tsx";
import { AvisoEjemplo, Contenedor, Esqueleto, SelloRegistroBrai } from "../componentes/marca.tsx";
import { CODIGOS_EJEMPLO } from "../datos/ejemplo.ts";
import { Falla } from "./PaginaObra.tsx";

const MENSAJES: Record<string, string> = {
  correo_invalido: "Revisa tu correo, parece que le falta algo.",
  nombre_invalido: "Escribe tu nombre como quieres que quede en el registro.",
  obra_no_encontrada: "No encontramos esta obra en el registro.",
  demasiados_intentos: "Hubo demasiados intentos con esta obra. Por seguridad, espera una hora y vuelve a probar.",
  sin_codigo_vivo: "Esta obra no tiene un código pendiente. Si la acabas de comprar, pídele al artista una tarjeta nueva.",
  red: "No pudimos conectar. Revisa tu internet y vuelve a intentarlo.",
};

export function Reclamar({ codigo }: { codigo: string }) {
  const [obra, setObra] = useState<ObraPublica | null | undefined>(undefined);
  const [modoEjemplo, setModoEjemplo] = useState(false);
  const [codigoDueno, setCodigoDueno] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoReclamo | null>(null);

  useEffect(() => {
    obtenerDatos().then(async (d) => {
      setModoEjemplo(d.modo === "ejemplo");
      setObra(await d.obraPublica(codigo));
    }).catch(() => setObra(null));
  }, [codigo]);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setResultado(null);
    const d = await obtenerDatos();
    const r = await d.reclamar(codigo, codigoDueno, email, nombre).catch((): ResultadoReclamo => ({ ok: false, error: "red" }));
    setResultado(r);
    setEnviando(false);
  };

  if (obra === undefined) {
    return <Contenedor className="pt-16 space-y-4"><Esqueleto className="h-8 w-2/3" /><Esqueleto className="h-40 w-full" /></Contenedor>;
  }
  if (obra === null) return <Falla titulo="No encontramos esta obra" mensaje="Acerca tu celular al sello otra vez." />;

  if (resultado?.ok) {
    return (
      <div className="min-h-[100dvh] bg-lienzo">
        {obra.artista.es_demo && <AvisoEjemplo />}
        <Contenedor className="pt-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-dorado-fondo" aria-hidden="true">
            <span className="h-5 w-5 rounded-full bg-dorado" />
          </div>
          <h1 className="mt-6 text-h1">La obra ya está a tu nombre.</h1>
          <p className="mt-4 text-cuerpo">
            <span className="galeria text-h3">{obra.titulo}</span>
            <span className="registro mt-2 block text-chico text-verde">
              {resultado.registro} · Dueño: {resultado.dueno}
            </span>
          </p>
          <p className="mt-6 text-verde">
            Ya apareces en el registro de {obra.artista.nombre} como dueño de esta obra. Guarda tu tarjeta: es la prueba física de que la recibiste.
          </p>
          <Enlace href={`/o/${obra.codigo}`} className="btn btn-primario mt-8">Ver la obra</Enlace>
          <SelloRegistroBrai />
        </Contenedor>
      </div>
    );
  }

  const error = resultado && !resultado.ok
    ? resultado.error === "codigo_incorrecto"
      ? `Ese código no coincide. ${resultado.intentos_restantes === 0 ? "Ya no quedan intentos esta hora." : `Te quedan ${resultado.intentos_restantes} intentos esta hora.`}`
      : MENSAJES[resultado.error]
    : null;
  const listo = codigoDueno.replace("-", "").length === 8 && nombre.trim().length >= 2 && email.includes("@") && acepto;
  const pista = modoEjemplo ? CODIGOS_EJEMPLO[obra.codigo as keyof typeof CODIGOS_EJEMPLO] : undefined;

  return (
    <div className="min-h-[100dvh] bg-lienzo">
      {obra.artista.es_demo && <AvisoEjemplo />}
      <Contenedor className="pt-8">
        <Enlace href={`/o/${obra.codigo}`} className="btn-fantasma inline-flex items-center -ml-1">Volver a la obra</Enlace>
        <p className="etiqueta mt-6">{obra.registro}</p>
        <h1 className="mt-2 text-h2">Reclama {obra.titulo}</h1>
        <p className="mt-3 text-verde">
          Raspa la tarjeta que te dio {obra.artista.nombre}. El código sirve una sola vez.
        </p>

        <form onSubmit={enviar} className="mt-8 space-y-6" noValidate>
          <div>
            <label htmlFor="codigo" className="block font-semibold">Código de dueño</label>
            <input
              id="codigo"
              name="codigo"
              className="campo campo-codigo mt-2"
              value={codigoDueno}
              onChange={(e) => setCodigoDueno(formatearCodigoDueno(e.target.value))}
              placeholder="XXXX-XXXX"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck={false}
              inputMode="text"
              maxLength={9}
              required
              aria-describedby="codigo-ayuda"
            />
            <p id="codigo-ayuda" className="mt-2 text-chico text-verde">
              8 letras y números, debajo de la raspadita.
              {pista && <> En este ejemplo es <span className="registro font-medium text-tinta">{pista}</span>.</>}
            </p>
          </div>

          <div>
            <label htmlFor="nombre" className="block font-semibold">Tu nombre</label>
            <input id="nombre" name="nombre" className="campo mt-2" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" maxLength={80} required />
            <p className="mt-2 text-chico text-verde">En la página de la obra solo se verán tus iniciales.</p>
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold">Tu correo</label>
            <input id="email" name="email" type="email" className="campo mt-2" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" maxLength={254} required />
            <p className="mt-2 text-chico text-verde">Solo lo ve {obra.artista.nombre}, para avisarte de su obra nueva. Nunca se publica.</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 h-5 w-5 flex-none accent-terracota-btn" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
            <span className="text-chico">
              Acepto el <a href="/privacidad" className="enlace" target="_blank" rel="noopener">aviso de privacidad</a>.
            </span>
          </label>

          {error && <p role="alert" className="rounded-lg border border-terracota-btn/40 bg-blanco px-4 py-3 text-chico text-terracota-active">{error}</p>}

          <button type="submit" className="btn btn-primario w-full" disabled={!listo || enviando}>
            {enviando ? "Revisando el código" : "Poner la obra a mi nombre"}
          </button>
        </form>
        <SelloRegistroBrai />
      </Contenedor>
    </div>
  );
}
