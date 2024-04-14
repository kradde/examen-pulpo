# Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install wait-on

COPY . .

EXPOSE 3000

CMD npx wait-on tcp:db:5432 && npm run start:dev