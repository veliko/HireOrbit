var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/database');
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var methodOverride = require('method-override');
var config = require('./config');
var path = require('path');


var app = express();

app.use(bodyParser.json());

app.use(methodOverride());
app.use(session({ secret: 'unguessable password secret', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

var distDir = path.resolve(__dirname, '../client');
app.use(express.static(distDir));

// allow cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});





module.exports = app