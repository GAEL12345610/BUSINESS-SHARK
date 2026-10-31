-- Pruebas del backend de Brai.
-- OJO: compara con IS DISTINCT FROM, nunca con <>. En SQL, NULL <> 'x' da NULL
-- y el if no truena: la prueba pasaría aunque la función no devuelva nada. Corren con app/supabase/pruebas/correr.sh
-- Cada bloque truena (y el script se detiene) si algo no es lo esperado.
\set ON_ERROR_STOP 1
\pset format unaligned
\pset tuples_only on

-- Preparación (como dueño de la base): dos artistas con usuario.
insert into auth.users (id, email) values
  ('11111111-1111-4111-8111-111111111111', 'artista@ejemplo.test'),
  ('22222222-2222-4222-8222-222222222222', 'otro@ejemplo.test'),
  ('33333333-3333-4333-8333-333333333333', 'curioso@ejemplo.test');
update public.artistas set user_id = '11111111-1111-4111-8111-111111111111' where slug = 'ejemplo';
insert into public.artistas (id, slug, nombre, user_id)
values ('00000000-0000-4000-8000-000000000002', 'otro-artista', 'Otro Artista', '22222222-2222-4222-8222-222222222222');
insert into public.obras (id, artista_id, titulo)
values ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000002', 'Obra ajena');

select 'preparación lista';

-- ===========================================================================
-- ANON (cualquiera en internet con la anon key)
-- ===========================================================================
set role anon;

-- 1. Ninguna tabla se puede leer directo.
do $$
declare t text;
begin
  foreach t in array array['artistas','obras','duenos','codigos_dueno','intentos_reclamo','eventos_obra','escaneos','sellos'] loop
    begin
      execute format('select 1 from public.%I limit 1', t);
      raise exception 'FALLA: anon pudo leer %', t;
    exception when insufficient_privilege then null;
    end;
  end loop;
end $$;
select 'ok 1: anon no lee ninguna tabla';

-- 2. Ni escribir.
do $$ begin
  insert into public.eventos_obra (obra_id, tipo) values ('00000000-0000-4000-8000-000000000101', 'nota');
  raise exception 'FALLA: anon insertó un evento';
exception when insufficient_privilege then null;
end $$;
select 'ok 2: anon no escribe';

-- 3. Funciones del panel cerradas para anon.
do $$ begin
  perform public.generar_codigo_dueno('00000000-0000-4000-8000-000000000101');
  raise exception 'FALLA: anon generó un código';
exception when insufficient_privilege then null;
end $$;
do $$ begin
  perform public.panel_obras();
  raise exception 'FALLA: anon leyó el panel';
exception when insufficient_privilege then null;
end $$;
do $$ begin
  perform public.brai_es_mi_obra('00000000-0000-4000-8000-000000000101');
  raise exception 'FALLA: anon ejecutó un helper interno';
exception when insufficient_privilege then null;
end $$;
select 'ok 3: funciones del panel cerradas para anon';

-- 4. La página pública de la obra funciona y acepta minúsculas.
do $$
declare o jsonb := public.obra_publica('7kq2x');
begin
  if o is null or (o->>'titulo') is distinct from 'Tarde en Tlaquepaque' then raise exception 'FALLA: obra_publica %', o; end if;
  if (o->>'reclamada')::boolean is not false then raise exception 'FALLA: nace reclamada'; end if;
  if (o->>'codigo_vivo')::boolean is not true then raise exception 'FALLA: sin código vivo'; end if;
  if jsonb_array_length(o->'eventos') <> 1 or (o->'eventos'->0->>'tipo') is distinct from 'registro' then
    raise exception 'FALLA: falta el evento de registro %', o->'eventos';
  end if;
  if coalesce(o->>'registro', '') !~ '^BRAI-\d{4}$' then raise exception 'FALLA: registro %', o->>'registro'; end if;
  if public.obra_publica('ZZZZZ') is not null then raise exception 'FALLA: inventa obras'; end if;
end $$;
select 'ok 4: obra_publica';

-- 5. Código equivocado: cuenta intentos y frena en 5 por hora.
do $$
declare r jsonb; i int;
begin
  for i in 1..5 loop
    r := public.reclamar_obra('M4RTZ', 'AAAA-AAAA', 'alguien@correo.test', 'Alguien Raro');
    if (r->>'error') is distinct from 'codigo_incorrecto' then raise exception 'FALLA intento %: %', i, r; end if;
  end loop;
  if (r->>'intentos_restantes')::int is distinct from 0 then raise exception 'FALLA: restantes %', r; end if;
  -- Aunque ahora traiga el código BUENO, ya está frenado.
  r := public.reclamar_obra('M4RTZ', 'TQ7N-K2DV', 'alguien@correo.test', 'Alguien Raro');
  if (r->>'error') is distinct from 'demasiados_intentos' then raise exception 'FALLA: no frenó %', r; end if;
end $$;
select 'ok 5: límite de 5 intentos por hora';

