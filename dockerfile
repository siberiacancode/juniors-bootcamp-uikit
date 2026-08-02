FROM node:24-alpine AS builder
LABEL org.opencontainers.image.source=https://github.com/siberiacancode/juniors-bootcamp-uikit

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN CI=true pnpm install --frozen-lockfile

COPY . .
RUN pnpm build-storybook

FROM nginx:alpine AS runner

COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3014
CMD ["nginx", "-g", "daemon off;"]
