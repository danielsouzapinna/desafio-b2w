FROM node:8

MAINTAINER Daniel Pinna <danielpinna2@gmail.com>

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .