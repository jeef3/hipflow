'use strict';

var passport = require('passport'),
  OAuth2Strategy = require('passport-oauth2');

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
      clientID: process.env.FLOWDOCK_APPLICATION_ID,
      clientSecret: process.env.FLOWDOCK_SECRET,
      callbackURL: process.env.FLOWDOCK_CALLBACK_URI
    },
    doneCallback));

  passport.use('flowdock-stream',
    new OAuth2Strategy({
      authorizationURL: 'https://stream.flowdock.com/oauth/authorize',
      tokenURL: 'https://stream.flowdock.com/oauth/token',
      clientID: process.env.FLOWDOCK_STREAM_APPLICATION_ID,
      clientSecret: process.env.FLOWDOCK_STREAM_SECRET,
      callbackURL: process.env.FLOWDOCK_STREAM_CALLBACK_URI
    },
    doneCallback));
};
