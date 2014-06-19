'use strict';

angular.module('slipflowApp')
  .filter('prFromUrl', function () {
    return function (input) {
      if (!input) {
        return '';
      }

      return input.substring(input.lastIndexOf('/') + 1);
    };
  });
