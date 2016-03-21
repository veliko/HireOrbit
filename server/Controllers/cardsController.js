const User = require('../../db/dbSequelize').users;
const Searches = require('../../db/dbSequelize').saved_searches;
const db = require('../../db/dbSequelize').sequelize;
const Jobs_Searches = require('../../db/dbSequelize').jobs_saved_searches;
const IndeedJobs = require('../../db/dbSequelize').indeed_jobs;
const knex = require('../../db/dbKnex');

function insertJobsQueryMaker(b) {
  return `insert into "indeed_jobs" ("jobtitle", "company",
    "city", "state", "country", "formattedlocation", "source", "date", "snippet", "url","latitude",
    "jobkey", "sponsored", "expired", "indeedapply", "formattedlocationfull", "nouniqueurl",
    "formattedrelativetime") VALUES($$${b.jobtitle}$$,$$${b.company}$$,'${b.city}','${b.state}','${b.country}',
    '${b.formattedlocation}',$$${b.source}$$,'${b.date}', $$${b.snippet}$$, $$${b.url}$$, '${b.latitude}', '${b.jobkey}', '${b.sponsored}', '${b.expired}', '${b.indeedapply}', '${b.formattedlocationfull}', 
    '${b.nouniqueurl}', '${b.formattedrelativetime}') ON CONFLICT DO NOTHING;`
}

const cardsController = {
  addCards: function(req, res, next) {
    var user_id = req.cookies.userid;
    var cards = req.body.cards;
    var positions = req.body.cardPositions;
    var query = '';
    console.log("received card info to add: ", req.body);
    
    // first insert job data into jobs table 
    cards.forEach((card) => {
      query += insertJobsQueryMaker(card.job_data);
    });
    db.query(query)

    // then create insert query to add all card data to kanban_cards table
    .then(() => {
      cards.forEach((card) => {
        query += `INSERT INTO "kanban_cards" ("card_id", "status", "user_id") VALUES ('${card.card_id}', '${card.status}', '${user_id}');`;      
      });
      return db.query(query)
    })

    // then insert all cardPosition data
    .then(() => {
      query = `UPDATE users SET "card_positions" = '${positions}'' WHERE "internal_id" = '${user_id}';`;
      return db.query(query)
    })

    // then send response back to client
    .then(() => {
      res.send(200);
    })

    // catch any errors
    .catch((error) => {
      console.log('Error writing new card data to database: ', error);
      res.send(500, error);
    });
  }
};

module.exports = cardsController;