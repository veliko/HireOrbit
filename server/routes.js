const authGitHubPassportHandler = require('./authController');

module.exports = function (app) {
  app.get('/api/searches', searchController.getSavedSearches);

  app.post('/api/searches', searchController.saveSearch);

  //routes for passport github OAuth2 login and sessions are here
  authGithubPassportHandler(app);

}