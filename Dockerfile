FROM node:14-buster as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app


RUN yarn install
RUN yarn run install
CMD yarn run start

EXPOSE 8081
EXPOSE 4001
