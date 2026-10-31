-- Sellos NTAG 424 DNA. La firma se revisa en la función Edge "sello" (que
-- tiene las llaves). Aquí solo se confirma que ese chip es de esa obra y que
-- el contador avanzó: si no avanzó, alguien está reusando un enlace copiado.
create or replace function public.sello_confirmar(p_codigo text, p_uid text, p_contador int)
returns text
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_sello public.sellos;
  v_obra_id uuid;
begin
  select id into v_obra_id from public.obras where codigo = public.brai_normalizar_codigo(p_codigo);
  if v_obra_id is null then
    return 'obra_no_encontrada';
  end if;

  select * into v_sello from public.sellos where uid = upper(p_uid) for update;
  if not found then
    return 'chip_desconocido';
  end if;
  if v_sello.obra_id <> v_obra_id then
    return 'chip_de_otra_obra';
  end if;
  if p_contador <= v_sello.ultimo_contador then
    return 'enlace_repetido';
  end if;

  update public.sellos set ultimo_contador = p_contador where uid = v_sello.uid;
  insert into public.escaneos (obra_id, via, sello_ok) values (v_obra_id, 'nfc', true);
  return 'original';
end;
$$;

revoke execute on function public.sello_confirmar(text, text, int) from public, anon, authenticated;
grant execute on function public.sello_confirmar(text, text, int) to service_role;
