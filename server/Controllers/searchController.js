
const searchController = {
  getSavedSearches: function (req, res, next) {
    console.log(`Route: GET /api/searches`);
    // get the saved searches for the logged in user
    res.json({working:'routes'})
  },

  saveSearch: function (req, res, next) {
    console.log(`Route: POST /api/searches`);
    // save the search to the db for the loggen in user

  }
}

module.exports = searchController;