#!/usr/bin/env bash
# Regenera TODO lo que sale de la app y de los documentos, en orden.
# Correr cada vez que cambie un texto de la app o un documento: si no, los PNG,
# PDF, GIF y videos se quedan con lo viejo (memoria/derivados-se-quedan-viejos.md).
#
# Necesita: pnpm, Playwright con Chromium, ffmpeg, pandoc y soffice (LibreOffice).
# Para el PPTX: pptxgenjs instalado en otra carpeta y su ruta en PPTX_NODE_PATH.
# Uso, desde la raíz del repo: bash visuales/regenerar-todo.sh
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RAIZ/app"
pnpm build
pnpm preview --port 4173 --strictPort >/dev/null 2>&1 &
PREVIEW=$!
trap 'kill $PREVIEW 2>/dev/null || true' EXIT
for _ in $(seq 1 30); do curl -sf http://localhost:4173/ >/dev/null && break; sleep 1; done
cd "$RAIZ"

node app/scripts/og/generar.cjs                                   # imagen para compartir
(cd pitch/clips && node grabar-escena.cjs \
  && ffmpeg -y -loglevel error -ss 1.2 -i "$(ls -t video/*.webm | head -1)" \
     -vf "fps=30,scale=1080:1920" -c:v libx264 -pix_fmt yuv420p -crf 22 escena-sello-9x16.mp4)
node visuales/generar.cjs http://localhost:4173                   # pantallas, piezas, GIF (usa el clip)
if [ -n "${PPTX_NODE_PATH:-}" ]; then
  NODE_PATH="$PPTX_NODE_PATH" node visuales/deck.cjs
  (cd visuales && soffice --headless --convert-to pdf Brai-visuales.pptx >/dev/null)
else
  echo "Sin PPTX_NODE_PATH: no se regeneró Brai-visuales.pptx ni su PDF"
fi
node pitch/reunion-jose-luis/exportar.cjs http://localhost:4173   # one-pager y deck de la reunión
node pitch/jurado-26nov/exportar.cjs                              # deck del jurado y Lean Canvas
node visuales/viabilidad/graficas.cjs                             # gráficas en PNG
node pitch/clips/animatic.cjs http://localhost:4173               # animatic del infomercial
node visuales/documentos/hojas-entrevista.cjs                     # hojas de entrevista
node visuales/documentos/generar.cjs                              # documentos en PDF, al final
echo "Todo regenerado. Revisa a ojo 2 o 3 archivos antes de subir."
