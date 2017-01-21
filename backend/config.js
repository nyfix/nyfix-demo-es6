var shared = require('../config.shared.js')
var sentryApiURL = 'https://login-sandbox.nyfix.com/sentrygw/api/';

module.exports = {
  shared,
  cookieSecret: 'nyfix demo app cookie secret phrase',
  nyfix: {
    authorizationURL: `${sentryApiURL}oauth2/authorize`,
    tokenURL        : `${sentryApiURL}token/access_token`,
    profileURL      : `${sentryApiURL}token/resource`,
    napiURL         : 'https://napi-sandbox.nyfix.com',
    clientID    : process.env.NYFIX_CLIENTID,
    clientSecret: process.env.NYFIX_SECRET,
    callbackURL: `${shared.frontend.path}api/nyfix-login`,
    passReqToCallback: true,
    state: true
  }
}
