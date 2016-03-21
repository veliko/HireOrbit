const githubPassportHandler = require('./Controllers/authController');
const searchController = require('./Controllers/searchController');
const cardsController = require('./Controllers/cardsController');

module.exports = function (app) {
  app.get('/api/searches/:id', searchController.getSavedSearch);

  app.get('/api/searches', searchController.getAllSearches);

  app.post('/api/searches', searchController.saveSearch);

  // app.post('/api/cards', cardsController.addCards);

  // handler for /auth/github & /logout =>
  //routes for passport github OAuth2 login and sessions are here
  githubPassportHandler(app);

}