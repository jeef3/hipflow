'use strict';

angular.module('hipFlowApp')
  .filter('limitWithEllipsis', function () {
    return function (input, limit) {
      if (!input || input.length <= limit) {
        return input;
      }

      return input.substring(0, limit).trim() + '…';
    };
  });
