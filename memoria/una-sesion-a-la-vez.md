---
name: una-sesion-a-la-vez
description: "Antes de construir, revisa git branch -a y PRs abiertos; dos sesiones de Claude en ramas distintas hacen dos apps, dos bases y decisiones con el mismo número"
---

**Qué pasó (31 oct 2026):** dos sesiones de Claude trabajaron el mismo día en ramas distintas (`claude/dreamy-carson-i2cigy` y `claude/relaxed-thompson-6i97x4`) sin saber una de la otra. Resultado: dos landings, dos esquemas de Supabase, "decisiones 17 a 25" duplicadas con contenido distinto y dos "marca v2.1". Se publicó la landing equivocada en Vercel y hubo que unir todo a mano (DECISIONES #35).

**Cómo aplicarlo:**
- Al empezar una sesión: `git fetch --all` y `git branch -a`. Si hay ramas `claude/*` sin unir a `main`, se revisan y se unen ANTES de construir.
- Lo que se ve en `localhost` no existe para nadie más hasta que está en `main`.
- Los números de `DECISIONES.md` se toman del archivo en `main`, no de la copia local.
