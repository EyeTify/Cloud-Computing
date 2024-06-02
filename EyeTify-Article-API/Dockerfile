FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./articles-api/

RUN npm install --production --prefix articles-api

COPY articles-api /usr/src/app/articles-api

WORKDIR /usr/src/app/articles-api

CMD [ "node", "app.js" ]

EXPOSE 8080
