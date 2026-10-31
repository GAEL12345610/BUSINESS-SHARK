---
name: funcion-nueva-nace-publica
description: "En Postgres cada función nueva nace ejecutable por PUBLIC; el revoke de funciones va al FINAL del SQL, después de crearlas todas, y se prueba con el rol anon"
---

En el primer esquema (`schema.sql`, ya reemplazado por `app/supabase/migrations/`) el `revoke execute on all functions ... from public, anon` estaba arriba, antes de crear las funciones. No protegía nada: Postgres le da EXECUTE a PUBLIC a cada función que se crea después, y Supabase además da permisos por defecto a `anon`.

- El revoke de funciones va al final, cuando ya existen todas. Después, un `grant` solo a lo que debe ser público (`obra_publica`, `reclamar_obra`).
- Una función `security definer` se salta el RLS: adentro tiene que revisar `auth.uid()` ella misma.
- Se prueba con el rol, no leyendo el SQL: `set role anon;` y llamar la función que NO debe poder usar. Ver `app/supabase/pruebas/10_pruebas.sql`, prueba 3.
