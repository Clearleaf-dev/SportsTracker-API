FROM node:current-alpine3.19

WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 3010

ENV NAME SportsTracker-API

CMD [ "npm", "start" ]