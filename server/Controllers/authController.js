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
    callbackURL:'/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('trying to write user info to db');
    process.nextTick(function () {
      return User.findOrCreate({where: {internal_id: profile._json.id}})
      .spread(function(user, created) {
        console.log('Updating user model in sequelize', profile._json)
        user.update({
          username: profile._json.login,
          name: profile._json.name,
          github_html_url: profile._json.html_url,
          github_repos_url: profile._json.repos_url,
          github_avatar_url: profile._json.avatar_url,
          github_access_token: accessToken,
          github_refresh_token: refreshToken
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
  passport.authenticate('google', {scope: ['profile']}));

// subsequent callback endpoint for google to send the logged user profile
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // add the user_id to the cookie
      console.log('google callback was called successfully');
      res.cookie('userid', req.user.dataValues.internal_id, { maxAge: 2592000000 });
      res.redirect('/');
  });

  app.get('/logout', function(req, res){
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
}

module.exports = AuthController;
