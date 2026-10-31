-- Prueba del esquema en un Postgres local (no se corre en Supabase).
-- Simula lo que Supabase ya trae: auth.users, auth.uid(), roles anon y authenticated.
-- Uso: psql -v ON_ERROR_STOP=1 -f supabase/prueba_base.sql -f supabase/schema.sql -f supabase/prueba.sql
\set QUIET on
\pset format unaligned
\pset tuples_only on

insert into auth.users values ('11111111-1111-1111-1111-111111111111'), ('22222222-2222-2222-2222-222222222222');

-- El artista 1 crea su perfil y una obra
set role authenticated;
set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
insert into artistas (usuario_id, slug, nombre) values (auth.uid(), 'jose-luis-malo', 'José Luis Malo');
insert into obras (artista_id, codigo, titulo, tecnica, medidas, anio)
  select id, '7KQ2X', 'Los olvidados', 'Óleo sobre tela', '60 × 80 cm', 2026 from artistas;
select 'registro generado: ' || registro from obras;
create temp table cod as select registrar_obra((select id from obras)) as c;
select 'codigo de dueno con formato XXXX-XXXX: ' || (c ~ '^[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$') from cod;

-- El artista 2 no ve ni toca la obra del 1
set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select 'artista 2 ve obras ajenas: ' || count(*) from obras;
do $$ begin perform registrar_obra((select id from public.obras limit 1)); raise exception 'FALLO: registró obra ajena';
exception when others then if sqlerrm like 'FALLO%' then raise; end if; raise notice 'artista 2 no puede registrar obra ajena: ok'; end $$;
reset role;

-- anon: ninguna tabla, solo las dos funciones
set role anon;
do $$ begin perform 1 from public.obras; raise exception 'FALLO: anon lee obras';
exception when insufficient_privilege then raise notice 'anon no lee obras: ok'; end $$;
do $$ begin perform 1 from public.duenos; raise exception 'FALLO: anon lee duenos';
exception when insufficient_privilege then raise notice 'anon no lee duenos: ok'; end $$;
do $$ begin perform public.registrar_obra(gen_random_uuid()); raise exception 'FALLO: anon registra';
exception when insufficient_privilege then raise notice 'anon no ejecuta registrar_obra: ok'; end $$;
select 'pagina publica, titulo: ' || (obra_publica('7kq2x')->>'titulo');
select 'pagina publica sin correos: ' || (obra_publica('7KQ2X')::text not like '%@%');

-- Reclamar: código malo, luego el bueno, luego otra vez
select 'codigo malo: ' || (reclamar_obra('7KQ2X', 'AAAA-AAAA', 'ana.lopez@correo.com')->>'error');
reset role;
select set_config('prueba.codigo', c, false) from cod \g /dev/null
set role anon;
select 'codigo bueno: ' || reclamar_obra('7KQ2X', lower(current_setting('prueba.codigo')), 'Ana.Lopez@Correo.com')::text;
select 'reclamar dos veces: ' || (reclamar_obra('7KQ2X', current_setting('prueba.codigo'), 'otro@correo.com')->>'error');
select 'dueno publico: ' || (obra_publica('7KQ2X')->>'dueno');
select 'cadena intacta: ' || (obra_publica('7KQ2X')->>'cadena_intacta');
-- límite de intentos: ya van 3, con 2 más se llega a 5 y el sexto se bloquea
select reclamar_obra('7KQ2X', 'X', 'a@b.co') \g /dev/null
select reclamar_obra('7KQ2X', 'X', 'a@b.co') \g /dev/null
select 'sexto intento en una hora: ' || (reclamar_obra('7KQ2X', 'X', 'a@b.co')->>'error');
reset role;

-- La cadena no depende de la zona horaria de quien la verifica
set timezone = 'America/Mexico_City';
select 'cadena desde CDMX: ' || verificar_cadena((select id from obras));
set timezone = 'Asia/Tokyo';
select 'cadena desde Tokio: ' || verificar_cadena((select id from obras));
reset timezone;

-- Nadie edita eventos, ni el dueño de la base
do $$ begin update public.eventos_obra set texto = 'Reclamada por X'; raise exception 'FALLO: se editó un evento';
exception when others then if sqlerrm like 'FALLO%' then raise; end if; raise notice 'editar evento bloqueado: ok'; end $$;

-- Si alguien se salta el candado (apaga el trigger) y edita, la cadena lo delata
alter table eventos_obra disable trigger eventos_inmutables;
update eventos_obra set texto = 'Reclamada por su dueño, Z. Z.' where tipo = 'reclamo';
alter table eventos_obra enable trigger eventos_inmutables;
select 'cadena tras editar a escondidas: ' || verificar_cadena((select id from obras));
