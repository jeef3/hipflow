'use strict';

angular.module('hipflowApp')
  .filter('shortHash', function () {
    return function (input) {
      return input ? input.substring(0, 7) : input;
    };
  });
