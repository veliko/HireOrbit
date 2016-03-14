const authGitHubPassportHandler = require('./authController');

module.exports = function (app) {
  app.get('/api/searches', searchController.getSavedSearches);

  app.post('/api/searches', searchController.saveSearch);

  authGithubPassportHandler(app);


}