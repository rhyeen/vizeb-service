FROM node:10

MAINTAINER contact.ryan.saunders@gmail.com

WORKDIR /home/default

COPY . /home/default

# Expects NODE_END to be set
RUN npm install

EXPOSE 80
ENV EXPRESS_PORT=80
ENV NODE_PATH=/home/default/src/server

CMD ["npm","start"]
