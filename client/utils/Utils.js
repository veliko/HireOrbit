const $ = require ('jquery')
const mergeDefault = require('lodash.defaults');
const Utils = {
 
  getJobsFromIndeed : function (query, successCb, errorCb) {
    var queryStr = {
        publisher: 788696528762292, 
        q: 'software engineer',
        l: 'san francisco',
        radius: 200,
        format: 'json',
        limit:25,
        userip: '201.176.34.12',
        v:2
    }
    
    //use query as default and add in defaults from queryStr. query is the determining factor in the resulting object
    mergeDefault(query, queryStr);

    var options = {
      url: 'http://api.indeed.com/ads/apisearch',
      type: 'GET',
      data: queryStr,
      success: (res) => {
        console.log('Got data from server in getJobsFromIndeed');
        successCb(res)
      },
      error: (err) => {
        console.log('Error in getJobsFromIndeed');
        errorCb(err);
      }
  }

    // makes the call with above options
    $.ajax(options)
}

// module.exports = Utils;