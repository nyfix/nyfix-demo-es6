var express = require('express');
var app = express();
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var session = require('express-session');
var cfg = require('../config')
var uuid = require('node-uuid');
var moment = require('moment');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: cfg.cookieSecret
}));

app.use(require('cookie-parser')(cfg.cookieSecret));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: cfg.cookieSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// in-memory map of registered users, should be saved to some DB instead
var users = {}

function findUserByProfile(profile) {
  var user = Object.keys(users).map(id => users[id]).find(it => it.auth[profile.provider] && it.auth[profile.provider].id === profile.id);
  if (user) return user;
  user = Object.keys(users).map(id => users[id]).find(it => {
    return it.emails.findIndex(e => profile.emails.indexOf(e) != -1) != -1
  });
  return user;
}

// get the user and merge the provided credentials into it, create the user if necessary
function getOrCreateUser(profileMap) { return (req, access_token, refresh_token, params, profile, cb) => {
  profile = profileMap(profile)
  var user = req.user;
  if (!user || !user.registered)
    user = findUserByProfile(profile);
  if (!user || !user.registered)
    user = { id: uuid.v4(), name: { displayName: profile.displayName, familyName: profile.familyName, givenName: profile.givenName } };
  user.registered = true;
  if (user.auth === undefined) user.auth = {};
  if (user.emails === undefined) user.emails = [];
  if (!user.auth[profile.provider]) {
    profile.emails.forEach(it => user.emails.indexOf(it) != -1 || user.emails.push(it))
  }
  user.auth[profile.provider] = { id: profile.id, refresh_token, access_token, token_type: params.token_type }
  if (refresh_token && params.expires_in) {
    user.auth[profile.provider].expires = moment().add(params.expires_in, 'seconds').unix()
  }
  users[user.id] = user
  process.nextTick(function () { 
    cb(undefined, user)
  });
}}

if (cfg.nyfix.clientID) {
  var nyfixStrategy = new OAuth2Strategy(cfg.nyfix, getOrCreateUser(p => ({provider: 'nyfix', id: p.id, familyName: p.lastname, givenName: p.firstname, displayName: `${p.firstname} ${p.lastname}`, emails: [p.name]})));
  nyfixStrategy.userProfile = function(accessToken, done) {
    return nyfixStrategy._oauth2.get(cfg.nyfix.profileURL, accessToken, function (err, body, res) {
      return err ? done(err) : done(null, JSON.parse(body));
    });
  };
  passport.use('nyfix', nyfixStrategy);
}

// map context user to session store (only the id)
passport.serializeUser(function(user, done) {
  done(null, { id: user.id } );
});

// map back the session stored user to the contextual one
passport.deserializeUser(function(user, done) {
  done(null, users[user.id] || { id: user.id, registered: false } );
});

function authnOrAuthzNyfix(req, res, next) {
  var isCb = !!req.query.code
  var redirect = req.session.redirect || '/'
  req.session.redirect = isCb ? undefined : req.query.redirect
  passport.authenticate('nyfix', {
    scope: ['email'],
    successRedirect: redirect,
    failureRedirect: '/login'
  })(req, res, next);
}

app.get('/api/nyfix-login', authnOrAuthzNyfix);

// Ensures the user is authenticated, or redirect to /login (or reject for xhr requests)
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.registered)
    return next(null)  
  if (req.xhr)
    res.status(403).send('Unauthorized') 
  else
    res.redirect(`/login?redirect=${req.url}`)
}

app.get('/api/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/api/session/user',
  ensureAuthenticated,
  function (req, res) {
    res.send({id: req.user.id, name: req.user.name, emails: req.user.emails, providers: Object.keys(req.user.auth)});
  });


app.get('/api/simple',
  //ensureAuthenticated,
  function (req, res) {
    res.send('Example');
  });

app.listen(cfg.shared.backend.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://0.0.0.0:${cfg.shared.backend.port}`);
});

