const githubPassportHandler = require('./Controllers/authController');
const searchController = require('./Controllers/searchController');

module.exports = function (app) {
  app.get('/api/searches/:id', searchController.getSavedSearch);

  app.get('api/searches', searchController.getAllSearches)

  app.post('/api/searches', searchController.saveSearch);

  // handler for /auth/github & /logout =>
  //routes for passport github OAuth2 login and sessions are here
  githubPassportHandler(app);

}