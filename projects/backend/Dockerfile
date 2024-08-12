FROM node:18.13.0-alpine As development

LABEL "server"="api-express"
LABEL maintainer="joseagraz29@gmail.com"
LABEL version="1.0"

WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY . .

EXPOSE 3000
CMD ["yarn", "start"]

