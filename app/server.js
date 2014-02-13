'use strict';

var express = require('express'),
  passport = require('passport'),
  request = require('request'),
  app = express();

app.set('port', process.env.PORT || 9000);

app.configure(function () {
  app.use(express.methodOverride());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
});

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('flowdock'));
app.get('/login/stream', passport.authenticate('flowdock-stream'));

app.post('/oauth/refresh', function (req, res) {
  var auth = req.body;

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
app.post('/oauth/stream/refresh', function (req, res) {
  var auth = req.body;

  request.post('https://stream.flowdock.com/oauth/token', {
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
    res.redirect('/login/stream');
  });
app.get('/oauth/stream/callback',
  passport.authenticate('flowdock-stream', { session: false }),
  function (req, res) {
    res.cookie('flowauthStream', JSON.stringify(req.user));
    res.redirect('/');
  });

app.use('/images', express.static('app/images'));
app.use('/scripts', express.static('app/scripts'));
app.use('/styles', express.static('.tmp/styles'));
app.use('/views', express.static('app/views'));
app.use('/bower_components', express.static('app/bower_components'));

app.get('/', function (req, res) {
  res.sendfile('app/index.html');
});

app.listen(app.get('port'), function () {
  console.log('Listening on %d', app.get('port'));
});

exports = app;