#!/usr/bin/env bash
# Prueba las migraciones en un Postgres 16 local desechable (no toca Supabase).
# Uso: bash app/supabase/pruebas/correr.sh
# Requiere: Postgres 16 instalado (initdb, pg_ctl, psql). En Windows: correr en WSL.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
SUPA="$(dirname "$AQUI")"
PGBIN="${PGBIN:-$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)}"
TMP="$(mktemp -d)"
PUERTO="${PUERTO:-54329}"
COMO=""
if [ "$(id -u)" = "0" ]; then chown postgres "$TMP"; COMO="runuser -u postgres --"; fi

limpiar() { $COMO "$PGBIN/pg_ctl" -D "$TMP/datos" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$TMP"; }
trap limpiar EXIT

$COMO "$PGBIN/initdb" -D "$TMP/datos" -U postgres -A trust >/dev/null
$COMO "$PGBIN/pg_ctl" -D "$TMP/datos" -o "-p $PUERTO -k $TMP" -l "$TMP/log" -w start >/dev/null

PSQL=("$PGBIN/psql" -h "$TMP" -p "$PUERTO" -U postgres -d postgres -v ON_ERROR_STOP=1 -q)
$COMO "${PSQL[@]}" -f "$AQUI/00_imitar_supabase.sql"
for m in "$SUPA"/migrations/*.sql; do
  echo "migración: $(basename "$m")"
  $COMO "${PSQL[@]}" -f "$m"
done
$COMO "${PSQL[@]}" -f "$SUPA/seed.sql"
$COMO "${PSQL[@]}" -f "$AQUI/10_pruebas.sql"
