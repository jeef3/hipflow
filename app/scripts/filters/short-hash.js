'use strict';

angular.module('hipFlowApp')
  .filter('shortHash', function () {
    return function (input) {
      return input ? input.substring(0, 7) : input;
    };
  });
