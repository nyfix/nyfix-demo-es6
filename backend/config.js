/*************************************************************************
 * ULLINK CONFIDENTIAL INFORMATION
 * _______________________________
 *
 * All Rights Reserved.
 *
 * NOTICE: This file and its content are the property of Ullink. The
 * information included has been classified as Confidential and may
 * not be copied, modified, distributed, or otherwise disseminated, in
 * whole or part, without the express written permission of Ullink.
 ************************************************************************/

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
