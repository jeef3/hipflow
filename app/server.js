'use strict';

var express = require('express'),
  passport = require('passport'),
  app = express();

app.set('port', process.env.PORT || 9000);

app.configure('development', function () {

});

app.configure(function () {
  app.use(express.methodOverride());
});

require('./config/passport')();
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('flowdock'));
app.get('/oauth/callback',
  passport.authenticate('flowdock', { session: false }),
  function (req, res) {
    console.log('the callback callback', req.user);
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
