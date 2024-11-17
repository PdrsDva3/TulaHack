FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2-alpine
WORKDIR /app
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
