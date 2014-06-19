'use strict';

angular.module('slipflowApp')
  .filter('messageLinks', function (FlowdockText) {
    return function (input) {
      if (!input) {
        return input;
      }

      return FlowdockText.autoLink(input);
    };
  });
