'use strict';

var express = require('express'),
  passport = require('passport'),
  app = express();

app.configure('development', function () {

});

app.configure(function () {
  app.use(express.methodOverride());
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('provider'));
app.get('/oauth/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(app.get('port'), function () {
  console.log('Listening on %d', app.get('port'));
});

exports = app;
