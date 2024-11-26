FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3010

CMD [ "npm", "start" ]