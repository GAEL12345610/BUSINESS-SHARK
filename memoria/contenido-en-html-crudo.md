---
name: contenido-en-html-crudo
description: "Lo que debe leer Google o un modelo de IA (landing, página del artista) tiene que estar en el HTML crudo, no solo pintado por JavaScript"
---

Los rastreadores de modelos de IA (GPTBot, ClaudeBot, PerplexityBot) **no ejecutan JavaScript**. Una landing pintada solo con React les llega casi vacía.

- La landing de Brai y las páginas de artista: texto principal en el HTML inicial (prerender o HTML estático), generado desde la misma fuente que el JS.
- Comprueba con `curl -A "PerplexityBot/1.0" https://brai.art` y cuenta las palabras.
