FROM node

RUN mkdir -p /usr/src/hireorbit

WORKDIR /usr/src/hireorbit

COPY package.json /usr/src/hireorbit

RUN npm install

COPY . /usr/src/hireorbit

EXPOSE 3000

CMD [ "npm", "run", "deploy"]


