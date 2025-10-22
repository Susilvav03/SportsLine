#!/usr/bin/env bash
# wait-for-db.sh -- wait for Postgres to be available before starting the app
set -e

: "${DB_HOST:=db}"
: "${DB_PORT:=5432}"
: "${DB_USER:=sports_user}"
: "${DB_NAME:=sportsline}"

echo "Waiting for postgres at ${DB_HOST}:${DB_PORT}..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; do
    printf '.'
    sleep 1
done

echo "Postgres is available"

exec "$@"
