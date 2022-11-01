FROM node:18.3.0-alpine

EXPOSE 3100

WORKDIR /usr/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

