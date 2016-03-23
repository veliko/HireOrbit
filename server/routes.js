const githubPassportHandler = require('./Controllers/authController');
const searchController = require('./Controllers/searchController');
const gcalController = require('./Controllers/gcalController');
const cardsController = require('./Controllers/cardsController');

module.exports = function (app) {
  // app.use(searchController.deepLink);
  
  app.get('/api/searches/:id', searchController.getSavedSearch);

  app.get('/api/searches', searchController.getAllSearches);

  app.post('/api/searches', searchController.saveSearch);


  app.post('/api/cards', cardsController.addCards);

  app.get('/api/cards', cardsController.sendAllCards);

  app.put('/api/cards/positions', cardsController.persistCardPositions);

  app.put('/api/cards/status', cardsController.persistCardStatus);

  app.get('/api/gcal/agenda', gcalController.getUpcomingEvents);

  app.get('/api/gcal/add', gcalController.addEvent);

  // handler for /auth/github & /logout =>
  //routes for passport github OAuth2 login and sessions are here
  githubPassportHandler(app);

}