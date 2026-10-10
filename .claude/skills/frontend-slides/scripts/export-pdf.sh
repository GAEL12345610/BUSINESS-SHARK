#!/usr/bin/env bash
# export-pdf.sh — renderiza un deck HTML a PDF multipágina (1 slide/página).
# Aprovecha el @media print del framework (deck-skeleton.html): @page 1920x1080.
#
# Estrategia (en orden de preferencia):
#   1. scripts/html_to_pdf.py (Playwright) — Chromium incluido, espera document.fonts.ready
#      y networkidle antes de imprimir → fuentes y assets siempre cargados. ROBUSTO.
#   2. Chrome/Edge del sistema con --print-to-pdf — fallback si no hay Playwright.
#
# Uso:  ./export-pdf.sh deck.html [salida.pdf]
set -euo pipefail

IN="${1:?Uso: export-pdf.sh deck.html [salida.pdf]}"
OUT="${2:-${IN%.html}.pdf}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONVERTER="$SCRIPT_DIR/../../../scripts/html_to_pdf.py"

# ── 1. Playwright (preferido) ────────────────────────────────────────────────
if [ -f "$CONVERTER" ] && command -v python >/dev/null 2>&1 \
   && python -c "import playwright" >/dev/null 2>&1; then
  python "$CONVERTER" "$IN" "$OUT" --mode deck
  exit 0
fi

# ── 2. Fallback: Chrome/Edge del sistema ─────────────────────────────────────
echo "ℹ️  Playwright no disponible — usando Chrome/Edge del sistema (sin espera de fuentes)."

abspath() { cd "$(dirname "$1")" && printf '%s/%s' "$(pwd -W 2>/dev/null || pwd)" "$(basename "$1")"; }
URL="file:///$(abspath "$IN" | sed 's#^/##; s# #%20#g')"

find_chrome() {
  for c in \
    "${CHROME_BIN:-}" \
    "/c/Program Files/Google/Chrome/Application/chrome.exe" \
    "/c/Program Files/Microsoft/Edge/Application/msedge.exe" \
    "$(command -v google-chrome 2>/dev/null)" \
    "$(command -v chromium 2>/dev/null)" \
    "$(command -v chromium-browser 2>/dev/null)" \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
    [ -n "${c:-}" ] && [ -x "$c" ] && { echo "$c"; return 0; }
  done
  return 1
}

CHROME="$(find_chrome)" || { echo "No encontré Chrome/Edge ni Playwright. Instala playwright o define CHROME_BIN."; exit 1; }

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "$URL"

echo "PDF -> $OUT"
