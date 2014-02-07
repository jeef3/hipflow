'use strict';

angular.module('hipFlowApp')
  .filter('codeFormat', function () {
    return function (input) {
      if (input.match(/^    /)) {
        return '<code><pre>' + input + '</pre></code>';
      } else {
        return input;
      }
    };
  });
