FROM node

RUN mkdir -p /usr/src/hireorbit

WORKDIR /usr/src/hireorbit

COPY package.json /usr/src/hireorbit

RUN npm install

RUN npm install -g nodemon

COPY . /usr/src/hireorbit

EXPOSE 80

CMD [ "npm", "run", "deploy"]


