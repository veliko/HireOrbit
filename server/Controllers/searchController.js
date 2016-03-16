const User = require('../../db/dbSequelize').users;
const Searches = require('../../db/dbSequelize').saved_searches;
const db = require('../../db/dbSequelize').sequelize;
const Jobs_Searches = require('../../db/dbSequelize').jobs_saved_searches;
const IndeedJobs = require('../../db/dbSequelize').indeed_jobs;

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
    console.log(`Route: POST /api/searches ${req}`, req);
    var user_id = req.cookie.userid;
    var jobs = req.body.jobs;
    Searches.create({name:req.body.name, user_id: user_id})
      .then(created => {
        var id = created.internal_id;
        var job_searches = jobs.map(job => {jobkey_id: job.jobkey, saved_search_id: id });
        return  Jobs_Searches.bulkCreate( job_searches );
      })
      .then( () => {
        IndeedJobs.bulkCreate(jobs);
        console.log('Saved the search for the user')
        res.sendStatus(201);
      })
      .catch( err => {
        console.log('Error saving search: ', err);
        res.sendStatus(500)
      });
    // save the search to the db for the logged in user
    // save the search into saved_searches for the user_id and then use the id to 
    // save saved_search_id and jobkey in jss join table / and finally save all jobs in indeed_job
    
  }
}

module.exports = searchController;


// insert into saved_searches(name, user_id) values('first search', 12850819)

// insert into jobs_saved_searches(jobkey_id, saved_search_id) values ('94671a6627cf6884', 1)

// select * from indeed_jobs ij where ij.jobkey in (select jss.jobkey_id from jobs_saved_searches jss
//  where jss.saved_search_id = 1)

// Shape of the POST request data for saving a serach for the user
// POST : {
//   name: 'name',
//   jobs: [{},{}]
// }