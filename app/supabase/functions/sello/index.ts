// Función Edge "sello": revisa que un toque al NTAG 424 DNA sea del chip original.
// La llama la página de la obra cuando la URL trae ?e=...&c=...
//   GET /functions/v1/sello?o=7KQ2X&e=<32 hex>&c=<16 hex>
// Responde { estado: "original" | "enlace_repetido" | "no_valido" | ... }
//
// Secretos (Supabase, Edge Functions, Secrets). NUNCA en el código:
//   SELLO_LLAVE_META     32 hex, K_SDMMetaRead (la misma en todos los chips)
//   SELLO_LLAVE_MAESTRA  32 hex, de ella sale la llave de cada chip
//   ORIGENES             lista separada por comas, ej. https://brai.art,https://www.brai.art
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY los pone Supabase solo.
import { verificarSun, hexABytes, llavePorChip } from "./sun.ts";

const origenes = (Deno.env.get("ORIGENES") ?? "https://brai.art").split(",").map((s) => s.trim());

function cabeceras(origen: string | null): HeadersInit {
  const h: Record<string, string> = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    vary: "Origin",
  };
  if (origen && origenes.includes(origen)) h["access-control-allow-origin"] = origen;
  return h;
}

function responder(cuerpo: unknown, estado: number, origen: string | null) {
  return new Response(JSON.stringify(cuerpo), { status: estado, headers: cabeceras(origen) });
}

Deno.serve(async (req) => {
  const origen = req.headers.get("origin");
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { ...cabeceras(origen), "access-control-allow-methods": "GET", "access-control-allow-headers": "apikey, authorization" },
    });
  }
  if (req.method !== "GET") return responder({ error: "metodo" }, 405, origen);

  // Falla cerrada: sin llaves no se verifica nada.
  const meta = Deno.env.get("SELLO_LLAVE_META");
  const maestra = Deno.env.get("SELLO_LLAVE_MAESTRA");
  const url = Deno.env.get("SUPABASE_URL");
  const servicio = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!meta || !maestra || !url || !servicio || !/^[0-9a-fA-F]{32}$/.test(meta) || !/^[0-9a-fA-F]{32}$/.test(maestra)) {
    return responder({ error: "configuracion" }, 500, origen);
  }

  const p = new URL(req.url).searchParams;
  const codigo = (p.get("o") ?? "").toUpperCase();
  const e = p.get("e") ?? "";
  const c = p.get("c") ?? "";
  if (!/^[2-9A-HJKMNP-TV-Z]{5}$/.test(codigo)) return responder({ estado: "no_valido" }, 400, origen);

  const llaveMaestra = hexABytes(maestra);
  const r = verificarSun(e, c, hexABytes(meta), (uid) => llavePorChip(llaveMaestra, uid));
  if (!r.ok) return responder({ estado: "no_valido" }, 200, origen);

  const rpc = await fetch(`${url}/rest/v1/rpc/sello_confirmar`, {
    method: "POST",
    headers: { apikey: servicio, authorization: `Bearer ${servicio}`, "content-type": "application/json" },
    body: JSON.stringify({ p_codigo: codigo, p_uid: r.uid, p_contador: r.contador }),
  });
  if (!rpc.ok) return responder({ error: "registro" }, 502, origen);
  const estado = await rpc.json();
  return responder({ estado }, 200, origen);
});
