'use strict';

angular.module('hipFlowApp')
  .filter('nl2br', function () {
    return function (input) {
      return input ? input.replace(/\n/g, '<br>') : input;
    };
  });
