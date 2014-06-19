'use strict';

angular.module('slipflowApp')
  .filter('localBranchName', function () {
    return function (input) {
      return input ? input.replace(/^refs\/heads\//, '') : input;
    };
  });
