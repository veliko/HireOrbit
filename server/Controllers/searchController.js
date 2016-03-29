const User = require('../../db/dbSequelize').users;
const Searches = require('../../db/dbSequelize').saved_searches;
const db = require('../../db/dbSequelize').sequelize;
const Jobs_Searches = require('../../db/dbSequelize').jobs_saved_searches;
const IndeedJobs = require('../../db/dbSequelize').indeed_jobs;
const knex = require('../../db/dbKnex');
const path = require('path');
const rootDir = path.resolve(__dirname, '../../client');
const request = require('request-promise');
const cheerio = require('cheerio');
const url = require('url');
const uuid = require('uuid');

const searchController = {
  getSavedSearch: function (req, res, next) {
    const params = req.params.id;
    console.log(`Route: GET /api/searches`, params);

    // get the saved searches for the logged in user
    // query the db for the saved search
    db.query(`select * from indeed_jobs ij where ij.jobkey in (select jss.jobkey_id from jobs_saved_searches jss where jss.saved_search_id = ${params})`)
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        console.log('Error fetching search from db: ', err);
        res.send(err);
      })
  },

  saveSearch: function (req, res, next) {
    var user_id = req.cookies.userid;
    var result;
    console.log(`Route: POST /api/searches`);
    var jobs = req.body.jobs, name = req.body.name;

    db.query(`INSERT INTO saved_searches ("name","user_id") VALUES('${name}', '${user_id}')`)
      .then(created => {
        return db.query(`SELECT internal_id from saved_searches where name='${name}' AND user_id='${user_id}' ORDER BY internal_id LIMIT 1`)
        // create insert data for join table
        
        // var job_searches = jobs.map( job => ({jobkey_id: job.jobkey, saved_search_id: id}) );
        // Jobs_Searches.bulkCreate( job_searches ); 
      })
      .then((results) => {
        function insertJobs(b) {
          return `insert into "indeed_jobs" ("jobtitle", "company",
            "city", "state", "country", "formattedlocation", "source", "date", "snippet", "url","latitude",
            "jobkey", "sponsored", "expired", "indeedapply", "formattedlocationfull", "nouniqueurl",
            "formattedrelativetime") VALUES($$${b.jobtitle}$$,$$${b.company}$$,'${b.city}','${b.state}','${b.country}',
            '${b.formattedlocation}',$$${b.source}$$,'${b.date}', $$${b.snippet}$$, $$${b.url}$$, '${b.latitude}', '${b.jobkey}', '${b.sponsored}', '${b.expired}', '${b.indeedapply}', '${b.formattedlocationfull}', 
            '${b.nouniqueurl}', '${b.formattedrelativetime}') ON CONFLICT DO NOTHING;`
        }

        result = results;
        var bulkInsert = jobs.reduce((a,b) => a + insertJobs(b), "");
        // IndeedJobs.bulkCreate( jobs )
        // copy the jobs over to master table to maintain FK references
        return knex.raw( bulkInsert )
        
      })
      .then( () => {
        result = result[0][result[0].length-1];
        var id = result.internal_id;

        var bigInsert = jobs.reduce((a,b) => a+`INSERT INTO "jobs_saved_searches" ("jobkey_id","saved_search_id") VALUES('${b.jobkey}', ${id});`, "");

        return db.query(bigInsert)
        
      })
      .then(() => {
        console.log('Saved the search for the user')
        res.sendStatus(201);
      })
      .catch( err => {
        console.log('Error saving search: ', err);
        res.sendStatus(500)
      });
    
  },

  getAllSearches: function (req,res,next) {
    var user_id = req.cookies.userid;
    
    Searches.findAll({where: {user_id: user_id}})
      .then((results) => {
        console.log("sending all saved searches back to client: ");
        res.json(results);
      })
      .catch((err) => {
        console.log("error fetching saved searches: ", err);
        res.sendStatus(500);
      })

  },

  parseUrlForKanban: function (req, res, next) {
    var user_id = req.cookies.userid;
    var urlToParse = req.body.urlToParse
    request({
      uri: urlToParse,
      resolveWithFullResponse: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
      }
    })
    .then(response => {
      parsedURL = url.parse(req.body.urlToParse)
      // console.log(response.body);
      var $ = cheerio.load(response.body);
      console.log(parsedURL.hostname)

      if(parsedURL.hostname.indexOf('monster') > -1){
        var title = $('title').text().trim()
        console.log(title)
        var jobtitle = title.split(' in')[0].trim();
        var location = title.split(',').slice(-1).join(' ').trim();
        console.log(jobtitle, "+", location)
        var state = location.split(' ')[0]
        var country = location.split(' ')[1]
        var jobkey = uuid.v4();   

        // var company = $('.location').find('a').text();
        // else company null
        var jobSummary = $('#jobsummary_content');
        if(jobSummary.length){
          var company = $('#jobsummary_content').find('span')[0]
          var jobLocation = $('#jobsummary_content').find('span')[1]
          company = $(company).text();

          console.log('company:  ', $(company).text());
          console.log('location ', $(jobLocation).text());
        };
        company = company || "";
        location = location || "";
        var jobCardToSend = { card_id: jobkey, 
          status: 'interested', 
          job_data: {
            snippet: title,
            jobkey,
            company,
            country,
            jobtitle,
            location,
            state,
            url: urlToParse
          }
                            
        }
      }

      // console.log($('title').text())
      if(jobCardToSend){
        res.json(jobCardToSend);
        return
      } else {
        res.json({url:urlToParse});
      }

    })
    .catch(err => {
      console.log('error fetching data from :', urlToParse, 'error :', err)
    })

  }

}

module.exports = searchController;


// insert into saved_searches(name, user_id) values('first search', 12850819)

// insert into jobs_saved_searches(jobkey_id, saved_search_id) values ('94671a6627cf6884', 1)

// select * from indeed_jobs ij where ij.jobkey in (select jss.jobkey_id from jobs_saved_searches jss
//  where jss.saved_search_id = 1)

// Shape of the POST request data for saving a serach for the user
// POST : {
//   name: 'name',
//   jobs: [{},{}]
// }