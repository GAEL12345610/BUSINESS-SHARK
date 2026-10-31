import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Datos, EstadoSello, NuevaObra, ResultadoReclamo } from "./tipos.ts";
import { normalizarCodigo } from "./reglas.ts";

// Solo la URL y la anon key viajan al navegador (memoria/service-role-nunca-en-vite.md).
export function crearDatosSupabase(url: string, anon: string): Datos {
  const sb: SupabaseClient = createClient(url, anon, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });

  const subir = async (artistaId: string, archivo: File) => {
    const ext = (archivo.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const ruta = `${artistaId}/${crypto.randomUUID()}.${ext || "jpg"}`;
    const { error } = await sb.storage.from("obras").upload(ruta, archivo, {
      cacheControl: "31536000",
      contentType: archivo.type,
      upsert: false,
    });
    if (error) throw new Error(`No se pudo subir ${archivo.name}: ${error.message}`);
    return ruta;
  };

  return {
    modo: "supabase",

    async obraPublica(codigo) {
      const { data, error } = await sb.rpc("obra_publica", { p_codigo: normalizarCodigo(codigo) });
      if (error) throw error;
      return data ?? null;
    },

    async artistaPublico(slug) {
      const { data, error } = await sb.rpc("artista_publico", { p_slug: slug });
      if (error) throw error;
      return data ?? null;
    },

    async registrarEscaneo(codigo, via) {
      await sb.rpc("registrar_escaneo", { p_codigo: codigo, p_via: via });
    },

    async reclamar(codigo, codigoDueno, email, nombre): Promise<ResultadoReclamo> {
      const { data, error } = await sb.rpc("reclamar_obra", {
        p_codigo: codigo,
        p_codigo_dueno: codigoDueno,
        p_email: email,
        p_nombre: nombre,
      });
      if (error || !data) return { ok: false, error: "red" };
      return data as ResultadoReclamo;
    },

    async verificarSello(codigo, e, c): Promise<EstadoSello> {
      const q = new URLSearchParams({ o: codigo, e, c });
      try {
        const r = await fetch(`${url}/functions/v1/sello?${q}`, {
          headers: { apikey: anon, authorization: `Bearer ${anon}` },
        });
        if (!r.ok) return "sin_verificar";
        const j = (await r.json()) as { estado?: EstadoSello };
        return j.estado ?? "sin_verificar";
      } catch {
        return "sin_verificar";
      }
    },

    urlFoto(ruta) {
      if (/^(https?:|data:|blob:|\/)/.test(ruta)) return ruta;
      return `${url}/storage/v1/object/public/obras/${ruta}`;
    },

    async sesion() {
      const { data } = await sb.auth.getSession();
      const email = data.session?.user.email;
      return email ? { email } : null;
    },

    async entrar(email) {
      const { error } = await sb.auth.signInWithOtp({
        email,
        // Solo entran cuentas que el equipo creó en el setup. Nadie se registra solo.
        options: { emailRedirectTo: `${location.origin}/panel`, shouldCreateUser: false },
      });
      if (error) return { ok: false, mensaje: "Ese correo no tiene cuenta de artista. Escríbenos y la activamos." };
      return { ok: true, mensaje: "Te mandamos un enlace a tu correo. Ábrelo en este mismo celular." };
    },

    async salir() {
      await sb.auth.signOut();
    },

    async miArtista() {
      const { data, error } = await sb.from("artistas").select("id, slug, nombre, es_demo").maybeSingle();
      if (error) throw error;
      return data;
    },

    async panelObras() {
      const { data, error } = await sb.rpc("panel_obras");
      if (error) throw error;
      return data ?? [];
    },

    async registrarObra(artistaId: string, obra: NuevaObra) {
      const fotos = await Promise.all(obra.fotos.map((f) => subir(artistaId, f)));
      const fotos_huella = await Promise.all(obra.fotos_huella.map((f) => subir(artistaId, f)));
      const { data, error } = await sb
        .from("obras")
        .insert({
          artista_id: artistaId,
          titulo: obra.titulo,
          tecnica: obra.tecnica || null,
          medidas: obra.medidas || null,
          anio: obra.anio,
          historia: obra.historia || null,
          sello: obra.sello,
          fotos,
          fotos_huella,
        })
        .select("id, codigo")
        .single();
      if (error) throw error;
      return data;
    },

    async generarCodigoDueno(obraId) {
      const { data, error } = await sb.rpc("generar_codigo_dueno", { p_obra_id: obraId });
      if (error) throw error;
      return data as string;
    },

    async agregarNota(obraId, nota) {
      const { error } = await sb.rpc("agregar_nota", { p_obra_id: obraId, p_nota: nota });
      if (error) throw error;
    },
  };
}
