ARG NODE_VERSION=20

###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:${NODE_VERSION}-alpine as development
RUN npm i pnpm pm2 -g
WORKDIR /app

###################
# BUILD FOR PRODUCTION
###################
FROM development as build
# Install app dependencies
COPY . .
ENV NPM_CONFIG_LOGLEVEL warn
RUN pnpm install
RUN pnpm prisma generate
RUN pnpm ts-patch install
RUN pnpm build:webpack
RUN pnpm prune --production
USER node

###################
# BUILD FOR PRODUCTION
###################
FROM development as production
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/.env* /app/.env*
COPY --chown=node:node --from=build /app/ecosystem.config.js /app/ecosystem.config.js
COPY --chown=node:node --from=build /app/package.json /app/package.json
COPY --chown=node:node --from=build /app/swagger.json /app/swagger.json
COPY --chown=node:node --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --chown=node:node --from=build /app/prisma /app/prisma

EXPOSE 3000
USER node
