---
name: supabase-config-se-verifica-por-rechazo
description: "Un cambio en la config de auth de Supabase tarda segundos en aplicar; se verifica viendo el rechazo, no leyendo el flag"
---

Al cerrar el registro de usuarios, la API devolvió el flag en `true` y aun así el siguiente registro **creó una cuenta**. A los ~10 segundos ya rechazaba.

Después de tocar la config de auth: reintenta la acción hasta ver el rechazo 2 o 3 veces seguidas. Si la prueba cuela una cuenta, bórrala.
