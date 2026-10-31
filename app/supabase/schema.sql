-- Esquema de Brai para Supabase (docs/PROTOTIPO.md).
-- Se pega completo en Supabase, SQL Editor, y se corre una vez.
--
-- Reglas que sigue (memoria/):
--   rls-es-la-unica-puerta: RLS cerrado por defecto en todas las tablas.
--   revoke-anon-desde-el-dia-uno: el rol anon no toca ninguna tabla. La página
--     pública y reclamar pasan SOLO por funciones que devuelven lo público.
--   endpoint-que-escribe-se-defiende-solo: reclamar cuenta intentos y hace todo
--     en un paso, con la fila bloqueada, para que dos personas no ganen a la vez.
--   TOKENIZAR.md: los eventos se encadenan por huella (sha256) y no se editan.

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------------

create table public.artistas (
  id          uuid primary key default gen_random_uuid(),
  usuario_id  uuid not null unique references auth.users (id) on delete cascade,
  slug        text not null unique check (slug ~ '^[a-z0-9-]{3,40}$'),
  nombre      text not null check (length(nombre) between 2 and 80),
  disciplina  text not null default 'Pintura',
  bio         text,
  acento      text not null default '#A2563D' check (acento ~ '^#[0-9A-Fa-f]{6}$'),
  dominio     text,
  creado_en   timestamptz not null default now()
);

create sequence public.registro_seq;

create table public.obras (
  id          uuid primary key default gen_random_uuid(),
  artista_id  uuid not null references public.artistas (id) on delete restrict,
  -- BRAI-0001: número de registro humano
  registro    text not null unique default 'BRAI-' || lpad(nextval('public.registro_seq')::text, 4, '0'),
  -- lo que va en el sello: brai.art/o/<codigo>. Sin 0, O, 1, I para que no se confundan.
  codigo      text not null unique check (codigo ~ '^[2-9A-HJ-NP-Z]{5}$'),
  titulo      text not null check (length(titulo) between 1 and 120),
  tecnica     text not null,
  medidas     text not null,
  anio        int  not null check (anio between 1900 and 2100),
  historia    text,
  imagen_url  text,
  huellas     jsonb not null default '[]',  -- [{x, y, nota}] o fotos macro
  video_url   text,
  creada_en   timestamptz not null default now()
);

-- Código de dueño: solo su hash (bcrypt). El texto plano se muestra UNA vez al artista.
create table public.codigos_dueno (
  obra_id     uuid primary key references public.obras (id) on delete cascade,
  hash        text not null,
  usado_en    timestamptz
);

create table public.intentos_reclamo (
  id          bigint generated always as identity primary key,
  obra_id     uuid not null references public.obras (id) on delete cascade,
  en          timestamptz not null default now()
);
create index on public.intentos_reclamo (obra_id, en);

