FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .

CMD [ "node", "smpp_server.js" ]
EXPOSE 2775
