'use strict';

var express = require('express'),
  passport = require('passport'),
  app = express();

app.set('port', process.env.PORT || 9000);

app.configure(function () {
  app.use(express.methodOverride());
  app.use(express.cookieParser());
});

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('flowdock'));
app.get('/login/stream', passport.authenticate('flowdock-stream'));

app.get('/oauth/callback',
  passport.authenticate('flowdock', { session: false }),
  function (req, res) {
    res.cookie('flowauth', JSON.stringify({
      access: req.user.accessToken,
      refresh: req.user.refreshToken
    }));
    res.redirect('/login/stream');
  });
app.get('/oauth/stream/callback',
  passport.authenticate('flowdock-stream', { session: false }),
  function (req, res) {
    res.cookie('flowauthStream', JSON.stringify({
      access: req.user.accessToken,
      refresh: req.user.refreshToken
    }));
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
