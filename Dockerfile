FROM node:20.9.0-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN apk add --no-cache bash


RUN cd /usr/src/app && npm i -g @nestjs/cli typescript ts-node


RUN cd /usr/src/app && npm install

EXPOSE 3000

CMD [ "nest" , "start"]
