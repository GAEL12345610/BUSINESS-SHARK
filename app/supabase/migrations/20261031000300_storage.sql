-- Fotos de las obras. Bucket público para LEER (las fotos se ven en la página
-- de la obra), pero solo el artista escribe, y solo dentro de su carpeta:
--   obras/<artista_id>/<archivo>
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('obras', 'obras', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy obras_fotos_subir on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'obras'
    and public.brai_es_mi_artista(((storage.foldername(name))[1])::uuid)
  );

create policy obras_fotos_editar on storage.objects
  for update to authenticated
  using (bucket_id = 'obras' and public.brai_es_mi_artista(((storage.foldername(name))[1])::uuid))
  with check (bucket_id = 'obras' and public.brai_es_mi_artista(((storage.foldername(name))[1])::uuid));

create policy obras_fotos_borrar on storage.objects
  for delete to authenticated
  using (bucket_id = 'obras' and public.brai_es_mi_artista(((storage.foldername(name))[1])::uuid));
