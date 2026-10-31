-- Datos de EJEMPLO para desarrollo local y para la demo.
-- es_demo = true: la página muestra "Página de ejemplo". Nada de aquí es un
-- artista ni un comprador real (regla 3 de CLAUDE.md).
-- Los códigos de dueño de ejemplo están en app/src/demo/datos.ts y en
-- docs/PROTOTIPO.md: NUNCA uses estos códigos con obras reales.

insert into public.artistas (id, slug, nombre, bio, ciudad, es_demo, tema)
values (
  '00000000-0000-4000-8000-000000000001',
  'ejemplo',
  'Lucía Arce',
  'Artista de ejemplo para probar Brai. Pinta al óleo escenas de Tlaquepaque y Tonalá.',
  'Guadalajara, Jalisco',
  true,
  '{"acento": "#A2563D"}'
) on conflict (id) do nothing;

insert into public.obras (id, artista_id, codigo, titulo, tecnica, medidas, anio, historia, sello)
values
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', '7KQ2X',
   'Tarde en Tlaquepaque', 'Óleo sobre tela', '60 × 80 cm', 2026,
   'Obra de ejemplo. Pintada en tres sesiones durante la temporada de lluvias, con la luz de las cinco de la tarde.',
   'ntag213'),
  ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000001', 'M4RTZ',
   'Barro de Tonalá', 'Óleo y espátula sobre tela', '50 × 50 cm', 2026,
   'Obra de ejemplo. Hecha con espátula y pigmento de tierra de Tonalá.',
   'ntag424')
on conflict (id) do nothing;

-- Código de dueño de ejemplo para 7KQ2X: HFKW-3P9Q (se guarda solo el hash).
insert into public.codigos_dueno (obra_id, codigo_hash)
select '00000000-0000-4000-8000-000000000101', extensions.crypt('HFKW3P9Q', extensions.gen_salt('bf', 8))
where not exists (
  select 1 from public.codigos_dueno
  where obra_id = '00000000-0000-4000-8000-000000000101' and usado_en is null and anulado_en is null
);

-- Código de dueño de ejemplo para M4RTZ: TQ7N-K2DV.
insert into public.codigos_dueno (obra_id, codigo_hash)
select '00000000-0000-4000-8000-000000000102', extensions.crypt('TQ7NK2DV', extensions.gen_salt('bf', 8))
where not exists (
  select 1 from public.codigos_dueno
  where obra_id = '00000000-0000-4000-8000-000000000102' and usado_en is null and anulado_en is null
);
