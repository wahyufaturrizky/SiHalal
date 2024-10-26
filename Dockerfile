FROM node:20.18.0-slim as builder
WORKDIR /app
ARG BUILD_ENV
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build:${BUILD_ENV}

FROM node:20.18.0-slim

WORKDIR /app
COPY --from=builder /app/.output /app/.output

COPY package*.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
