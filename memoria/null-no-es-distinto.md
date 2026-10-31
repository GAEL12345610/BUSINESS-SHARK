---
name: null-no-es-distinto
description: "En pruebas SQL compara con IS DISTINCT FROM, nunca con <>; NULL <> 'x' da NULL, el if no truena y la prueba pasa aunque la función esté rota"
---

**Qué pasó (31 oct 2026):** las pruebas del backend (`app/supabase/pruebas/10_pruebas.sql`) pasaron todas a la primera. Rompimos a propósito el límite de 5 intentos por hora y la prueba 5 **siguió pasando**. La función devolvía `{"ok": true}` sin campo `error`; `r->>'error' <> 'demasiados_intentos'` daba `NULL`, y `if NULL then` no entra.

**Cómo aplicarlo:**
- En SQL: `(x) is distinct from 'valor'`, `(bool) is not true`, `coalesce(texto, '') !~ patrón`.
- En JS pasa lo mismo con `undefined`: compara con `===` contra el valor esperado, no contra el que no quieres.
- **Una prueba que nunca viste fallar no prueba nada.** Después de escribirla, rompe el código a propósito (mutación) y confirma que truena. Ver `verificar-el-artefacto.md`.
