'use strict';

var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');

var config = require('./config');

module.exports = function () {
  var doneCallback = function (accessToken, refreshToken, params, profile, done) {
    done(null, {
      access_token: params.access_token,
      expires_in: params.expires_in,
      scope: params.scope,
      token_type: params.token_type,
      refresh_token: refreshToken
    });
  };

  passport.use('flowdock',
    new OAuth2Strategy({
      authorizationURL: 'https://api.flowdock.com/oauth/authorize',
      tokenURL: 'https://api.flowdock.com/oauth/token',
      clientID: config.get('FLOWDOCK_APPLICATION_ID'),
      clientSecret: config.get('FLOWDOCK_SECRET'),
      callbackURL: config.get('FLOWDOCK_CALLBACK_URI')
    },
    doneCallback));
};