-- 6. Validaciones de entrada.
do $$
declare r jsonb;
begin
  r := public.reclamar_obra('7KQ2X', 'HFKW-3P9Q', 'no-es-correo', 'María Rodríguez');
  if (r->>'error') is distinct from 'correo_invalido' then raise exception 'FALLA correo: %', r; end if;
  r := public.reclamar_obra('7KQ2X', 'HFKW-3P9Q', 'maria@correo.test', 'M');
  if (r->>'error') is distinct from 'nombre_invalido' then raise exception 'FALLA nombre: %', r; end if;
end $$;
select 'ok 6: valida correo y nombre';

-- 7. Reclamo correcto (con espacios y minúsculas, como lo escribe una persona).
do $$
declare r jsonb;
begin
  r := public.reclamar_obra('7KQ2X', ' hfkw 3p9q ', 'Maria@Correo.test', '  María   Rodríguez ');
  if (r->>'ok')::boolean is not true or (r->>'tipo') is distinct from 'reclamo' or (r->>'dueno') is distinct from 'M. R.' then
    raise exception 'FALLA reclamo: %', r;
  end if;
  -- El mismo código ya no sirve.
  r := public.reclamar_obra('7KQ2X', 'HFKW-3P9Q', 'otra@correo.test', 'Otra Persona');
  if (r->>'error') is distinct from 'sin_codigo_vivo' then raise exception 'FALLA: el código revivió %', r; end if;
end $$;
select 'ok 7: reclamo de un solo uso';

-- 8. La página pública muestra al dueño SOLO con iniciales, jamás el correo.
do $$
declare o jsonb := public.obra_publica('7KQ2X');
begin
  if (o->>'reclamada')::boolean is not true then raise exception 'FALLA: no quedó reclamada'; end if;
  if (o->'eventos'->1->>'dueno') is distinct from 'M. R.' then raise exception 'FALLA iniciales: %', o->'eventos'; end if;
  if o::text ilike '%correo.test%' or o::text ilike '%María%' then raise exception 'FALLA: se filtró un dato personal'; end if;
  if public.artista_publico('ejemplo')::text ilike '%correo.test%' then raise exception 'FALLA: artista_publico filtra correos'; end if;
end $$;
select 'ok 8: privacidad del dueño';

-- 9. Escaneos con freno de 30 por minuto.
do $$
declare i int;
begin
  for i in 1..40 loop perform public.registrar_escaneo('7KQ2X', 'nfc'); end loop;
  if (public.obra_publica('7KQ2X')->>'escaneos')::int <> 30 then
    raise exception 'FALLA escaneos: %', public.obra_publica('7KQ2X')->>'escaneos';
  end if;
end $$;
select 'ok 9: escaneos con freno';

reset role;

-- ===========================================================================
-- ARTISTA con sesión
-- ===========================================================================
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', false);

-- 10. Ve sus obras y al dueño con correo (para eso paga). No ve obras ajenas.
do $$
declare p jsonb := public.panel_obras(); n int;
begin
  if jsonb_array_length(p) <> 2 then raise exception 'FALLA panel: % obras', jsonb_array_length(p); end if;
  if not exists (select 1 from jsonb_array_elements(p) x where x->'dueno'->>'email' = 'maria@correo.test') then
    raise exception 'FALLA: el artista no ve a su dueño %', p;
  end if;
  select count(*) into n from public.obras;
  if n <> 2 then raise exception 'FALLA RLS obras: ve %', n; end if;
  select count(*) into n from public.duenos;
  if n <> 1 then raise exception 'FALLA RLS dueños: ve %', n; end if;
end $$;
select 'ok 10: el artista ve lo suyo';

-- 11. Registra una obra nueva: nace con registro, código y evento.
do $$
declare v_id uuid; o jsonb;
begin
  insert into public.obras (artista_id, titulo, tecnica, anio)
  values ('00000000-0000-4000-8000-000000000001', 'Obra nueva de prueba', 'Acrílico', 2026)
  returning id into v_id;
  select to_jsonb(x) into o from public.obras x where id = v_id;
  if coalesce(o->>'codigo', '') !~ '^[2-9A-HJKMNP-TV-Z]{5}$' then raise exception 'FALLA código: %', o->>'codigo'; end if;
  if not exists (select 1 from public.eventos_obra where obra_id = v_id and tipo = 'registro') then
    raise exception 'FALLA: sin evento de registro';
  end if;
end $$;
select 'ok 11: registrar obra';

-- 12. No puede registrar a nombre de otro artista, ni cambiar columnas protegidas.
do $$ begin
  insert into public.obras (artista_id, titulo) values ('00000000-0000-4000-8000-000000000002', 'Intruso');
  raise exception 'FALLA: registró obra ajena';
exception when insufficient_privilege then null;
end $$;
do $$ begin
  update public.artistas set user_id = '33333333-3333-4333-8333-333333333333';
  raise exception 'FALLA: cambió el dueño de la cuenta';
exception when insufficient_privilege then null;
end $$;
do $$ begin
  update public.obras set registro = 'BRAI-9999';
  raise exception 'FALLA: cambió el número de registro';
exception when insufficient_privilege then null;
end $$;
do $$
declare n int;
begin
  update public.obras set titulo = 'Hackeada' where artista_id = '00000000-0000-4000-8000-000000000002';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALLA: editó obra ajena'; end if;
