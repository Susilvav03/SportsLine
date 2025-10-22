# Multi-stage Dockerfile for Node.js + TypeScript (pnpm)
# Stage 1: build
FROM node:20-bullseye AS builder

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml tsconfig.json ./

# Install only production dependencies for build (we need devDeps for tsc)
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Create a tsconfig for build that overrides noEmit
RUN node -e "const fs=require('fs'); const t=require('./tsconfig.json'); t.compilerOptions.noEmit=false; fs.writeFileSync('tsconfig.build.json', JSON.stringify(t, null, 2));"

# Build TypeScript to /usr/src/app/dist
RUN pnpm run build

# Stage 2: production image
FROM node:20-bullseye-slim AS runtime

# Create non-root user
RUN useradd --user-group --create-home --shell /bin/false appuser
WORKDIR /home/appuser/app

# Install pnpm runtime
RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

# Copy only production dependencies and built files
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env ./

# Give ownership to non-root user
RUN chown -R appuser:appuser /home/appuser/app
USER appuser

ENV NODE_ENV=production
EXPOSE 3000

# Entrypoint will wait for DB then start
COPY ./docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
