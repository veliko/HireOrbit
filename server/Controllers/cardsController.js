const User = require('../../db/dbSequelize').users;
const Searches = require('../../db/dbSequelize').saved_searches;
const db = require('../../db/dbSequelize').sequelize;
const Jobs_Searches = require('../../db/dbSequelize').jobs_saved_searches;
const IndeedJobs = require('../../db/dbSequelize').indeed_jobs;
const knex = require('../../db/dbKnex');

const cardsController = {
  addCards: function(req, res, next) {
    var user_id = req.cookies.userid;
    console.log("received card info to add: ", req.body);
    res.send(200);
  }
};

module.exports = cardsController;