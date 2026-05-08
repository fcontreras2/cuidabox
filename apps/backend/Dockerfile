FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace manifests for layer caching
COPY package.json package-lock.json ./
COPY packages/api/package.json ./packages/api/
COPY apps/backend/package.json ./apps/backend/

# Install all workspace dependencies from root
RUN npm install --ignore-scripts

# Copy source files
COPY packages/api ./packages/api
COPY apps/backend ./apps/backend
COPY tsconfig.base.json ./

# Build — webpack bundles @cuidabox/api into dist/main.js
WORKDIR /app/apps/backend
RUN npm run build

# ---- Production image ----
FROM node:22-alpine AS runner

WORKDIR /app/apps/backend

# Only copy the webpack bundle — no workspace deps needed at runtime
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json

# Install only external prod deps (excludes @cuidabox/api — already bundled)
RUN npm install --omit=dev --ignore-scripts --no-package-lock 2>/dev/null || true

EXPOSE 3000

CMD ["node", "dist/main"]
