'use strict';

angular.module('hipflowApp')
  .filter('prFromUrl', function () {
    return function (input) {
      if (!input) {
        return '';
      }

      return input.substring(input.lastIndexOf('/') + 1);
    };
  });
