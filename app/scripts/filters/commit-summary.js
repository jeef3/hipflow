'use strict';

angular.module('slipflowApp')
  .filter('commitSummary', function () {
    return function (input) {
      if (!input) {
        return '';
      }

      return input.split('\n\n')[0];
    };
  });
