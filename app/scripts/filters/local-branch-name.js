'use strict';

angular.module('hipflowApp')
  .filter('localBranchName', function () {
    return function (input) {
      return input ? input.replace(/^refs\/heads\//, '') : input;
    };
  });
