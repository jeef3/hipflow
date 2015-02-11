'use strict';

var template = require('./template');
var view = require('./main.html');

function MainCtrl() {

}

module.exports = function (el) {
  var controller = new MainCtrl();

  template(el, controller, view);

  return controller;
};

module.exports.MainCtrl = MainCtrl;
