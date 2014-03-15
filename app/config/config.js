'use strict';

var path = require('path');

var nconf = require('nconf');

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'env.json') })
  .defaults({ 'PORT': 9000 });

module.exports = nconf;
