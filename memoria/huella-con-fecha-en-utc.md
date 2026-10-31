---
name: huella-con-fecha-en-utc
description: "Si una huella (hash) incluye una fecha, conviértela a texto en UTC con formato fijo; si depende de la zona horaria de la sesión, la cadena se ve rota desde otra computadora"
---

La cadena de huellas de `eventos_obra` metía `creado_en` directo en el texto del hash. En Postgres, convertir un `timestamptz` a texto usa la zona horaria de quien lo pide: la huella calculada en una sesión no coincide al verificarla desde otra, y la obra se ve "alterada" sin que nadie la toque.

- Una sola función calcula la huella (`huella_de`) y la usan el trigger y la verificación.
- La fecha va con `to_char(fecha at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US')`.
- La prueba cambia `set timezone` a dos zonas distintas y verifica en ambas. Una prueba en una sola zona no vería el fallo.
