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
      query = `UPDATE users SET "card_positions" = '${positions}' WHERE "google_id" = '${user_id}'`;
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
  },

  sendAllCards: function(req, res, next) {
    // get all cards on kanban for specific user
    var user_id = req.cookies.userid;
    var cards;
    var query = `SELECT kanban_cards.card_id, kanban_cards.status, kanban_cards.notes, indeed_jobs.* FROM "kanban_cards", "indeed_jobs" WHERE (kanban_cards.user_id='${user_id}' AND indeed_jobs.jobkey = kanban_cards.card_id)`;
    
    db.query(query)
    
    // card and job data for each card in list, format it
    .then((results) => {
      cards = results[0];
      cards.forEach((card) => {
        var job_data = {};
        for (var key in card) {
          if (key !== "card_id" && key !== "status" && key !== "notes") {
            job_data[key] = card[key];
            delete card[key];
          }
        }
        card.job_data = job_data;
      });
      query = `SELECT card_positions FROM users WHERE google_id = '${user_id}'`;
      return db.query(query)
    })

    // get card positions data for curent user, order cards ased on positions data
    .then((results) => {
      var positions = JSON.parse(results[0][0].card_positions);
      var orderedCards = new Array(Object.keys(positions).length);
      cards.forEach((card) => {
        var correctPosition = positions[card.card_id + ''];
        if (correctPosition !== undefined) {
          orderedCards[correctPosition] = card;
        }
      });
      console.log("ordered cards: ", orderedCards);
      res.json(orderedCards);
    })

    .catch((error) => {
      console.log("error getting all cards with their corressponding jobs: ", error);
      res.send(500);
    })
  },

  persistCardPositions: function(req, res, next) {
    var user_id = req.cookies.userid;
    var cardPositions = JSON.stringify(req.body.cardPositions);

    var query = `UPDATE users SET card_positions = '${cardPositions}' WHERE google_id = '${user_id}';`;
    db.query(query)
    .then(() => {
      console.log("Successfully updated card positions");
      res.send(200);
    })
    .catch((error) => {
      console.log("Error while updating card positions: ", error)
      res.send(500);
    });
  },

  persistCardStatus: function(req, res, next) {
    var user_id = req.cookies.userid;
    var card_id = req.body.card_id;
    var status = req.body.status;
    console.log("update status: ", user_id, card_id, status);
    var query = `UPDATE kanban_cards SET status = '${status}' WHERE (card_id = '${card_id}' AND user_id = '${user_id}')`;

    db.query(query)
    .then(() => {
      console.log("Successfull persisted card status")
      res.send(200);
    })
    .catch((error) => {
      console.log("Error while persisting card status: ", error);
      res.send(500);
    })
  }
};

module.exports = cardsController;