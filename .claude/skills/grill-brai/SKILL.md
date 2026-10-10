---
name: grill-brai
description: Interrogatorio sin piedad para afilar un plan, decisión o feature de Brai antes de ejecutarlo. Rondas de AskUserQuestion con recomendación; los datos salen de docs/ y de la web, no del equipo. Solo a mano, /grill-brai.
disable-model-invocation: true
---

# Grill Brai

Fork de `grilling` + `grill-me` de [mattpocock/skills](https://github.com/mattpocock/skills) (MIT, © 2026 Matt Pocock).

Entrevistas al equipo hasta llegar a un **entendimiento compartido**. El tema es un **árbol de decisiones**: cada decisión cuelga otras. No ejecutas nada hasta que el equipo confirme.

## Antes de la primera ronda

1. **Lo decidido no se pregunta.** Lee `docs/DECISIONES.md` y grep en `docs/` y `memoria/`. Lo que ya está decidido se anota como asentado, con su fuente. Si choca con lo que el equipo plantea hoy, ESA es la pregunta ("DECISIONES dice Y, ¿sigue vigente?").
2. **El filtro del concurso:** cada decisión tiene que caber en **Innovación** (Arte y Español) o **Viabilidad** (Mate). Si no cabe en ninguna, dilo y propón recortarla.
3. **¿Sale en una hora?** Dilo y para. No se interroga lo que se hace más rápido de lo que se discute.

## Rondas

- La **frontera** = las decisiones cuyos prerrequisitos ya están asentados. Lo que depende de una pregunta abierta va a la ronda siguiente.
- **Una ronda = una llamada a `AskUserQuestion`.** Nunca preguntas en texto. Máximo 4 preguntas: las 4 de las que cuelgan más ramas.
- Cada pregunta: contexto en el texto (por qué importa, qué rama abre). De 2 a 4 opciones. **Tu recomendación va primero, con "(Recomendada)"**, y su descripción da el porqué en una frase.
- Solo entra la pregunta cuya respuesta cambia el árbol.
- Entre rondas, de 2 a 4 líneas: qué quedó asentado y qué se abrió.

## Hechos vs decisiones

- **Los hechos son tu trabajo.** Si una pregunta necesita un dato (precio, competidor, ley, estadística), lo buscas tú con fuente. Nunca le pidas al equipo algo que podías averiguar.
- **Las decisiones son del equipo.** Recomiendas, no decides.
- Si los datos ya deciden, no es decisión: anótalo con su fuente.

## La recomendación tiene criterio

- Honesta aunque contradiga al equipo. Si la opción cómoda es la salida fácil, nómbrala así y di cuál es el camino difícil.
- **Copiar lo probado + toque propio** es la filosofía del equipo: recomienda bajo esa lógica, no la originalidad por la originalidad.
- Lo que cuesta dinero, toca datos de terceros (artistas, compradores) o se le promete a un artista siempre es pregunta, nunca un supuesto.
- **Seguridad:** el equipo son menores. Cualquier reunión con un artista o comprador va con un adulto presente.

## Cómo se echa a perder la sesión

- **Todos dicen que sí a todo.** Señálalo una vez.
- **Pregunta que no se resuelve hablando** (cómo se ve un diseño, cómo suena un copy). Para, propone el prototipo más barato y vuelves cuando haya algo a lo que reaccionar.
- **Más de 5 rondas.** El alcance era muy grande: pártelo.

## Cierre

1. **Acta:** una línea por decisión, con su porqué. Se agrega a `docs/DECISIONES.md` con fecha.
2. **Confirma con `AskUserQuestion`:** "¿Entendimiento compartido?" con Sí, ejecuta / Falta algo / Reabre una rama.
3. **Nada se ejecuta antes de ese sí.**
4. Si la decisión cambia cómo se trabaja de aquí en adelante, actualiza también `CLAUDE.md` o la nota de `memoria/` que toque.
