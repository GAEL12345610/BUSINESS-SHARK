---
name: heredoc-de-bash-come-backslashes
description: "En Windows no metas rutas con diagonal invertida ni scripts largos dentro de un heredoc de Bash; escríbelos en un archivo .py aparte"
---

Un script de Python pegado en un heredoc de Bash con `C:\\dev\\...` llega con las diagonales colapsadas: el reemplazo no encuentra el texto o escribe rutas rotas. Y una comilla suelta dentro del heredoc rompe todo el comando.

- Escribe el script en un archivo y córrelo con `python -X utf8 archivo.py`.
- O usa diagonales normales: `C:/dev/brai` funciona igual en Python.
- `python -X utf8` siempre en Windows: la consola cp1252 truena con acentos.
