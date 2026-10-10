---
name: rls-es-la-unica-puerta
description: "En una app Vite + Supabase la ÚNICA protección real de los datos es el RLS; los route guards de React solo esconden pantallas"
---

El bundle de una SPA se descarga entero al navegador, incluida la anon key de Supabase. Un atacante llama a la base directo, saltándose el router.

- **Default deny.** Toda política empieza cerrada. Nunca `using (true)` en tablas con datos de personas.
- Cada rama de un `OR` en una política es una puerta aparte. `... or dueno_id is null` deja todo abierto si los registros nacen en null.
- **Verifica pegándole a la API, no leyendo la política:** `curl "$URL/rest/v1/<tabla>?select=<columna_que_exista>" -H "apikey: $ANON" -H "Authorization: Bearer $ANON"`. Si responde con datos, está abierta.
- Corre el agente `app-security-auditor` antes de publicar.
