'use strict';

var passport = require('passport'),
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

module.exports = function () {
  var doneCallback = function (accessToken, refreshToken, params, profile, done) {
    done(null, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: params.expires_in,
      scope: params.scope
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
      clientID: process.env.FLOWDOCK_APPLICATION_ID,
      clientSecret: process.env.FLOWDOCK_SECRET,
      callbackURL: process.env.FLOWDOCK_STREAM_CALLBACK_URI
    },
    doneCallback));
};
