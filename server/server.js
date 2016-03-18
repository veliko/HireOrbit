const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const router = require('./routes');
const productionIP = process.env.PORT || 80
const devIP = 3000
const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({ secret: 'unguessable password secret', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).


// express route for static assets 
const staticOptions = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  maxAge: '1d',
}
const distDir = path.resolve(__dirname, '../client');
app.use(express.static(distDir, staticOptions));

// apply the api, auth routes & passport from the router module 
router(app);

// allow cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

if(process.env.NODE_ENV === 'production'){
  app.listen(productionIP);
  console.log('Listening at port ', productionIP )
} else {
  app.listen(devIP);
  console.log('Listening at port ', devIP)
}



module.exports = app