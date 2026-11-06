---
name: texto-fijo-choca-con-personalizacion
description: "Un texto que afirma algo de la persona en pantalla (por ejemplo, que es ficticia) se rompe cuando la demo se personaliza con un nombre real: condiciónalo por el modo"
---

Al rotular a Lucía Arce como "artista ficticia", el mismo texto habría salido con `/recorrido?para=Nombre`, que pone el nombre de un artista real en su lugar: "José es una artista ficticia". Se arregló con `ES_FICTICIA` en `src/data/demo.ts` (verdadero solo sin nombre personalizado y fuera del modo José Luis).

- Cada texto que habla de la persona en pantalla se revisa en los tres modos: ejemplo, `?para=` y `/jose-luis`.
- No metas afirmaciones sobre una persona en los datos que se reemplazan por nombre (bio, eventos) sin ver qué pasa al reemplazarlo.
