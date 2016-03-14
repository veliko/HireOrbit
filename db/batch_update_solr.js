const request = require('request-promise');
const db = require('./dbKnex');


function batchUpdateSolr() {
  db.raw('select * from indeed_jobs')
    .then(function (jobs) {
      var options = {
      method: 'POST',
      uri: 'http://localhost:8983/solr/gettingstarted/update/json/docs&f=/**',
      body: {jobs},
      json: true
    };
 
  return request(options)
      .then(function (parsedBody) {
          console.log('Success adding to Solr') 
      })
      .catch(function (err) {
          console.log('Failed posting to Solr, error: ', err); 
      });
    })
}

batchUpdateSolr()