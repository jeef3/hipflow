'use strict';

angular.module('hipFlowApp')
  .filter('localBranchName', function () {
    return function (input) {
      return input ? input.replace(/^refs\/heads\//, '') : input;
    };
  });
