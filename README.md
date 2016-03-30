# HireOrbit

*Scrum for job applications*

Other Style Guides
 - [ES5](_STYLE-GUIDE.md/)


## Table of Contents

  1. [Contributors](#contributors)


## Contributors

  - [View Contributors](https://github.com/FlammableHairnet/HIreOrbit/graphs/contributors)



**[⬆ back to top](#table-of-contents)**

## Amendments

We encourage you to fork this guide and change the rules to fit your team's style guide. Below, you may list some amendments to the style guide. This allows you to periodically update your style guide without having to deal with merge conflicts.



## How to run the app

Do `npm install` and `npm start` for dev. Production version by `npm run deploy`

### Dependencies & Configuration:

The app is built with node/express & uses passport for authentication. React with Redux for the front end, packaged up by webpack, served by node/express.

Postgres or MySQL is needed to use it. The SQL setup file for both is in /db
The code uses SQL for all data manipulation but if you wish to extend it, you can also use an ORM. Models for Sequelize are provided indb/models

If you have docker set up it all becomes rather easy. Do `docker-compose up`. This will build the web (based on node) & postgres containers and lauch the app. 

If you modify the files, do 
`docker-compose down` & 
`docker-compose build web`

The docker config files are in the root of the project and can be modified to suit needs

Config files in server/config/config.js need to be added for the Google client credentials and also in the db/models/config.js for the Postgres db name and user credentials.

