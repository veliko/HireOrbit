const User = require('../../db/dbSequelize').users;
const Searches = require('../../db/dbSequelize').saved_searches;
const db = require('../../db/dbSequelize').sequelize;
const Jobs_Searches = require('../../db/dbSequelize').jobs_saved_searches;
const IndeedJobs = require('../../db/dbSequelize').indeed_jobs;
const knex = require('../../db/dbKnex');
const gcalController = require('./gcalController');

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
    // console.log("received card info to add: ", req.body);
    
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
        
        // add job_data from indeed_jobs table for each card entry
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

        // get all evnt_id of each card_id from DB|| getUpcomingEvents from Gcal|| map to each card.events array
        var event_query = `select ce.card_id, ce.event_id from cards_events ce where ce.user_id = '${user_id}'`;
        var dbEvents;
        db.query(event_query)

          .then((results) => {
            console.log('Got card events: ');
            dbEvents = results[0]

            // api call: get array of all events from user's google calendar
            gcalController.getEvents(req, null, null, function (err, googleEvents) {

              if (err) {
                console.log("Error while getting google events: ", err);
                if(err.code === 401){
                  res.sendStatus(401);
                  return;
                }
                res.sendStatus(500);
                return;
              }

              // create an gooelEventsObject for constant time lookup   
              var googleEventsObj ={};
              googleEvents.forEach((gEvent) => {
                googleEventsObj[gEvent.id] = gEvent;
              });
              
              // add google event info to each stored event in db
              dbEvents.forEach((dbEvent) => {
                // console.log("dbEvent.event_id: ", dbEvent.event_id, dbEvent.event_id + "" in googleEventsObj);
                // console.log("from google events object: ", googleEventsObj[dbEvent.event_id + ""]);
                if(dbEvent.event_id in googleEventsObj){
                  var matchingGoogleEvent = googleEventsObj[dbEvent.event_id];
                  dbEvent.summary = matchingGoogleEvent.summary || '';
                  dbEvent.start = matchingGoogleEvent.start;
                  dbEvent.end = matchingGoogleEvent.end;
                  dbEvent.htmlLink = matchingGoogleEvent.htmlLink || '';
                }
              })

              // create a cards object for constant time lookup     
              var cardsObj = {};
              cards.forEach((card) => {
                card.events = [];
                cardsObj[card.card_id] = card;
              });

              // add an events array to each card and populate it with respective events
              dbEvents.forEach((dbEvent) => {
                if (dbEvent.card_id in cardsObj) {
                  var cardWithEvent = cardsObj[dbEvent.card_id];

                  if (!cardWithEvent.events) {
                    cardWithEvent.events = [];
                  } 
                  cardWithEvent.events.push(dbEvent);
                }
              });

              // from here on we just order the cards in their correct positions          
              query = `SELECT card_positions FROM users WHERE google_id = '${user_id}'`;
              db.query(query)
                .then((results) => {
                  var positions = JSON.parse(results[0][0].card_positions);
                  var orderedCards = new Array(Object.keys(positions).length);
                  cards.forEach((card) => {
                    var correctPosition = positions[card.card_id + ''];
                    if (correctPosition !== undefined) {
                      orderedCards[correctPosition] = card;
                    }
                  });
                  res.json(orderedCards);
                })
                .catch(error => {
                  console.log("error in event_query: ", error);
                  res.sendStatus(500);
                });
            });
          })
          .catch(error => {
            console.log("error in event_query: ", error);
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        console.log("error getting all cards with their corressponding jobs: ", error);
        res.send(500);
      });
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
  },

  deleteCard: function(req, res, next) {
    var user_id = req.cookies.userid;
    var card_id = req.body.card_id;
    var card_positions = JSON.stringify(req.body.card_positions);
    var query = `DELETE FROM kanban_cards WHERE (card_id = '${card_id}' AND user_id = '${user_id}')`;

    db.query(query)

    .then((results) => {
      query = `UPDATE users SET card_positions = '${card_positions}' WHERE internal_id = '${user_id}';`;
      return db.query(query)
    })

    .then(() => {
      console.log("successfully deleted card.")
      res.send(200);
    })

    .catch((error) => {
      console.log("Error while deleting card: ", error);
      res.send(500);
    })

  }
};

module.exports = cardsController;