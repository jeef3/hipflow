'use strict';

angular.module('hipflowApp')
  .filter('limitWithEllipsis', function () {
    return function (input, limit) {
      if (!input || input.length <= limit) {
        return input;
      }

      var output = input.substring(0, limit + 1).trim();

      if (output.length < input.length) {
        output = output + '…';
      }

      return output;
    };
  });
