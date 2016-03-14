const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const methodOverride = require('method-override');
const config = require('./config');
const path = require('path');

const router = require('./routes');


const app = express();

app.use(bodyParser.json());

app.use(methodOverride());
app.use(session({ secret: 'unguessable password secret', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

const staticOptions = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  maxAge: '1d',
}
const distDir = path.resolve(__dirname, '../client');
app.use(express.static(distDir));

// apply the api and auth routes from the router module
router(app);

// allow cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});





module.exports = app