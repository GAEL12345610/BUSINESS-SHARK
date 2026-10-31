-- Brai, esquema base del prototipo.
-- Regla: la verdad vive en el registro. Las tablas NO se abren al rol anon:
-- lo público sale por funciones que solo devuelven lo público (ver 0200).

create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

-- Alfabeto sin caracteres que se confunden (sin 0 O 1 I L U).
-- Sirve para el código corto de la URL y para el código de dueño.
create or replace function public.brai_codigo_aleatorio(largo int)
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  alfabeto constant text := '23456789ABCDEFGHJKMNPQRSTVWXYZ';
  bytes bytea := extensions.gen_random_bytes(largo);
  salida text := '';
  i int;
begin
  for i in 0 .. largo - 1 loop
    -- 256 no es múltiplo de 30: el sesgo es mínimo (8 de 256) y aceptable para un código de un solo uso.
    salida := salida || substr(alfabeto, (get_byte(bytes, i) % 30) + 1, 1);
  end loop;
  return salida;
end;
$$;

-- Normaliza lo que escribe una persona: mayúsculas, sin espacios ni guiones.
create or replace function public.brai_normalizar_codigo(entrada text)
returns text
language sql
immutable
set search_path = ''
as $$
  select upper(regexp_replace(coalesce(entrada, ''), '[^0-9A-Za-z]', '', 'g'));
$$;

-- ---------------------------------------------------------------------------
-- Artistas
-- ---------------------------------------------------------------------------
create table public.artistas (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]([a-z0-9-]{1,38}[a-z0-9])?$'),
  nombre      text not null check (char_length(nombre) between 2 and 80),
  bio         text check (char_length(bio) <= 1200),
  ciudad      text check (char_length(ciudad) <= 80),
  instagram   text check (instagram ~ '^[A-Za-z0-9._]{1,30}$'),
  -- Tema del white label: colores y logo dentro de la marca. Nunca HTML.
  tema        jsonb not null default '{}'::jsonb,
  dominio     text unique,
  es_demo     boolean not null default false,
  user_id     uuid references auth.users (id) on delete set null,
  creado_en   timestamptz not null default now()
);
create index on public.artistas (user_id);

-- ---------------------------------------------------------------------------
-- Obras
-- ---------------------------------------------------------------------------
create sequence public.registro_seq start 1;

create table public.obras (
  id            uuid primary key default gen_random_uuid(),
  artista_id    uuid not null references public.artistas (id) on delete restrict,
  registro      text not null unique
                default 'BRAI-' || lpad(nextval('public.registro_seq')::text, 4, '0'),
  codigo        text not null unique default public.brai_codigo_aleatorio(5)
                check (codigo ~ '^[2-9A-HJKMNP-TV-Z]{5}$'),
  titulo        text not null check (char_length(titulo) between 1 and 140),
  tecnica       text check (char_length(tecnica) <= 140),
  medidas       text check (char_length(medidas) <= 60),
  anio          int check (anio between 1900 and 2100),
  historia      text check (char_length(historia) <= 4000),
  -- Rutas dentro del bucket "obras" de Storage, no URLs completas.
  fotos         text[] not null default '{}',
  fotos_huella  text[] not null default '{}',
  sello         text not null default 'ntag213' check (sello in ('ntag213', 'ntag424', 'solo_qr')),
  publicada     boolean not null default true,
  creado_en     timestamptz not null default now()
);
create index on public.obras (artista_id);

-- ---------------------------------------------------------------------------
-- Dueños (datos personales: nunca salen completos a la página pública)
-- ---------------------------------------------------------------------------
create table public.duenos (
  id         uuid primary key default gen_random_uuid(),
  email      extensions.citext not null unique check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  nombre     text not null check (char_length(nombre) between 2 and 80),
  user_id    uuid references auth.users (id) on delete set null,
  creado_en  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Códigos de dueño: se guardan con hash bcrypt, jamás en texto plano.
-- Solo puede haber UN código vivo por obra.
-- ---------------------------------------------------------------------------
create table public.codigos_dueno (
  id           uuid primary key default gen_random_uuid(),
  obra_id      uuid not null references public.obras (id) on delete cascade,
  codigo_hash  text not null,
  usado_en     timestamptz,
  anulado_en   timestamptz,
  creado_en    timestamptz not null default now()
);
create unique index codigos_dueno_uno_vivo
  on public.codigos_dueno (obra_id) where usado_en is null and anulado_en is null;

-- Intentos de reclamo, para el límite de 5 por hora por obra.
create table public.intentos_reclamo (
  id         bigint generated always as identity primary key,
  obra_id    uuid not null references public.obras (id) on delete cascade,
  acierto    boolean not null,
  creado_en  timestamptz not null default now()
);
create index on public.intentos_reclamo (obra_id, creado_en desc);

-- ---------------------------------------------------------------------------
-- Eventos de la obra: SOLO se agregan. Nunca se editan ni se borran.
-- ---------------------------------------------------------------------------
create table public.eventos_obra (
  id         bigint generated always as identity primary key,
  obra_id    uuid not null references public.obras (id) on delete restrict,
  tipo       text not null check (tipo in ('registro', 'reclamo', 'transferencia', 'nota')),
  dueno_id   uuid references public.duenos (id) on delete restrict,
  nota       text check (char_length(nota) <= 280),
  creado_en  timestamptz not null default now()
);
create index on public.eventos_obra (obra_id, creado_en);

create or replace function public.brai_eventos_inmutables()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'eventos_obra solo acepta inserciones' using errcode = '42501';
end;
$$;

create trigger eventos_obra_inmutables
  before update or delete on public.eventos_obra
  for each row execute function public.brai_eventos_inmutables();

-- Al registrar una obra nace su primer evento.
create or replace function public.brai_evento_registro()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.eventos_obra (obra_id, tipo) values (new.id, 'registro');
  return new;
end;
$$;

create trigger obras_evento_registro
  after insert on public.obras
  for each row execute function public.brai_evento_registro();

-- ---------------------------------------------------------------------------
-- Escaneos: cuántas veces se tocó la obra. Sirve para el caso documentado.
-- ---------------------------------------------------------------------------
create table public.escaneos (
  id         bigint generated always as identity primary key,
  obra_id    uuid not null references public.obras (id) on delete cascade,
  via        text not null default 'link' check (via in ('nfc', 'qr', 'link')),
  sello_ok   boolean,
  creado_en  timestamptz not null default now()
);
create index on public.escaneos (obra_id, creado_en desc);

-- ---------------------------------------------------------------------------
-- Sellos NTAG 424 DNA (versión 2). Las llaves NO viven aquí: viven en los
-- secretos de la función "sello". Aquí solo el UID y el último contador visto,
-- para detectar un enlace copiado y reusado.
-- ---------------------------------------------------------------------------
create table public.sellos (
  uid              text primary key check (uid ~ '^[0-9A-F]{14}$'),
  obra_id          uuid not null unique references public.obras (id) on delete restrict,
  ultimo_contador  int not null default -1,
  creado_en        timestamptz not null default now()
);
