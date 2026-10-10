#!/usr/bin/env bash
# deploy.sh — sube un deck HTML autocontenido a Vercel y devuelve un link.
# El deck es un solo .html sin build, así que lo servimos como estático.
#
# Uso:  ./deploy.sh deck.html
set -euo pipefail

IN="${1:?Uso: deploy.sh deck.html}"
command -v vercel >/dev/null || { echo "Instala Vercel CLI: npm i -g vercel"; exit 1; }

TMP="$(mktemp -d)"
cp "$IN" "$TMP/index.html"
cat > "$TMP/vercel.json" <<'JSON'
{ "cleanUrls": true, "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
JSON

( cd "$TMP" && vercel deploy --prod --yes )
rm -rf "$TMP"
