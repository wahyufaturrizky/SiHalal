FROM node:20.18.0-slim AS builder
WORKDIR /app
ARG BUILD_ENV
COPY . .
RUN npm install -g pnpm
RUN pnpm install

RUN pnpm run build

FROM node:20.18.0-slim

WORKDIR /app
COPY --from=builder /app/.output /app/.output

COPY package*.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
