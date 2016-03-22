const REDIRECT_URL = 'http://localhost:3000/auth/google/callback';
const CLIENT_ID = require('../config/config.js').googleClientID;
const CLIENT_SECRET = require('../config/config.js').googleClientSecret;
const google = require('googleapis');
const plus = google.plus('v1');
const User = require('../../db/dbSequelize').users
const calendar = google.calendar('v3');
const OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// Retrieve tokens via token exchange explained above or set them:
gcalController = {};

gcalController.getUpcomingEvents =  function (req, res, next) {
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
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, response) {
        if (err) {
          res.sendStatus(500);
          console.log('The API returned an error: ' + err);
          return;
        }
        var events = response.items;
        if (events.length == 0) {
          console.log('No upcoming events found.');
        } else {
          console.log('Upcoming 10 events:');
          var eventArray = []
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            // console.log('%s - %s', start, event.summary);
            eventArray.push({start:start, summary:event.summary});
          }
            res.json(eventArray);
        }
      });
      
      
    })
}

gcalController.addEvent = function (req, res, next) {
  var event = req.body.event;

  //send it to google calnedar
  calendar.events.insert();
  res.json({})
}



module.exports = gcalController;
