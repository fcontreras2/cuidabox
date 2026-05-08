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

WORKDIR /app

# Copy only production node_modules from builder (already resolved, no workspace install needed)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["node", "dist/main"]
