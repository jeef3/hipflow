'use strict';

angular.module('slipflowApp')
  .filter('shortHash', function () {
    return function (input) {
      return input ? input.substring(0, 7) : input;
    };
  });
