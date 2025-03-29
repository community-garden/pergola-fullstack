FROM node:16

RUN mkdir -p /api
WORKDIR /api

COPY package.json .
RUN npm install
COPY . .

EXPOSE 4001

CMD ["npm", "start"]
