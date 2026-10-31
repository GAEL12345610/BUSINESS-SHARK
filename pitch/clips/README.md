# Clips para el infomercial y redes

| Archivo | Qué es | Formato |
|---|---|---|
| `escena-sello-9x16.mp4` | El celular se acerca al reverso del cuadro, toca el sello y se abre la obra. Grabado de la landing real. | 1080 × 1920, 30 fps, sin audio, ~10 s |

Sirve para la escena del infomercial donde se explica el sello (`pitch/infomercial_guion.md`) o como Reel de Instagram. Los datos que aparecen son de ejemplo (Lucía Arce, artista inventada).

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
