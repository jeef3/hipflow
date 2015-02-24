'use strict';

var nconf = require('nconf');
require('dotenv').load();

nconf.argv()
  .env()
  .defaults({ 'PORT': 9000 });

module.exports = nconf;
