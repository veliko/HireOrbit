const githubPassportHandler = require('./Controllers/authController');
const searchController = require('./Controllers/searchController');
const gcalController = require('./Controllers/gcalController');
const cardsController = require('./Controllers/cardsController');
const path = require('path');

module.exports = function (app) {
  // app.use(searchController.deepLink);
  
  app.get('/api/searches/:id', searchController.getSavedSearch);

  app.get('/api/searches', searchController.getAllSearches);

  app.post('/api/searches', searchController.saveSearch);

  app.post('/api/cards', cardsController.addCards);

  app.get('/api/cards', cardsController.sendAllCards);

  app.delete('/api/cards', cardsController.deleteCard);
  
  app.put('/api/cards/positions', cardsController.persistCardPositions);

  app.put('/api/cards/status', cardsController.persistCardStatus);

  app.post('/api/cards/notes', cardsController.updateCardNotes);

  app.put('/api/cards/rating', cardsController.updateCardRating);

  app.get('/api/gcal/agenda', gcalController.getEvents);

  app.post('/api/gcal/add', gcalController.addEvent);

  app.delete('/api/gcal/delete', gcalController.deleteEvent);

  app.post('/api/parse', searchController.parseUrlForKanban)

  // handler for /auth/github & /logout =>
  //routes for passport github OAuth2 login and sessions are here
  githubPassportHandler(app);

  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  })

}