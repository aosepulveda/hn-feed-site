FROM node:8.12.0-alpine AS build-env
RUN mkdir -p /src
COPY package-lock.json ./src
COPY package.json ./src
WORKDIR /src
RUN npm install --production

FROM alpine:3.8
RUN apk add --update nodejs=8.14.0-r0 npm=8.14.0-r0 --no-cache
COPY bin ./app/bin
COPY src ./app/src
COPY app.js ./app
COPY package-lock.json ./app
COPY package.json ./app
COPY --from=build-env /src/node_modules /app/node_modules

WORKDIR /app

EXPOSE 3000

CMD ["node", "./bin/www"]
