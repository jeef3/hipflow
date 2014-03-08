'use strict';

angular.module('hipflowApp')
  .filter('codeFormat', function () {
    return function (input) {
      if (input && input.match(/^    /)) {
        return '<code><pre>' + input + '</pre></code>';
      } else {
        return input;
      }
    };
  });