-- Datos privados del dueño. Solo los ve el artista de esa obra.
create table public.duenos (
  id          uuid primary key default gen_random_uuid(),
  obra_id     uuid not null references public.obras (id) on delete cascade,
  correo      text not null check (correo ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  iniciales   text not null,
  desde       timestamptz not null default now()
);

create table public.eventos_obra (
  id               bigint generated always as identity primary key,
  obra_id          uuid not null references public.obras (id) on delete restrict,
  tipo             text not null check (tipo in ('registro', 'entrega', 'reclamo', 'transferencia')),
  dueno_id         uuid references public.duenos (id),
  texto            text not null,
  creado_en        timestamptz not null default now(),
  huella_anterior  text not null,
  huella           text not null
);
create index on public.eventos_obra (obra_id, id);

create table public.escaneos (
  id          bigint generated always as identity primary key,
  obra_id     uuid not null references public.obras (id) on delete cascade,
  en          timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Cadena de huellas: cada evento guarda la huella del anterior.
-- ---------------------------------------------------------------------------

-- La fecha va en UTC y con formato fijo: si dependiera de la zona horaria de la
-- sesión, la misma cadena se vería rota desde otra computadora.
create function public.huella_de(p_anterior text, p_obra uuid, p_tipo text, p_dueno uuid, p_texto text, p_creado timestamptz)
returns text language sql immutable set search_path = public, extensions as $$
  select encode(digest(concat_ws('|', p_anterior, p_obra, p_tipo, coalesce(p_dueno::text, ''), p_texto,
    to_char(p_creado at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US')), 'sha256'), 'hex');
$$;

create function public.encadenar_evento() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare
  anterior text;
begin
  -- un evento por obra a la vez, para que la cadena no se bifurque
  perform pg_advisory_xact_lock(hashtext(new.obra_id::text));
  select huella into anterior from public.eventos_obra
    where obra_id = new.obra_id order by id desc limit 1;
  new.huella_anterior := coalesce(anterior, repeat('0', 64));
  new.creado_en := now();
  new.huella := public.huella_de(new.huella_anterior, new.obra_id, new.tipo, new.dueno_id, new.texto, new.creado_en);
  return new;
end $$;

create trigger eventos_encadenar before insert on public.eventos_obra
  for each row execute function public.encadenar_evento();

-- Nadie edita ni borra un evento. Ni el artista ni Brai desde la app.
create function public.eventos_solo_agregar() returns trigger
language plpgsql as $$
begin
  raise exception 'Los eventos de una obra no se editan ni se borran';
end $$;

create trigger eventos_inmutables before update or delete on public.eventos_obra
  for each row execute function public.eventos_solo_agregar();

-- Comprueba la cadena completa de una obra. true = nadie la ha tocado.
create function public.verificar_cadena(p_obra uuid) returns boolean
language sql stable security definer set search_path = public, extensions as $$
  with c as (
    select huella, huella_anterior,
      lag(huella, 1, repeat('0', 64)) over (order by id) as esperada,
      public.huella_de(huella_anterior, obra_id, tipo, dueno_id, texto, creado_en) as recalculada
    from public.eventos_obra where obra_id = p_obra
  )
  select coalesce(bool_and(huella_anterior = esperada and huella = recalculada), true) from c;
$$;

-- ---------------------------------------------------------------------------
-- Candado 1: el rol anon no toca tablas. Candado 2: RLS cerrado.
-- ---------------------------------------------------------------------------

revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;

alter table public.artistas         enable row level security;
alter table public.obras            enable row level security;
alter table public.codigos_dueno    enable row level security;
alter table public.intentos_reclamo enable row level security;
alter table public.duenos           enable row level security;
alter table public.eventos_obra     enable row level security;
alter table public.escaneos         enable row level security;

-- El artista con sesión ve y edita lo suyo. Nada más.
create policy artista_propio on public.artistas for all to authenticated
  using (usuario_id = auth.uid()) with check (usuario_id = auth.uid());

create policy obras_propias on public.obras for all to authenticated
  using (artista_id in (select id from public.artistas where usuario_id = auth.uid()))
  with check (artista_id in (select id from public.artistas where usuario_id = auth.uid()));

create policy duenos_de_mis_obras on public.duenos for select to authenticated
  using (obra_id in (select o.id from public.obras o join public.artistas a on a.id = o.artista_id where a.usuario_id = auth.uid()));

create policy eventos_de_mis_obras on public.eventos_obra for select to authenticated
  using (obra_id in (select o.id from public.obras o join public.artistas a on a.id = o.artista_id where a.usuario_id = auth.uid()));

create policy escaneos_de_mis_obras on public.escaneos for select to authenticated
  using (obra_id in (select o.id from public.obras o join public.artistas a on a.id = o.artista_id where a.usuario_id = auth.uid()));

-- codigos_dueno e intentos_reclamo: sin políticas = nadie desde la app. Solo las funciones.

grant select, insert, update on public.artistas, public.obras to authenticated;
grant select on public.duenos, public.eventos_obra, public.escaneos to authenticated;
grant usage on sequence public.registro_seq to authenticated;

-- ---------------------------------------------------------------------------
-- Funciones públicas (lo único que puede llamar alguien sin sesión)
-- ---------------------------------------------------------------------------

create function public.iniciales_de(p_correo text) returns text
language sql immutable as $$
  select string_agg(upper(left(p, 1)) || '.', ' ')
  from (
    select p from unnest(regexp_split_to_array(split_part(p_correo, '@', 1), '[._-]+')) with ordinality as t(p, n)
    where p <> '' order by n limit 2
  ) x;
$$;

-- Página de la obra: solo lo público. Dueño con iniciales, nunca correos.
create function public.obra_publica(p_codigo text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare
  o public.obras;
  a public.artistas;
begin
  select * into o from public.obras where codigo = upper(p_codigo);
  if not found then return null; end if;
  select * into a from public.artistas where id = o.artista_id;
  insert into public.escaneos (obra_id) values (o.id);
  return jsonb_build_object(
    'codigo', o.codigo, 'registro', o.registro, 'titulo', o.titulo, 'tecnica', o.tecnica,
    'medidas', o.medidas, 'anio', o.anio, 'historia', o.historia, 'imagen', o.imagen_url,
    'huellas', o.huellas, 'video', o.video_url,
    'artista', jsonb_build_object('slug', a.slug, 'nombre', a.nombre, 'disciplina', a.disciplina, 'acento', a.acento),
    'dueno', (select d.iniciales from public.duenos d where d.obra_id = o.id order by d.desde desc limit 1),
    'eventos', coalesce((select jsonb_agg(jsonb_build_object('tipo', e.tipo, 'fecha', e.creado_en::date, 'texto', e.texto) order by e.id)
                         from public.eventos_obra e where e.obra_id = o.id), '[]'),
    'huella_registro', (select e.huella from public.eventos_obra e where e.obra_id = o.id order by e.id desc limit 1),
    'cadena_intacta', public.verificar_cadena(o.id)
  );
end $$;

-- Reclamar: todo en un paso, con la fila del código bloqueada.
-- Devuelve {ok, iniciales} o {ok:false, error}. Máximo 5 intentos por hora por obra.
create function public.reclamar_obra(p_codigo text, p_codigo_dueno text, p_correo text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare
  o_id    uuid;
  c       public.codigos_dueno;
  limpio  text := upper(regexp_replace(coalesce(p_codigo_dueno, ''), '[^A-Za-z0-9]', '', 'g'));
  correo  text := lower(trim(coalesce(p_correo, '')));
  d_id    uuid;
  ini     text;
begin
  select id into o_id from public.obras where codigo = upper(p_codigo);
  if o_id is null then return jsonb_build_object('ok', false, 'error', 'no_existe'); end if;

  select * into c from public.codigos_dueno where obra_id = o_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'sin_codigo'); end if;

  if (select count(*) from public.intentos_reclamo where obra_id = o_id and en > now() - interval '1 hour') >= 5 then
    return jsonb_build_object('ok', false, 'error', 'demasiados_intentos');
  end if;
  insert into public.intentos_reclamo (obra_id) values (o_id);

  if c.usado_en is not null then return jsonb_build_object('ok', false, 'error', 'ya_reclamada'); end if;
  if c.hash <> crypt(limpio, c.hash) then return jsonb_build_object('ok', false, 'error', 'codigo_incorrecto'); end if;
  if correo !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then return jsonb_build_object('ok', false, 'error', 'correo_invalido'); end if;

  ini := public.iniciales_de(correo);
  insert into public.duenos (obra_id, correo, iniciales) values (o_id, correo, ini) returning id into d_id;
  update public.codigos_dueno set usado_en = now() where obra_id = o_id;
  insert into public.eventos_obra (obra_id, tipo, dueno_id, texto)
    values (o_id, 'reclamo', d_id, 'Reclamada por su dueño, ' || ini);
  return jsonb_build_object('ok', true, 'iniciales', ini);
end $$;

-- ---------------------------------------------------------------------------
-- Funciones del artista (con sesión)
-- ---------------------------------------------------------------------------

-- Registra el evento de registro y genera el código de dueño. Devuelve el
-- código en texto plano UNA sola vez, para imprimirlo bajo la raspadita.
create function public.registrar_obra(p_obra uuid) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  alfabeto constant text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  codigo text := '';
begin
  if not exists (select 1 from public.obras o join public.artistas a on a.id = o.artista_id
                 where o.id = p_obra and a.usuario_id = auth.uid()) then
    raise exception 'Esta obra no es tuya';
  end if;
  if exists (select 1 from public.codigos_dueno where obra_id = p_obra) then
    raise exception 'Esta obra ya tiene código de dueño';
  end if;
  for i in 1..8 loop
    codigo := codigo || substr(alfabeto, 1 + (get_byte(gen_random_bytes(1), 0) % 32), 1);
  end loop;
  insert into public.codigos_dueno (obra_id, hash) values (p_obra, crypt(codigo, gen_salt('bf', 8)));
  insert into public.eventos_obra (obra_id, tipo, texto) values (p_obra, 'registro', 'Registrada por el artista en su taller');
  return left(codigo, 4) || '-' || right(codigo, 4);
end $$;

-- Postgres da permiso de ejecutar a TODOS en cada función nueva. Se quita al final,
-- cuando ya existen todas, y se da solo lo necesario.
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function public.obra_publica(text), public.reclamar_obra(text, text, text) to anon, authenticated;
grant execute on function public.registrar_obra(uuid), public.verificar_cadena(uuid) to authenticated;
grant execute on function public.iniciales_de(text) to authenticated;
