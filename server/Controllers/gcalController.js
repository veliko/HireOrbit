const REDIRECT_URL = 'http://localhost:3000/auth/google/callback';
const CLIENT_ID = require('../config/config.js').googleClientID;
const CLIENT_SECRET = require('../config/config.js').googleClientSecret;
const google = require('googleapis');
const plus = google.plus('v1');
const User = require('../../db/dbSequelize').users
const calendar = google.calendar('v3');
const OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
const moment = require('moment');
const knex = require('../../db/dbKnex');

// Retrieve tokens via token exchange explained above or set them:
gcalController = {};

gcalController.getEvents =  function (req, res, next, cb) {
  User.findOne({where:{google_id:req.cookies.userid}})
    .then((results) => {
      // console.log('results from query', results)
      var accessToken = results.dataValues.google_access_token;
      oauth2Client.setCredentials({
        access_token: accessToken
      });
      // plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
      //   // handle err and response
      //   console.log('response from google plus', response)
      // });

      calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: moment(new Date()).subtract(2, 'd').toISOString(),
        timeMax: moment(new Date()).add(6, 'M').toISOString(),
        maxResults: 1000,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, response) {
        if (err) {
          if(res){
            res.sendStatus(500);
          } else {
            cb(err, null);
          }
          console.log('The API returned an error: ' + err);
          return;
        }
        var events = response.items;
        if (events.length == 0) {
          console.log('No upcoming events found.');
        } else {
          console.log('Upcoming 100 events:');
          var eventArray = []
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            // console.log('%s - %s', start, event.summary);
            eventArray.push({start:start, summary:event.summary});
            // console.log("event summary: ", event.summary);
          }

            if(res) res.json(events) 
              else cb(null, events);
        }
      });
    })
}

gcalController.addEvent = function (req, res, next) {
  var event = req.body.event;
  var card_id = req.body.card_id
  var user_id = req.cookies.userid
  User.findOne({where:{google_id: user_id}})
    .then((results) => {
      // console.log('results from query', results)
      var accessToken = results.dataValues.google_access_token;
      oauth2Client.setCredentials({
        access_token: accessToken
      });
      
      //send it to google calnedar
      calendar.events.insert({auth: oauth2Client, calendarId: 'primary', resource: event}, function (err, response) {
        if(err) {
          console.log('Failed to add event', err)
          res.sendStatus(500);
        } else {
          console.log('Added event', response)
          res.status(201);
          res.send(response);
          knex.raw(`insert into cards_events (user_id, event_id, card_id) VALUES('${user_id}', '${response.id}', '${card_id}')`)
            .then((res) => {
              console.log('Saved event id to db')
            })
        }
      });
    });
}

gcalController.deleteEvent = function (req, res, next) {
  console.log('In gcalController deleteEvent')
  var user_id = req.cookies.userid;
  var card_id = req.body.card_id;
  var event_id = req.body.event_id;

  User.findOne({where:{google_id:req.cookies.userid}})
    .then(results => {
      var accessToken = results.dataValues.google_access_token;
      oauth2Client.setCredentials({
        access_token: accessToken
      });
      console.log('Event_id: ', event_id)
      calendar.events.delete({
        auth: oauth2Client,
        calendarId: 'primary',
        eventId: event_id
      }, function (err, response) {
          if(err){
            console.log('Error while getting response from gcal deleteEvent:', err)
            res.status(500).send(err);
            return
          }

          var deleteQuery = `delete from cards_events where (user_id='${user_id}' AND card_id='${card_id}' AND event_id='${event_id}')`
          knex.raw(deleteQuery)
            .then(result => {
              console.log(deleteQuery)
              console.log('delete event from db: ', result)
              res.sendStatus(201);
            })
            .catch(err => {
              console.log('Error deleting event from db: ', err);
              res.status(500).send('Error deleting event from db:');
            })
      })
    })
    .catch(err => console.log('Error deleting event: ', err))
}

gcalController.deleteCardEvents = function(events, userid) {
  User.findOne({where:{google_id:userid}})
    .then(results => {
      var accessToken = results.dataValues.google_access_token;
      oauth2Client.setCredentials({
        access_token: accessToken
      })

      if (events) {
        events.forEach((event, i) => {
          setTimeout(function () {
            calendar.events.delete({
              auth: oauth2Client,
              calendarId: 'primary',
              eventId: event
            }, function (err, resp) {
              if(err){
                console.log('Error while sending '+ i+ ' event')
                return;
              } 
              console.log('Success deleting '+ i+ " event")
            })
          }, i*2*100)
        })
      }
    })
}



module.exports = gcalController;
