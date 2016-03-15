const config = require('../config/config')
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('../../db/dbSequelize').sequelize;
const GITHUB_CLIENT_ID = config.githubClientID;
const GITHUB_CLIENT_SECRET = config.githubClientSecret;
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
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: config.authCallbackUrl
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOrCreate({where: {id: profile.id}})
      .spread(function(user, created) {
        user.update({
          username: profile._json.login,
          name: profile._json.name,
          html_url: profile._json.html_url,
          repos_url: profile._json.repos_url,
          avatar_url: profile._json.avatar_url,
          access_token: accessToken,
          refresh_token: refreshToken
        }).then(function(user){
          console.log('updated user: ', JSON.stringify(user));
          return done(null, user);
        }).catch(function(error) {
          console.error('error updating user: ', error);
          return done(error, null);
        });
      });
      console.log('profile is........', profile)
      return done(null, profile);
    });
  }
));



const AuthController = function (app) {
// set up passport
  app.use(passport.initialize());
  app.use(passport.session());

// initial end point for github auth
  app.get('/auth/github', 
  passport.authenticate('github', {scope: ['user', 'repo']}));

// subsequent callback endpoint for github to send the logged user profile
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // add the user_id to the cookie
      res.cookie('userid', req.user.id, { maxAge: 2592000000 });
      res.redirect('/');
  });

  app.get('/logout', function(req, res){
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
}

module.exports = AuthController;
