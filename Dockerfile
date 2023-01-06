FROM alpine:3.14 as nestjs_mongodb
ENV NODE_VERSION 12.22.6
WORKDIR /usr/src
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest*.json ./
RUN apk add --update nodejs npm
RUN apk add --update npm
RUN npm install
COPY ./src ./
COPY ./env ./env/
CMD npm run start:prod