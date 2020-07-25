FROM node:14.5-alpine as base

ENV NODE_ENV=production
ENV PORT_API=3000
EXPOSE ${PORT_API}

RUN apk add --no-cache tini

WORKDIR /node

COPY package*.json ./
RUN chown -R node:node .
RUN npm config list \
    && npm ci \
    && npm cache clean --force

ENV PATH=/node/node_modules/.bin:$PATH

ENTRYPOINT [ "/sbin/tini", "--" ]


FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development \
    && npm cache clean --force
WORKDIR /node/app
# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "start:dev"]


FROM dev as test
COPY --chown=node:node . .
USER node
CMD ["npm", "run", "test"]


# FROM dev as source
# COPY --chown=node:node . .
# RUN npm run build


FROM base as prod
WORKDIR /node
COPY --chown=node:node . /node/app
# COPY --chown=node:node --from=source /node/app/dist/ /node/app/
USER node
CMD ["node", "/node/app/server.js"]