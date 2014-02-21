'use strict';

var express = require('express');
var path = require('path');
var passport = require('passport');
var request = require('request');
var app = express();

app.set('port', process.env.PORT || 9000);

app.configure(function () {
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(express.urlencoded());
  app.use(express.cookieParser());

  app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
  app.use('/views', express.static(path.join(__dirname, 'views')));
  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
});

app.configure('development', function () {
  app.use('/styles', express.static(path.join(__dirname, '..', '.tmp', 'styles')));
});

app.configure('production', function () {
  app.use('/styles', express.static(path.join(__dirname, 'styles')));
});

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('flowdock'));

app.post('/oauth/refresh', function (req, res) {
  var auth = req.body;

  console.log('Refreshing token');

  request.post('https://api.flowdock.com/oauth/token', {
    json: {
      refresh_token: auth.refresh_token,
      client_id: process.env.FLOWDOCK_APPLICATION_ID,
      client_secret: process.env.FLOWDOCK_SECRET,
      grant_type: 'refresh_token'
    }
  }, function (error, response, body) {
    res.send(response.statusCode, body);
  });
});

app.get('/oauth/callback',
  passport.authenticate('flowdock', { session: false }),
  function (req, res) {
    res.cookie('flowauth', JSON.stringify(req.user));
    res.redirect('/');
  });

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log('Listening on %d', app.get('port'));
});

exports = app;
