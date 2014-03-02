'use strict';

angular.module('hipflowApp')
  .filter('limitWithEllipsis', function () {
    return function (input, limit) {
      if (!input || input.length <= limit) {
        return input;
      }

      return input.substring(0, limit).trim() + '…';
    };
  });
