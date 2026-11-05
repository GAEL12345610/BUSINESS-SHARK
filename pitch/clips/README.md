# Clips para el infomercial y redes

| Archivo | Qué es | Formato |
|---|---|---|
| `animatic-infomercial.mp4` | **Guía para grabar, no es el infomercial.** Una tarjeta por escena (toma, voz, texto en pantalla), con capturas de la demo y este clip. 75 s, con el `.srt` como pista de subtítulos. Se regenera con `node animatic.cjs http://localhost:4173` | 1920 × 1080, 30 fps, sin audio |
| `escena-sello-9x16.mp4` | El celular se acerca al reverso del cuadro, toca el sello y se abre la obra. Grabado de la landing real. | 1080 × 1920, 30 fps, sin audio, ~10 s |

Sirve para la escena del infomercial donde se explica el sello (`pitch/infomercial_guion.md`) o como Reel de Instagram. Los datos que aparecen son de ejemplo (Lucía Arce, artista inventada). Regrabado el 5 nov 2026 con los textos nuevos de la landing. Para regenerar todo junto: `bash visuales/regenerar-todo.sh`.

## Volver a grabarlo (si cambia la landing)
```
cd app
pnpm build
pnpm preview
```
En otra terminal, desde `pitch/clips` (necesita Playwright y ffmpeg):
```
node grabar-escena.cjs
ffmpeg -ss 1.2 -i video/*.webm -vf "fps=30,scale=1080:1920" -c:v libx264 -pix_fmt yuv420p -crf 22 escena-sello-9x16.mp4
```
