'use strict';

var express = require('express'),
  passport = require('passport'),
  app = express();

app.set('port', 9000);

app.configure('development', function () {

});

app.configure(function () {
  app.use(express.methodOverride());
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('flowdock'));
app.get('/oauth/callback',
  passport.authenticate('flowdock', { successRedirect: '/',
                                      failureRedirect: '/login' }));

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
