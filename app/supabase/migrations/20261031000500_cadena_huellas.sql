-- Cadena de huellas (docs/TOKENIZAR.md, DECISIONES #25): cada evento guarda la
-- huella sha256 del anterior. Editar un evento a escondidas (apagando el
-- candado) rompe la cadena y la página pública lo enseña.
alter table public.eventos_obra
  add column huella_anterior text,
  add column huella text;

-- Fecha en UTC con formato fijo: si dependiera de la zona horaria de la sesión,
-- la misma cadena se vería rota desde otra computadora (memoria/huella-con-fecha-en-utc.md).
create or replace function public.brai_huella(
  p_anterior text, p_obra uuid, p_tipo text, p_dueno uuid, p_nota text, p_creado timestamptz
)
returns text
language sql
immutable
set search_path = ''
as $$
  select encode(extensions.digest(concat_ws('|',
    p_anterior, p_obra::text, p_tipo, coalesce(p_dueno::text, ''), coalesce(p_nota, ''),
    to_char(p_creado at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US')), 'sha256'), 'hex');
$$;

create or replace function public.brai_encadenar_evento()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_anterior text;
begin
  -- Un evento por obra a la vez, para que la cadena no se bifurque.
  perform pg_advisory_xact_lock(hashtext(new.obra_id::text));
  select huella into v_anterior from public.eventos_obra
  where obra_id = new.obra_id order by id desc limit 1;
  new.huella_anterior := coalesce(v_anterior, repeat('0', 64));
  new.creado_en := now();
  new.huella := public.brai_huella(new.huella_anterior, new.obra_id, new.tipo, new.dueno_id, new.nota, new.creado_en);
  return new;
end;
$$;

create trigger eventos_obra_encadenar
  before insert on public.eventos_obra
  for each row execute function public.brai_encadenar_evento();

-- Recalcula toda la cadena de una obra. true = nadie la tocó.
create or replace function public.brai_verificar_cadena(p_obra_id uuid)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  e record;
  v_anterior text := repeat('0', 64);
begin
  for e in select * from public.eventos_obra where obra_id = p_obra_id order by id loop
    if e.huella_anterior is distinct from v_anterior
       or e.huella is distinct from public.brai_huella(e.huella_anterior, e.obra_id, e.tipo, e.dueno_id, e.nota, e.creado_en) then
      return false;
    end if;
    v_anterior := e.huella;
  end loop;
  return true;
end;
$$;

-- La página pública suma la huella del último evento y si la cadena está intacta.
alter function public.obra_publica(text) rename to brai_obra_publica_base;

create or replace function public.obra_publica(p_codigo text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_base jsonb := public.brai_obra_publica_base(p_codigo);
  v_obra_id uuid;
begin
  if v_base is null then
    return null;
  end if;
  select id into v_obra_id from public.obras where codigo = v_base->>'codigo';
  return v_base || jsonb_build_object(
    'cadena_intacta', public.brai_verificar_cadena(v_obra_id),
    'huella', (select huella from public.eventos_obra where obra_id = v_obra_id order by id desc limit 1)
  );
end;
$$;

revoke execute on function
  public.brai_huella(text, uuid, text, uuid, text, timestamptz),
  public.brai_encadenar_evento(),
  public.brai_verificar_cadena(uuid),
  public.brai_obra_publica_base(text),
  public.obra_publica(text)
from public, anon, authenticated;
grant execute on function public.obra_publica(text) to anon, authenticated;
