FROM node:16.14.2-alpine AS builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "run", "start"]
