FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/api/package.json ./packages/api/
COPY apps/backend/package.json ./apps/backend/

RUN npm install --ignore-scripts

COPY packages/api ./packages/api
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app/apps/backend

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json

# Remove workspace-only package before installing — it's already bundled by webpack
RUN node -e "const p=require('./package.json'); delete p.dependencies['@cuidabox/api']; require('fs').writeFileSync('./package.json', JSON.stringify(p, null, 2))"

RUN npm install --omit=dev --ignore-scripts --no-package-lock 2>/dev/null || true

EXPOSE 3000

CMD ["node", "dist/main"]
