---
name: update-con-patch-no-fila-entera
description: "Para guardar, manda solo los campos que cambiaron (update con patch), nunca la fila entera desde la copia de una pantalla"
---

Si dos pantallas tienen su propia copia de la misma fila y una guarda la fila completa, **borra en silencio** lo que la otra acababa de escribir. No truena: solo pierde datos.

- Fila que ya existe: `update(patch).eq('id', id)`.
- Upsert completo solo para crearla.
- Si una acción depende de datos que quizá no cargaron, léelos frescos de la base en ese momento.
