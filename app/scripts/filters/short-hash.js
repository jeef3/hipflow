'use strict';

angular.module('hipFlowApp')
  .filter('shortHash', function () {
    return function (input) {
      return input.substring(0, 7);
    };
  });
