---
name: revoke-anon-desde-el-dia-uno
description: "Al crear las tablas en Supabase, revoca permisos al rol anon desde el primer día; RLS es un solo candado y conviene tener dos"
---

```sql
revoke all on public.obras, public.codigos_dueno, public.eventos_obra from anon;
```
- La página pública de la obra se sirve con una **vista o función** que solo devuelve lo público (sin correos), no abriendo la tabla.
- **Nunca revoques a `authenticated`**: es el rol de la app con sesión.
- Va en el archivo SQL del repo, no solo en el panel de Supabase: si no está en el repo, el siguiente cambio lo deshace.
- Prueba: con la anon key, la API debe responder `401` código `42501`.
