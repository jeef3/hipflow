'use strict';

angular.module('hipFlowApp')
  .filter('messageLinks', function (FlowdockText) {
    return function (input) {
      return FlowdockText.autoLink(input);
    };
  });
