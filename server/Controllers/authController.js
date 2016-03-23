const config = require('../config/config')
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../../db/dbSequelize').sequelize;
const GITHUB_CLIENT_ID = config.githubClientID;
const GITHUB_CLIENT_SECRET = config.githubClientSecret;
const GOOGLE_CLIENT_ID = config.googleClientID;
const GOOGLE_CLIENT_SECRET = config.googleClientSecret;
const User = require('../../db/dbSequelize').users
const callbackURL = process.env.NODE_ENV === 'PRODUCTION' ? 'http://hireorb.it/auth/google/callback' : 'http://localhost:3000/auth/google/callback'

// This sets up sessions for the authenticated user 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.

// "internal_id", "created_at", "updated_at", "username", "name", 
// "github_avatar_url", "github_html_url", "github_access_token", 
// "github_refresh_token" 
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('trying to write user info to db');
    process.nextTick(function () {
      return User.findOrCreate({where: {google_id: profile._json.id}})
      .spread(function(user, created) {
        console.log('Updating user model in sequelize', profile._json)
        user.update({
          name: profile._json.displayName,
          gender: profile._json.gender,
          // age_min: profile._json.ageRange.min,
          google_profile_url: profile._json.url,
          google_image_url: profile._json.image.url,
          google_access_token: accessToken,
        })
      .then(function(user){
          console.log('updated user: ', JSON.stringify(user));
          return done(null, user);
        }).catch(function(error) {
          console.error('error updating user: ', error);
          return done(error, null);
        });
      });
      return done(null, profile);
    });
  }
));



const AuthController = function (app) {
// set up passport
  app.use(passport.initialize());
  app.use(passport.session());

// initial end point for google auth - routes setup
  app.get('/auth/google', 
  passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/calendar',
                                  'https://www.googleapis.com/auth/plus.login',
                                   'https://www.googleapis.com/auth/gmail.modify'
]}));

// subsequent callback endpoint for google to send the logged user profile
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // add the user_id to the cookie
      console.log('google callback was called successfully', req.user);
      res.cookie('userid', req.user.dataValues.google_id, { maxAge: 2592000000 });
      res.redirect('/');
  });

  app.get('/logout', function(req, res){
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
}

module.exports = AuthController;
