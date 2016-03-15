const User = require('../../db/dbSequelize').users;
const Searches = require('../../db/dbSequelize').saved_searches;
const db = require('../../db/dbSequelize').sequelize;

const searchController = {
  getSavedSearch: function (req, res, next) {
    const params = req.params.id;
    console.log(`Route: GET /api/searches`, params);

    // get the saved searches for the logged in user
    // query the db for the saved search
    db.query(`select * from indeed_jobs ij where ij.jobkey in (select jss.jobkey_id from jobs_saved_searches jss where jss.saved_search_id = ${params})`)
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        console.log('Error fetching search from db: ', err);
        res.send(err);
      })
  },

  saveSearch: function (req, res, next) {
    console.log(`Route: POST /api/searches`);
    // save the search to the db for the logged in user

  }
}

module.exports = searchController;


// insert into saved_searches(name, user_id) values('first search', 12850819)

// insert into jobs_saved_searches(jobkey_id, saved_search_id) values ('94671a6627cf6884', 1)

// select * from indeed_jobs ij where ij.jobkey in (select jss.jobkey_id from jobs_saved_searches jss
//  where jss.saved_search_id = 1)