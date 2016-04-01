# HireOrbit

*Scrum for job applications*


## Contributors

  - [View Contributors](https://github.com/FlammableHairnet/HireOrbit/network/members)


## How to run the app

If you have docker, there are no dependencies, just do `docker-compose up`
Do `npm install` and `npm start` for dev. Production version by `npm run deploy`

## Dependencies & Configuration:

The app is built with node/express & uses passport for authentication. React with Redux for the front end, packaged up by webpack, served by node/express.

Postgres or MySQL is needed to use it. The SQL setup file for both is in */db*
The code uses SQL for all data manipulation but if you wish to extend it, you can also use an ORM. Models for Sequelize are provided in *db/models*

If you have docker set up it all becomes rather easy. Do `docker-compose up`. This will build the web (based on node) & postgres containers and lauch the app. 

If you modify the files, do:

`docker-compose down` & 
`docker-compose build web`

The docker config files are in the root of the project and can be modified to suit needs

Config files in *server/config/config.js* need to be added for the Google client credentials and also in the db/models/config.js for the Postgres db name and user credentials.

The ports for where the node servers listen to are in *docker-compose.yml*

There is a `haproxy.cfg` in the root which you use if you want to set up load balancing. You would need haproxy for this to work. This page gives fairly detailed explanations for [setting up Haproxy](https://serversforhackers.com/load-balancing-with-haproxy)

## Git Deployment

If you wish set up automatic deployment from your dev to production [- see this page for reference](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps)

The post-receive hook is located at *server/config/* . Copy it to your hooks directory of the bare git repo in the server. Use above page for reference. You might have to do `chmod +x` for it to work.

Then `git push live master` will deploy the app in the server using docker-compose to spin up needed containers

## Tests

Tests for the React components are in *spec/*
