FROM node:lts-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package files and set ownership to node user
COPY --chown=node:node package*.json ./

COPY --chown=node:node env.local .env.local

USER node

RUN npm install --production

# Copy the rest of the application files
COPY --chown=node:node .next .next
COPY --chown=node:node public public

EXPOSE 3000

CMD npm start