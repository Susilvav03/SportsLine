# SportsLine

## Docker y Docker Compose

Se añadieron archivos para ejecutar la aplicación con Postgres usando Docker Compose:

- `Dockerfile` — Multi-stage build (builder + runtime) usando pnpm y usuario no-root.
- `.dockerignore` — Ignora `node_modules`, `dist`, `.env`, etc.
- `docker-compose.yml` — Define servicios `db` (Postgres) y `app` con red dedicada y volumen persistente para la DB. Incluye límites de recursos en `deploy.resources` (uso en Swarm/Kubernetes).
- `wait-for-db.sh` — Script que espera a que Postgres esté listo antes de arrancar la app.
- `docker-entrypoint.sh` — Entry point que arranca `node dist/app.js` tras comprobar la DB.
- `tsconfig.build.json` — Configuración TS para emitir `dist/` en el build dentro del contenedor.

Uso rápido:

```bash
# Build y levantar en background
docker compose build --no-cache
docker compose up -d

# Logs
docker compose logs -f app