end $$;
select 'ok 12: no toca lo ajeno ni lo protegido';

-- 13. La historia no se edita ni se borra.
do $$ begin
  delete from public.eventos_obra;
  raise exception 'FALLA: borró eventos';
exception when insufficient_privilege then null;
end $$;
select 'ok 13: historia inmutable para el artista';

-- 14. Código de obra ajena: rechazado. Transferencia con código nuevo: funciona.
do $$ begin
  perform public.generar_codigo_dueno('00000000-0000-4000-8000-000000000201');
  raise exception 'FALLA: generó código de obra ajena';
exception when insufficient_privilege then null;
end $$;
create temp table codigo_nuevo as
  select public.generar_codigo_dueno('00000000-0000-4000-8000-000000000101') as c;
do $$
declare c text := (select c from codigo_nuevo);
begin
  if coalesce(c, '') !~ '^[2-9A-HJKMNP-TV-Z]{4}-[2-9A-HJKMNP-TV-Z]{4}$' then raise exception 'FALLA formato: %', c; end if;
end $$;
select 'ok 14: código nuevo solo para obra propia';

do $$ begin
  perform public.agregar_nota('00000000-0000-4000-8000-000000000101', 'Expuesta en una muestra de ejemplo, 2026');
end $$;
select 'ok 15: nota en la historia';

reset role;
grant select on codigo_nuevo to anon;
set role anon;
select set_config('request.jwt.claim.sub', '', false);

do $$
declare r jsonb; o jsonb;
begin
  r := public.reclamar_obra('7KQ2X', (select c from codigo_nuevo), 'nuevo@correo.test', 'Nuevo Dueño');
  if (r->>'ok')::boolean is not true or (r->>'tipo') is distinct from 'transferencia' then raise exception 'FALLA transferencia: %', r; end if;
  o := public.obra_publica('7KQ2X');
  if (o->'eventos'->-1->>'dueno') is distinct from 'N. D.' then raise exception 'FALLA línea de tiempo: %', o->'eventos'; end if;
end $$;
select 'ok 16: transferencia a un nuevo dueño';

reset role;

-- ===========================================================================
-- Otro usuario con sesión que NO es el artista
-- ===========================================================================
set role authenticated;
select set_config('request.jwt.claim.sub', '33333333-3333-4333-8333-333333333333', false);
do $$
declare n int;
begin
  select count(*) into n from public.duenos;
  if n <> 0 then raise exception 'FALLA: un curioso ve % dueños', n; end if;
  select count(*) into n from public.obras;
  if n <> 0 then raise exception 'FALLA: un curioso ve % obras', n; end if;
  if jsonb_array_length(public.panel_obras()) <> 0 then raise exception 'FALLA: un curioso ve un panel'; end if;
end $$;
select 'ok 17: un usuario cualquiera no ve nada';
reset role;

-- 18. Ni el dueño de la base puede reescribir la historia.
do $$ begin
  update public.eventos_obra set tipo = 'nota';
  raise exception 'FALLA: se editó la historia';
exception when insufficient_privilege then null;
end $$;
select 'ok 18: historia inmutable hasta para el admin';

-- 19. Storage: el artista sube a SU carpeta, no a la de otro.
set role authenticated;
select set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', false);
insert into storage.objects (bucket_id, name) values ('obras', '00000000-0000-4000-8000-000000000001/foto.jpg');
do $$ begin
  insert into storage.objects (bucket_id, name) values ('obras', '00000000-0000-4000-8000-000000000002/foto.jpg');
  raise exception 'FALLA: subió a carpeta ajena';
exception when insufficient_privilege then null;
end $$;
reset role;
select 'ok 19: storage por carpeta';

-- 20. Sellos 424 DNA: el contador tiene que avanzar.
insert into public.sellos (uid, obra_id) values ('04DE5F1EACC040', '00000000-0000-4000-8000-000000000102');
do $$
declare r text;
begin
  r := public.sello_confirmar('M4RTZ', '04de5f1eacc040', 61);
  if r is distinct from 'original' then raise exception 'FALLA sello: %', r; end if;
  r := public.sello_confirmar('M4RTZ', '04DE5F1EACC040', 61);
  if r is distinct from 'enlace_repetido' then raise exception 'FALLA repetido: %', r; end if;
  r := public.sello_confirmar('7KQ2X', '04DE5F1EACC040', 99);
  if r is distinct from 'chip_de_otra_obra' then raise exception 'FALLA otra obra: %', r; end if;
  r := public.sello_confirmar('M4RTZ', '04AAAAAAAAAAAA', 1);
  if r is distinct from 'chip_desconocido' then raise exception 'FALLA desconocido: %', r; end if;
end $$;
set role anon;
do $$ begin
  perform public.sello_confirmar('M4RTZ', '04DE5F1EACC040', 999);
  raise exception 'FALLA: anon confirmó un sello sin firma';
exception when insufficient_privilege then null;
end $$;
reset role;
select 'ok 20: sellos 424 DNA';

select 'TODAS LAS PRUEBAS PASARON';
