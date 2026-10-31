-- Brai, seguridad. Dos candados:
--   1. REVOKE: anon no toca ninguna tabla. authenticated solo lo que se le da.
--   2. RLS: aunque alguien tenga permiso de tabla, solo ve lo suyo.
-- Lo público (página de la obra y del artista) sale por funciones
-- security definer que devuelven SOLO lo público: nunca correos.

-- ---------------------------------------------------------------------------
-- Candado 1: permisos de tabla
-- ---------------------------------------------------------------------------
revoke all on table
  public.artistas, public.obras, public.duenos, public.codigos_dueno,
  public.intentos_reclamo, public.eventos_obra, public.escaneos, public.sellos
from anon, authenticated, public;

revoke all on sequence public.registro_seq from anon, authenticated, public;

-- El artista con sesión: lee lo suyo y edita solo columnas seguras.
grant select on public.artistas, public.obras, public.eventos_obra, public.escaneos, public.duenos to authenticated;
grant update (nombre, bio, ciudad, instagram, tema) on public.artistas to authenticated;
grant insert (artista_id, titulo, tecnica, medidas, anio, historia, fotos, fotos_huella, sello, publicada)
  on public.obras to authenticated;
grant update (titulo, tecnica, medidas, anio, historia, fotos, fotos_huella, sello, publicada)
  on public.obras to authenticated;
-- El default de "registro" llama nextval: quien inserta necesita usar la secuencia.
grant usage on sequence public.registro_seq to authenticated;

-- ---------------------------------------------------------------------------
-- Candado 2: RLS, todo cerrado por default
-- ---------------------------------------------------------------------------
alter table public.artistas         enable row level security;
alter table public.obras            enable row level security;
alter table public.duenos           enable row level security;
alter table public.codigos_dueno    enable row level security;
alter table public.intentos_reclamo enable row level security;
alter table public.eventos_obra     enable row level security;
alter table public.escaneos         enable row level security;
alter table public.sellos           enable row level security;
-- codigos_dueno, intentos_reclamo y sellos: sin políticas = nadie entra
-- (solo las funciones security definer y el service_role).

-- ¿Este artista es mío? security definer para no depender del RLS de artistas
-- dentro de otras políticas (evita recursión).
create or replace function public.brai_es_mi_artista(p_artista_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.artistas a
    where a.id = p_artista_id and a.user_id = (select auth.uid())
  );
$$;

create or replace function public.brai_es_mi_obra(p_obra_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.obras o
    join public.artistas a on a.id = o.artista_id
    where o.id = p_obra_id and a.user_id = (select auth.uid())
  );
$$;


create policy artistas_leer_propio on public.artistas
  for select to authenticated using (user_id = (select auth.uid()));
create policy artistas_editar_propio on public.artistas
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy obras_leer_propias on public.obras
  for select to authenticated using (public.brai_es_mi_artista(artista_id));
create policy obras_crear_propias on public.obras
  for insert to authenticated with check (public.brai_es_mi_artista(artista_id));
create policy obras_editar_propias on public.obras
  for update to authenticated
  using (public.brai_es_mi_artista(artista_id)) with check (public.brai_es_mi_artista(artista_id));

create policy eventos_leer_propios on public.eventos_obra
  for select to authenticated using (public.brai_es_mi_obra(obra_id));

create policy escaneos_leer_propios on public.escaneos
  for select to authenticated using (public.brai_es_mi_obra(obra_id));

-- El artista ve a los dueños de SUS obras (para eso paga). Nadie más.
create policy duenos_leer_de_mis_obras on public.duenos
  for select to authenticated using (
    exists (
      select 1 from public.eventos_obra e
      where e.dueno_id = duenos.id and public.brai_es_mi_obra(e.obra_id)
    )
  );

-- ---------------------------------------------------------------------------
-- Funciones públicas (anon): devuelven solo lo que puede ver cualquiera
-- ---------------------------------------------------------------------------

-- "María Rodríguez" -> "M. R."  Privacidad del dueño en la página pública.
create or replace function public.brai_iniciales(p_nombre text)
returns text
language sql
immutable
set search_path = ''
as $$
  select string_agg(upper(left(parte, 1)) || '.', ' ')
  from unnest(regexp_split_to_array(trim(coalesce(p_nombre, '')), '\s+')) as parte
  where parte <> '';
$$;

