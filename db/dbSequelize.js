const Sequelize = require('sequelize');
const config = require('./config')
const Jobs = require('./models/indeed_jobs')
const db = new Sequelize( config.dbName, config.dbUser, null, {
  host: config.dbHost,
  port:5432,
  dialect: 'postgres'
} ); 


var models = [
  'indeed_jobs',
  'users',
  'saved_searches',
  'jobs_saved_searches',
  'workflow_state'
]

models.forEach(model => module.exports[model] = db.import(__dirname + '/'+ 'models/' + model));

module.exports.sequelize = db;

