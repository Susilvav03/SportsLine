#!/usr/bin/env bash
# docker-entrypoint.sh
set -euo pipefail

# If pg_isready isn't available in this image, use a small loop with psql
if command -v pg_isready >/dev/null 2>&1; then
    ./wait-for-db.sh node dist/app.js
else
    echo "pg_isready not found; sleeping briefly to allow DB to start"
    sleep 3
    node dist/app.js
fi