create or replace function public.obra_publica(p_codigo text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_obra public.obras;
  v_artista public.artistas;
  v_resultado jsonb;
begin
  select * into v_obra from public.obras
  where codigo = public.brai_normalizar_codigo(p_codigo) and publicada;
  if not found then
    return null;
  end if;

  select * into v_artista from public.artistas where id = v_obra.artista_id;

  select jsonb_build_object(
    'registro', v_obra.registro,
    'codigo', v_obra.codigo,
    'titulo', v_obra.titulo,
    'tecnica', v_obra.tecnica,
    'medidas', v_obra.medidas,
    'anio', v_obra.anio,
    'historia', v_obra.historia,
    'fotos', to_jsonb(v_obra.fotos),
    'fotos_huella', to_jsonb(v_obra.fotos_huella),
    'sello', v_obra.sello,
    'registrada_en', v_obra.creado_en,
    'artista', jsonb_build_object(
      'slug', v_artista.slug,
      'nombre', v_artista.nombre,
      'ciudad', v_artista.ciudad,
      'instagram', v_artista.instagram,
      'tema', v_artista.tema,
      'es_demo', v_artista.es_demo
    ),
    'eventos', coalesce((
      select jsonb_agg(jsonb_build_object(
        'tipo', e.tipo,
        'fecha', e.creado_en,
        'nota', e.nota,
        'dueno', public.brai_iniciales(d.nombre)
      ) order by e.creado_en, e.id)
      from public.eventos_obra e
      left join public.duenos d on d.id = e.dueno_id
      where e.obra_id = v_obra.id
    ), '[]'::jsonb),
    'reclamada', exists (
      select 1 from public.eventos_obra e
      where e.obra_id = v_obra.id and e.tipo in ('reclamo', 'transferencia')
    ),
    'codigo_vivo', exists (
      select 1 from public.codigos_dueno c
      where c.obra_id = v_obra.id and c.usado_en is null and c.anulado_en is null
    ),
    'escaneos', (select count(*) from public.escaneos s where s.obra_id = v_obra.id)
  ) into v_resultado;

  return v_resultado;
end;
$$;

create or replace function public.artista_publico(p_slug text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'slug', a.slug,
    'nombre', a.nombre,
    'bio', a.bio,
    'ciudad', a.ciudad,
    'instagram', a.instagram,
    'tema', a.tema,
    'es_demo', a.es_demo,
    'obras', coalesce((
      select jsonb_agg(jsonb_build_object(
        'registro', o.registro,
        'codigo', o.codigo,
        'titulo', o.titulo,
        'tecnica', o.tecnica,
        'anio', o.anio,
        'foto', o.fotos[1],
        'reclamada', exists (
          select 1 from public.eventos_obra e
          where e.obra_id = o.id and e.tipo in ('reclamo', 'transferencia')
        )
      ) order by o.creado_en desc)
      from public.obras o
      where o.artista_id = a.id and o.publicada
    ), '[]'::jsonb)
  )
  from public.artistas a
  where a.slug = lower(p_slug);
$$;

-- Cuenta un toque. Con freno: más de 30 en un minuto por obra se ignoran,
-- para que nadie infle el contador del caso documentado con un script.
create or replace function public.registrar_escaneo(p_codigo text, p_via text default 'link')
returns void
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_obra_id uuid;
begin
  select id into v_obra_id from public.obras
  where codigo = public.brai_normalizar_codigo(p_codigo) and publicada;
  if v_obra_id is null then
    return;
  end if;
  if (select count(*) from public.escaneos
      where obra_id = v_obra_id and creado_en > now() - interval '1 minute') >= 30 then
    return;
  end if;
  insert into public.escaneos (obra_id, via)
  values (v_obra_id, case when p_via in ('nfc', 'qr', 'link') then p_via else 'link' end);
end;
$$;

-- RECLAMAR: todo en un solo paso y con la fila de la obra bloqueada, para que
-- dos personas no puedan reclamar la misma obra a la vez.
-- OJO: los errores se DEVUELVEN, no se lanzan con raise. Un raise desharía el
-- registro del intento fallido y el límite de 5 por hora no serviría.
create or replace function public.reclamar_obra(
  p_codigo text,
  p_codigo_dueno text,
  p_email text,
  p_nombre text
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_obra public.obras;
  v_codigo public.codigos_dueno;
  v_fallidos int;
  v_normalizado text := public.brai_normalizar_codigo(p_codigo_dueno);
  v_email text := lower(trim(coalesce(p_email, '')));
  v_nombre text := regexp_replace(trim(coalesce(p_nombre, '')), '\s+', ' ', 'g');
  v_dueno_id uuid;
  v_tipo text;
begin
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or char_length(v_email) > 254 then
    return jsonb_build_object('ok', false, 'error', 'correo_invalido');
  end if;
  if char_length(v_nombre) not between 2 and 80 then
    return jsonb_build_object('ok', false, 'error', 'nombre_invalido');
  end if;

  select * into v_obra from public.obras
  where codigo = public.brai_normalizar_codigo(p_codigo) and publicada
  for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'obra_no_encontrada');
  end if;

  select count(*) into v_fallidos from public.intentos_reclamo
  where obra_id = v_obra.id and not acierto and creado_en > now() - interval '1 hour';
  if v_fallidos >= 5 then
    return jsonb_build_object('ok', false, 'error', 'demasiados_intentos');
  end if;

  select * into v_codigo from public.codigos_dueno
  where obra_id = v_obra.id and usado_en is null and anulado_en is null
  for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'sin_codigo_vivo');
  end if;

  if char_length(v_normalizado) <> 8
     or v_codigo.codigo_hash <> extensions.crypt(v_normalizado, v_codigo.codigo_hash) then
    insert into public.intentos_reclamo (obra_id, acierto) values (v_obra.id, false);
    return jsonb_build_object(
      'ok', false,
      'error', 'codigo_incorrecto',
      'intentos_restantes', greatest(0, 4 - v_fallidos)
    );
  end if;

  update public.codigos_dueno set usado_en = now() where id = v_codigo.id;

  -- Si el correo ya existe NO se sobreescribe el nombre: un código válido no
  -- da permiso de cambiarle el nombre a otra persona.
  insert into public.duenos (email, nombre) values (v_email, v_nombre)
  on conflict (email) do nothing;
  select id into v_dueno_id from public.duenos where email = v_email;

  v_tipo := case when exists (
    select 1 from public.eventos_obra e
    where e.obra_id = v_obra.id and e.tipo in ('reclamo', 'transferencia')
  ) then 'transferencia' else 'reclamo' end;

  insert into public.eventos_obra (obra_id, tipo, dueno_id) values (v_obra.id, v_tipo, v_dueno_id);
  insert into public.intentos_reclamo (obra_id, acierto) values (v_obra.id, true);

  return jsonb_build_object(
    'ok', true,
    'tipo', v_tipo,
    'registro', v_obra.registro,
    'dueno', public.brai_iniciales((select nombre from public.duenos where id = v_dueno_id))
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- Funciones del panel (authenticated): siempre revisan que la obra sea suya
-- ---------------------------------------------------------------------------

-- Genera el código de la tarjeta. Se muestra UNA vez; en la base queda el hash.
-- Si ya había uno vivo (tarjeta perdida, reventa), el anterior muere.
create or replace function public.generar_codigo_dueno(p_obra_id uuid)
returns text
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_plano text;
begin
  if not public.brai_es_mi_obra(p_obra_id) then
    raise exception 'no es tu obra' using errcode = '42501';
  end if;

  v_plano := public.brai_codigo_aleatorio(8);

  update public.codigos_dueno set anulado_en = now()
  where obra_id = p_obra_id and usado_en is null and anulado_en is null;

  insert into public.codigos_dueno (obra_id, codigo_hash)
  values (p_obra_id, extensions.crypt(v_plano, extensions.gen_salt('bf', 8)));

  return substr(v_plano, 1, 4) || '-' || substr(v_plano, 5, 4);
end;
$$;

-- Una línea en la historia de la obra ("Expuesta en el MAZ, 2026").
create or replace function public.agregar_nota(p_obra_id uuid, p_nota text)
returns void
language plpgsql
volatile
security definer
set search_path = ''
as $$
begin
  if not public.brai_es_mi_obra(p_obra_id) then
    raise exception 'no es tu obra' using errcode = '42501';
  end if;
  if char_length(trim(coalesce(p_nota, ''))) not between 3 and 280 then
    raise exception 'la nota debe tener de 3 a 280 caracteres' using errcode = '22023';
  end if;
  insert into public.eventos_obra (obra_id, tipo, nota) values (p_obra_id, 'nota', trim(p_nota));
end;
$$;

-- Todo lo que necesita el panel en una sola llamada (sin N+1).
create or replace function public.panel_obras()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(fila order by (fila->>'registrada_en') desc), '[]'::jsonb)
  from (
    select jsonb_build_object(
      'id', o.id,
      'registro', o.registro,
      'codigo', o.codigo,
      'titulo', o.titulo,
      'tecnica', o.tecnica,
      'medidas', o.medidas,
      'anio', o.anio,
      'foto', o.fotos[1],
      'sello', o.sello,
      'publicada', o.publicada,
      'registrada_en', o.creado_en,
      'codigo_vivo', exists (
        select 1 from public.codigos_dueno c
        where c.obra_id = o.id and c.usado_en is null and c.anulado_en is null
      ),
      'escaneos', (select count(*) from public.escaneos s where s.obra_id = o.id),
      'dueno', (
        select jsonb_build_object('nombre', d.nombre, 'email', d.email, 'desde', e.creado_en)
        from public.eventos_obra e
        join public.duenos d on d.id = e.dueno_id
        where e.obra_id = o.id and e.tipo in ('reclamo', 'transferencia')
        order by e.creado_en desc, e.id desc
        limit 1
      )
    ) as fila
    from public.obras o
    join public.artistas a on a.id = o.artista_id
    where a.user_id = (select auth.uid())
  ) t;
$$;

-- ---------------------------------------------------------------------------
-- Quién ejecuta qué. Va AL FINAL: en Postgres toda función nace ejecutable por
-- PUBLIC, y en Supabase además por anon y authenticated. Se cierra todo y se
-- abre una por una.
-- ---------------------------------------------------------------------------
revoke execute on all functions in schema public from public, anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;
alter default privileges in schema public revoke all on tables from anon;

-- Las que usan las políticas y los defaults al insertar.
grant execute on function
  public.brai_codigo_aleatorio(int),
  public.brai_es_mi_artista(uuid),
  public.brai_es_mi_obra(uuid)
to authenticated;

grant execute on function
  public.obra_publica(text),
  public.artista_publico(text),
  public.registrar_escaneo(text, text),
  public.reclamar_obra(text, text, text, text)
to anon, authenticated;

grant execute on function
  public.generar_codigo_dueno(uuid),
  public.agregar_nota(uuid, text),
  public.panel_obras()
to authenticated;
