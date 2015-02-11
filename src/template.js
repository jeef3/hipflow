'use strict';

var Ractive = require('ractive');

module.exports = function (parent, data, template) {
  var ractive = new Ractive({
    el: parent,
    template: template,
    data: data
  });

  return ractive;
};
