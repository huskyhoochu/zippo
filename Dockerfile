FROM node:12.18.1-slim AS Builder

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install
RUN yarn build

FROM node:12.18.1-slim
LABEL maintainer="lanark<dfg1499@gmail.com>"
WORKDIR /usr/src/app

COPY --from=Builder /usr/src/app/.next ./.next
COPY --from=Builder /usr/src/app/public ./public
COPY --from=Builder /usr/src/app/node_modules ./node_modules
COPY --from=Builder /usr/src/app/.env ./
COPY --from=Builder /usr/src/app/package.json ./

EXPOSE 3000
CMD ["yarn", "start"]
